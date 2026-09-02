import React from "react";
import HomeClient from "./HomeClient";
import { getUpdates, getPeople } from "@/lib/datocms";

export default async function Home() {
  const updates = await getUpdates();
  const people = await getPeople();
  return <HomeClient updates={updates} people={people} />;
}
