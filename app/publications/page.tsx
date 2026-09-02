import React from "react";
import PublicationsClient from "./PublicationsClient";
import { getPublications } from "@/lib/datocms";

export default async function PublicationsPage() {
  const publications = await getPublications();
  return <PublicationsClient publications={publications} />;
}
