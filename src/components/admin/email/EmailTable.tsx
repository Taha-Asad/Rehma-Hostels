/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useState } from "react";
import DataTable from "../DataTable";
import ReplyModal from "./ReplyModal";

interface EmailProps {
  id: string;
  email: string | null;
  name: string | null;
  source: string;
  createdAt: Date;
}

function EmailTable({ emails }: { emails: EmailProps[] }) {
  const [open, setOpen] = useState({
    open: false,
    email: null as { name: string; email: string } | null,
  });

  const handleConfirm = (data: FormData) => {
    console.log("confirm", data);
    setOpen({
      open: false,
      email: null as { name: string; email: string } | null,
    });
  };

  const columns = [
    { label: "Name", key: "name", type: "text" },
    { label: "Email", key: "email", type: "text" },
    { label: "Source", key: "source", type: "chip" },
    { label: "Created", key: "createdAt", type: "date" },
  ] as const;

  return (
    <>
      <DataTable
        columns={columns as any}
        rows={emails}
        actions={[{ label: "Reply", action: "reply" }]}
        onReply={(id) => {
          const c = emails.find((c) => c.id === id)!;
          if (!c.name || !c.email) return;

          setOpen({
            open: true,
            email: { name: c.name, email: c.email },
          });
        }}
      />

      <ReplyModal
        open={open.open}
        onClose={() => setOpen({ open: false, email: null })}
        email={open.email}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default EmailTable;
