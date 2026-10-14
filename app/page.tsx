import React from "react";
import HomeClient from "./HomeClient";
import { getUpdates, getPeople, getHomeBg } from "@/lib/datocms";

export default async function Home() {
  const [updates, people, homeBg] = await Promise.all([
    getUpdates(),
    getPeople(),
    getHomeBg(),
  ]);
  return <HomeClient updates={updates} people={people} homeBg={homeBg} />;
}
