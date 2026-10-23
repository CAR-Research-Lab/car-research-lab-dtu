import React from "react";
import ResearchClient from "./ResearchClient";
import { getPublications } from "@/lib/datocms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research & Publications | CAR Lab DTU",
  description: "Explore our latest peer-reviewed contributions to robotics, cybersecurity, and artificial intelligence at CAR Lab DTU.",
};

export default async function ResearchPage() {
  const publications = await getPublications();
  return <ResearchClient publications={publications} />;
}
