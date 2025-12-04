"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import React from "react";
interface DeleteContactModalProps {
  open: boolean;
  onClose: () => void;
  contact: { name: string; email: string } | null;
  onConfirm: (data: { name: string; email: string }) => void;
}

const DeleteContactModal = ({
  open,
  onClose,
  contact,
  onConfirm,
}: DeleteContactModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Delete Room</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete this Room:{" "}
          <strong>{contact?.name}</strong>?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          color="error"
          variant="contained"
          onClick={() => contact && onConfirm(contact)}
          disabled={!contact}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteContactModal;
