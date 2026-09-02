import React from "react";
import PeopleClient from "./PeopleClient";
import { getPeople } from "@/lib/datocms";

export default async function PeoplePage() {
  const people = await getPeople();
  return <PeopleClient people={people} />;
}
