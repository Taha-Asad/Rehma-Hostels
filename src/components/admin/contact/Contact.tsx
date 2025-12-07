/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import DataTable from "../DataTable";
import EditContactModal from "./EditContactModal";
import DeleteContactModal from "./DeleteContactModal";
import {
  DeleteContactForm,
  UpdateContactStatus,
} from "@/actions/contact.action";
import ViewContactModal from "./ViewContactModal";

interface ContactProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  roomType: string | null;
  message: string | null;
  status: string;
  createdAt: Date;
}
function Contact({ contacts }: { contacts: ContactProps[] }) {
  const columns = [
    { label: "CNT - ID", key: "id", type: "text" },
    { label: "Name", key: "name", type: "text" },
    { label: "Email", key: "email", type: "text" },
    { label: "phone", key: "phone", type: "text" },
    { label: "Status", key: "status", type: "chip" },
    { label: "Created", key: "createdAt", type: "date" },
  ] as const;

  const [selected, setSelected] = useState<ContactProps | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editModal, setEditModal] = useState({
    open: false,
    contact: null as { id: string; status: string } | null,
  });
  const [deleteOpen, setDeleteOpen] = useState(false);
  return (
    <>
      <DataTable
        columns={columns as any}
        rows={contacts}
        actions={[
          { label: "View", action: "view" },
          { label: "Edit", action: "edit" },
          { label: "Delete", action: "delete" },
        ]}
        onView={(id) => {
          setSelected(contacts.find((c) => c.id === id)!);
          setViewOpen(true);
        }}
        onEdit={(id) => {
          const c = contacts.find((c) => c.id === id)!;
          setSelected(c);
          setEditModal({
            open: true,
            contact: { id: c.id, status: c.status },
          });
        }}
        onDelete={(id) => {
          setSelected(contacts.find((c) => c.id === id)!);
          setDeleteOpen(true);
        }}
      />
      <EditContactModal
        open={editModal.open}
        onClose={() => setEditModal({ open: false, contact: null })}
        contact={selected ?? null}
        onSubmit={async (data) => {
          if (!selected) return;

          await UpdateContactStatus(selected.id, data.status);
        }}
      />
      <ViewContactModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        contact={selected ?? undefined}
      />

      <DeleteContactModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        contact={selected ?? null}
        onConfirm={async () => {
          if (!selected) return;
          await DeleteContactForm(selected.id);
          setDeleteOpen(false);
        }}
      />
    </>
  );
}

export default Contact;
