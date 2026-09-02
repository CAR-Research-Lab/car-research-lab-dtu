export async function performRequest({
  query,
  variables = {},
  includeDrafts = false,
}: {
  query: string;
  variables?: any;
  includeDrafts?: boolean;
}) {
  const token = process.env.DATOCMS_API_TOKEN;
  
  if (!token) {
    throw new Error("DATOCMS_API_TOKEN is not set. Please add it to your environment variables.");
  }

  const response = await fetch("https://graphql.datocms.com/", {
    headers: {
      Authorization: `Bearer ${token}`,
      ...(includeDrafts ? { "X-Include-Drafts": "true" } : {}),
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ query, variables }),
    cache: "no-store", // Force live data fetch to bust stale cache
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText}: ${JSON.stringify(
        responseBody
      )}`
    );
  }

  return responseBody.data;
}

// ==========================================
// DATA FETCHERS
// ==========================================

export async function getUpdates() {
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
}

export async function getPublications() {
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
    type: pub.typeofpublication || "Journal" 
  }));
}

export async function getPeople() {
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
    category: p.category ? p.category.toLowerCase().trim() : "heads"
  }));
}
