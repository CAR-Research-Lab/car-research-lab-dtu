import React from "react";
import HomeClient from "./HomeClient";
import { getUpdates } from "@/lib/datocms";

export default async function Home() {
  const updates = await getUpdates();
  return <HomeClient updates={updates} />;
}
