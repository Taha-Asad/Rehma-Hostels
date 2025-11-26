/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    phone: string;
    image: string;
    role: string;
  } | null;
  onSubmit: (form: { name: string; email: string }) => void;
}

export default function EditUserModal({
  open,
  onClose,
  user,
  onSubmit,
}: EditUserModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    image: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        image: user.image,
      });
    }
  }, [user]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit User</DialogTitle>

      <DialogContent>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="dense"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="dense"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          label="Phone"
          name="phone"
          fullWidth
          margin="dense"
          value={form.phone}
          onChange={handleChange}
        />
        <TextField
          label="Role"
          name="role"
          fullWidth
          margin="dense"
          value={form.role}
          onChange={handleChange}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => onSubmit(form)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
