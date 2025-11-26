"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";

interface ViewUserModalProps {
  open: boolean;
  onClose: () => void;
  user?: {
    name?: string;
    email?: string;
    phone?: string;
    role?: string;
    createdAt?: Date;
  };
}

export default function ViewUserModal({
  open,
  onClose,
  user,
}: ViewUserModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>User Details</DialogTitle>
      <DialogContent dividers>
        <Typography>Name: {user?.name}</Typography>
        <Typography>Email: {user?.email}</Typography>
        <Typography>Phone: {user?.phone}</Typography>
        <Typography>Role: {user?.role}</Typography>
        <Typography>Created At: {user?.createdAt?.toLocaleString()}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
