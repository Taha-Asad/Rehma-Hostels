/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (form: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => Promise<{ success: boolean; message: string } | void>;
}

export default function AddUserModal({
  open,
  onClose,
  onSubmit,
}: AddUserModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const res = await onSubmit(form);
    setLoading(false);
    if (res && !res.success) {
      setError(res.message);
      return;
    }
    setForm({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add User</DialogTitle>

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
          type="email"
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
          helperText="Format: +923001234567"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="dense"
          value={form.password}
          onChange={handleChange}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          fullWidth
          margin="dense"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
