"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";

interface ViewContactModalProps {
  open: boolean;
  onClose: () => void;
  contact?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    roomType: string | null;
    message: string | null;
    status: string;
    createdAt: Date;
  };
}

export default function ViewContactModal({
  open,
  onClose,
  contact,
}: ViewContactModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Contact Form Details</DialogTitle>
      <DialogContent dividers>
        <Typography>Name: {contact?.name}</Typography>
        <Typography>Email: {contact?.email}</Typography>
        <Typography>Phone: {contact?.phone}</Typography>
        <Typography>Room Type: {contact?.roomType}</Typography>
        <Typography>Message: {contact?.message}</Typography>
        <Typography>Status: {contact?.status}</Typography>
        <Typography>
          Created At: {contact?.createdAt?.toLocaleString()}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
