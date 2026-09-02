import React from "react";
import UpdatesClient from "./UpdatesClient";
import { getUpdates } from "@/lib/datocms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Announcements | CAR Lab DTU",
  description: "Stay up-to-date with the latest research breakthroughs, lab updates, and global collaborations at the CAR Lab.",
};

export default async function UpdatesPage() {
  const updates = await getUpdates();
  
  return <UpdatesClient updates={updates} />;
}
