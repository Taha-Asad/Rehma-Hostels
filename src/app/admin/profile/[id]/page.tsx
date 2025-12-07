import { getAdmin } from "@/actions/user.action";
import { notFound } from "next/navigation";
import React from "react";
import ProfileClient from "./ProfileClient";

async function page() {
  const res = await getAdmin();
  const admin = res.success ? res.data : null;

  if (!admin) {
    return notFound();
  }
  return (
    <>
      <ProfileClient profile={admin} />
    </>
  );
}

export default page;
