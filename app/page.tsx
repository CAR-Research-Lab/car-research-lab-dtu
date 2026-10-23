import React from "react";
import HomeClient from "./HomeClient";
import { getUpdates, getPeople, getPublications, getHomeBg } from "@/lib/datocms";

export default async function Home() {
  const [updates, people, publications, homeBg] = await Promise.all([
    getUpdates(),
    getPeople(),
    getPublications(),
    getHomeBg(),
  ]);
  return (
    <HomeClient
      updates={updates}
      people={people}
      publications={publications}
      homeBg={homeBg}
    />
  );
}
