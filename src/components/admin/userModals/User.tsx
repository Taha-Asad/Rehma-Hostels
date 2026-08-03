/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteUser, UpdateUserAdmin, CreateUser } from "@/actions/user.action";
import { Button, Box } from "@mui/material";
import DataTable from "../DataTable";
import ViewUserModal from "./ViewUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import AddUserModal from "./AddUserModal";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  image: string;
  createdAt: Date;
}

export default function UsersPage({ users }: { users: User[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<User | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editModal, setEditModal] = useState({
    open: false,
    user: null as { name: string; email: string } | null,
  });
  const [deleteOpen, setDeleteOpen] = useState(false);

  const columns = [
    { label: "Avatar", key: "Avatar", type: "avatar" },
    { label: "Name", key: "name", type: "text" },
    { label: "Email", key: "email", type: "text" },
    { label: "Role", key: "role", type: "chip" },
    { label: "Created", key: "createdAt", type: "date" },
  ] as const;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={() => setAddOpen(true)}
        >
          Add User
        </Button>
      </Box>

      <DataTable<User>
        columns={columns as any}
        rows={users}
        actions={[
          { label: "View", action: "view" },
          { label: "Edit", action: "edit" },
          { label: "Delete", action: "delete" },
        ]}
        onView={(id) => {
          setSelected(users.find((u) => u.id === id)!);
          setViewOpen(true);
        }}
        onEdit={(id) => {
          const u = users.find((u) => u.id === id)!;
          setSelected(u);
          setEditModal({
            open: true,
            user: { name: u.name, email: u.email },
          });
        }}
        onDelete={(id) => {
          setSelected(users.find((u) => u.id === id)!);
          setDeleteOpen(true);
        }}
      />

      <AddUserModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={async (data) => {
          const res = await CreateUser(
            data.name,
            data.email,
            data.phone,
            data.password,
            data.confirmPassword
          );
          if (res.success) router.refresh();
          return res;
        }}
      />

      <ViewUserModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        user={selected ?? undefined}
      />

      <EditUserModal
        open={editModal.open}
        onClose={() => setEditModal({ open: false, user: null })}
        user={selected ?? null}
        onSubmit={async (data) => {
          if (!selected) return;

          const fd = new FormData();
          Object.entries(data).forEach(([k, v]) => fd.append(k, String(v)));

          await UpdateUserAdmin(selected.id, fd);
          setEditModal({ open: false, user: null });
        }}
      />

      <DeleteUserModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        user={selected ?? null}
        onConfirm={async () => {
          if (!selected) return;
          await deleteUser(selected.id);
          setDeleteOpen(false);
        }}
      />
    </>
  );
}
