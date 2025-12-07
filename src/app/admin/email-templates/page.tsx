import { GetAllEmails } from "@/actions/emails.action";
import EmailTable from "@/components/admin/email/EmailTable";
import { Typography } from "@mui/material";
import React from "react";

async function page() {
  const res = await GetAllEmails();
  const emails = (res.data ?? []).map((eml) => ({
    ...eml,
  }));
  return (
    <>
      <Typography
        variant="h2"
        sx={{
          py: 3,
          px: 3,
        }}
      >
        Send Email
      </Typography>
      <EmailTable emails={emails} />
    </>
  );
}

export default page;
