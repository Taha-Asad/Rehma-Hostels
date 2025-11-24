/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getAllUsers } from "@/actions/user.action";
import DataTable from "@/components/admin/DataTable";
import { Container } from "@mui/material";

export default async function Page() {
  const res = await getAllUsers();
  const users = res.data ?? [];

  // pure JSON config
  const columns = [
    {
      label: "User Code",
      key: "userCode",
      type: "text",
    },
    {
      label: "Name",
      key: "name",
      type: "text",
    },
    {
      label: "Email",
      key: "email",
      type: "text",
    },
    {
      label: "Role",
      key: "role",
      type: "chip",
    },
    {
      label: "Created",
      key: "createdAt",
      type: "date",
    },
  ];

  const actions = [
    { label: "View", action: "view" },
    { label: "Edit", action: "edit" },
    { label: "Delete", action: "delete" },
  ];

  return (
    <Container sx={{ py: 5 }}>
      <DataTable columns={columns as any} rows={users} actions={actions} />
    </Container>
  );
}
