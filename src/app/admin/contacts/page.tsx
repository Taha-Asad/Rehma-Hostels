import { getAllForms } from "@/actions/contact.action";
import Contact from "@/components/admin/contact/Contact";
import React from "react";

async function page() {
  const res = await getAllForms();
  const contact = (res.data ?? []).map((cnt) => ({
    ...cnt,
  }));

  return <Contact contacts={contact} />;
}

export default page;
