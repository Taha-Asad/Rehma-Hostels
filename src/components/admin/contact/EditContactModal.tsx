"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useState, useEffect } from "react";

const statusOptions = [
  {
    label: "PENDING",
    value: "PENDING",
  },
  {
    label: "REPLIED",
    value: "REPLIED",
  },
  {
    label: "IGNORED",
    value: "IGNORED",
  },
];
interface EditContactModalProps {
  open: boolean;
  onClose: () => void;
  contact: {
    id: string;
    status: string;
  } | null;
  onSubmit: (form: { id: string; status: string }) => void;
}

export default function EditContactModal({
  open,
  onClose,
  contact,
  onSubmit,
}: EditContactModalProps) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (contact) {
      setStatus(contact.status);
    }
  }, [contact]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Status</DialogTitle>

      <DialogContent>
        <Autocomplete
          fullWidth
          disablePortal
          options={statusOptions}
          value={statusOptions.find((opt) => opt.value === status) || null}
          onChange={(_, value) => setStatus(value?.value || "")}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} label="Status" variant="outlined" />
          )}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => {
            if (!contact) return;
            onSubmit({ id: contact.id, status });
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
