export async function performRequest({
  query,
  variables = {},
  includeDrafts = false,
  revalidate = 60,
}: {
  query: string;
  variables?: any;
  includeDrafts?: boolean;
  revalidate?: number | false;
}) {
  const rawToken = process.env.DATOCMS_API_TOKEN;
  const token = rawToken ? rawToken.trim().replace(/^["']|["']$/g, "") : "";

  if (!token) {
    console.warn("DATOCMS_API_TOKEN is not set. Please add it to your environment variables.");
    return null;
  }

  const fetchOptions: RequestInit & { next?: { revalidate?: number | false } } = {
    headers: {
      Authorization: `Bearer ${token}`,
      ...(includeDrafts ? { "X-Include-Drafts": "true" } : {}),
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ query, variables }),
    ...(revalidate === false
      ? { cache: "no-store" }
      : { next: { revalidate } }),
  };

  // Attempt fetch with retry and timeout support
  const maxAttempts = 2;
  let lastError: any = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      // Use 10-second timeout per attempt
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch("https://graphql.datocms.com/", {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const responseBody = await response.json();

      if (!response.ok) {
        throw new Error(
          `${response.status} ${response.statusText}: ${JSON.stringify(
            responseBody
          )}`
        );
      }

      return responseBody.data;
    } catch (err: any) {
      lastError = err;
      if (attempt < maxAttempts) {
        // Wait 400ms before retrying transient failure
        await new Promise((res) => setTimeout(res, 400));
      }
    }
  }

  console.error("DatoCMS performRequest failed after retry:", lastError?.message || lastError);
  return null;
}

// ==========================================
// DATA FETCHERS (with graceful fallbacks)
// ==========================================

export async function getUpdates() {
  try {
    const query = `
      query {
        allUpdates(orderBy: date_DESC, first: 10) {
          id
          title
          date
          description
          link
        }
      }
    `;
    const data = await performRequest({ query });
    return data?.allUpdates || [];
  } catch (error) {
    console.error("Failed to fetch updates from DatoCMS:", error);
    return [];
  }
}

export async function getPublications() {
  try {
    const query = `
      query {
        allPublications(orderBy: year_DESC) {
          id
          title
          authors
          venue
          year
          typeofpublication
          link
        }
      }
    `;
    const data = await performRequest({ query });

    // Map the new 'typeofpublication' field back to 'type' for the frontend UI
    const publications = data?.allPublications || [];
    return publications.map((pub: any) => ({
      ...pub,
      type: pub.typeofpublication || "Journal",
    }));
  } catch (error) {
    console.error("Failed to fetch publications from DatoCMS:", error);
    return [];
  }
}

export type PersonCategory = "leads" | "phd" | "postgrad" | "undergrad" | "alumni";

export function normalizePersonCategory(
  category?: string | null,
  role?: string | null
): PersonCategory {
  const cat = (category || "").toLowerCase().trim();
  const r = (role || "").toLowerCase().trim();

  // 1. Lab Lead / PI
  if (
    cat === "first" ||
    cat === "1" ||
    cat.includes("lead") ||
    cat.includes("pi") ||
    cat.includes("faculty") ||
    cat.includes("head") ||
    cat.includes("director") ||
    cat.includes("prof")
  ) {
    return "leads";
  }

  // 2. PhD Scholars
  if (
    cat === "second" ||
    cat === "2" ||
    cat.includes("phd") ||
    cat.includes("ph.d") ||
    cat.includes("doctor")
  ) {
    return "phd";
  }

  // 3. MTech Students / Post Graduate
  if (
    cat === "third" ||
    cat === "3" ||
    cat.includes("mtech") ||
    cat.includes("m.tech") ||
    cat.includes("postgrad") ||
    cat.includes("post graduate") ||
    cat.includes("master") ||
    cat.includes("pg")
  ) {
    return "postgrad";
  }

  // 4. Undergrad students
  if (
    cat === "fourth" ||
    cat === "4" ||
    cat.includes("undergrad") ||
    cat.includes("btech") ||
    cat.includes("b.tech") ||
    cat.includes("bachelor") ||
    cat.includes("ug")
  ) {
    return "undergrad";
  }

  // 5. Alumni
  if (
    cat === "fifth" ||
    cat === "5" ||
    cat.includes("alumn") ||
    cat.includes("alum") ||
    cat.includes("former") ||
    cat.includes("past")
  ) {
    return "alumni";
  }

  // Fallback to role inference if category was not set
  if (
    r.includes("prof") ||
    r.includes("lead") ||
    r.includes("pi") ||
    r.includes("head") ||
    r.includes("faculty") ||
    r.includes("director")
  ) {
    return "leads";
  }
  if (r.includes("phd") || r.includes("ph.d") || r.includes("doctor")) {
    return "phd";
  }
  if (
    r.includes("mtech") ||
    r.includes("m.tech") ||
    r.includes("master") ||
    r.includes("postgrad")
  ) {
    return "postgrad";
  }
  if (r.includes("btech") || r.includes("b.tech") || r.includes("undergrad")) {
    return "undergrad";
  }
  if (r.includes("alumn") || r.includes("alum")) {
    return "alumni";
  }

  return "leads";
}

const HIERARCHY_ORDER: Record<PersonCategory, number> = {
  leads: 1,
  phd: 2,
  postgrad: 3,
  undergrad: 4,
  alumni: 5,
};

export async function getPeople() {
  try {
    const query = `
      query {
        allPeople {
          id
          name
          role
          focus
          email
          bio
          category
          initials
          _createdAt
          image {
            url
          }
        }
      }
    `;
    const data = await performRequest({ query });

    const people = data?.allPeople || [];
    return people
      .map((p: any) => ({
        ...p,
        category: normalizePersonCategory(p.category, p.role),
      }))
      .sort((a: any, b: any) => {
        // Primary sort: Hierarchy tier (1. Lab Lead -> 2. PhD -> 3. MTech -> 4. Undergrad -> 5. Alumni)
        const orderA = HIERARCHY_ORDER[a.category as PersonCategory] || 99;
        const orderB = HIERARCHY_ORDER[b.category as PersonCategory] || 99;
        if (orderA !== orderB) {
          return orderA - orderB;
        }

        // Secondary sort within the same tier: Order of addition in backwards direction (newest additions first)
        const timeA = a._createdAt ? new Date(a._createdAt).getTime() : 0;
        const timeB = b._createdAt ? new Date(b._createdAt).getTime() : 0;
        return timeB - timeA;
      });
  } catch (error) {
    console.error("Failed to fetch people from DatoCMS:", error);
    return [];
  }
}

export async function getHomeBg(): Promise<string | null> {
  try {
    const query = `
      query {
        homeBg {
          id
          homebg {
            url
          }
        }
        allHomeBgs(first: 1) {
          id
          homebg {
            url
          }
        }
      }
    `;
    const data = await performRequest({ query });
    return data?.homeBg?.homebg?.url || data?.allHomeBgs?.[0]?.homebg?.url || null;
  } catch (error) {
    console.error("Failed to fetch home background from DatoCMS:", error);
    return null;
  }
}

