/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useState } from "react";
import DataTable from "../DataTable";
import ViewSubModal from "./ViewSubModal";
import DeleteSubModal from "./DeleteSubModal";
import { DeleteSubscription } from "@/actions/sub.action";

interface SubProps {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}
const Subs = ({ subs }: { subs: SubProps[] }) => {
  const columns = [
    { label: "SUB - ID", key: "id", type: "text" },
    { label: "Name", key: "name", type: "text" },
    { label: "Email", key: "email", type: "text" },
    { label: "Subscribed At", key: "createdAt", type: "date" },
  ] as const;

  const [selected, setSelected] = useState<SubProps | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  return (
    <>
      <DataTable<SubProps>
        columns={columns as any}
        rows={subs}
        actions={[
          { label: "View", action: "view" },
          { label: "Delete", action: "delete" },
        ]}
        onView={(id) => {
          setSelected(subs.find((c) => c.id === id)!);
          setViewOpen(true);
        }}
        onDelete={(id) => {
          setSelected(subs.find((c) => c.id === id)!);
          setDeleteOpen(true);
        }}
      />
      <ViewSubModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        subscription={selected ?? undefined}
      />

      <DeleteSubModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        subscriber={selected ?? null}
        onConfirm={async () => {
          if (!selected) return;
          await DeleteSubscription(selected.id);
          setDeleteOpen(false);
        }}
      />
    </>
  );
};

export default Subs;
