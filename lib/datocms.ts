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
          image {
            url
          }
        }
      }
    `;
    const data = await performRequest({ query });

    const people = data?.allPeople || [];
    return people.map((p: any) => ({
      ...p,
      // Default to 'heads' if they forgot to type the category
      category: p.category ? p.category.toLowerCase().trim() : "heads",
    }));
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

