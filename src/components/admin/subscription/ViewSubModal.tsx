"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";

interface ViewSubModalProps {
  open: boolean;
  onClose: () => void;
  subscription?: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
  };
}

export default function ViewSubModal({
  open,
  onClose,
  subscription,
}: ViewSubModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Subscription Details</DialogTitle>
      <DialogContent dividers>
        <Typography>Subscription ID : {subscription?.id}</Typography>
        <Typography>Name: {subscription?.name}</Typography>
        <Typography>Email: {subscription?.email}</Typography>
        <Typography>
          Created At: {subscription?.createdAt?.toLocaleString()}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
