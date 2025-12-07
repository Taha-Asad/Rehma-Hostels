"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface DeleteSubModalProps {
  open: boolean;
  onClose: () => void;
  subscriber: { name: string; email: string } | null;
  onConfirm: (form: { name: string; email: string }) => void;
}

export default function DeleteSubModal({
  open,
  onClose,
  subscriber,
  onConfirm,
}: DeleteSubModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Delete Subscription</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete Subscription:{" "}
          <strong>{subscriber?.name}</strong>?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => subscriber && onConfirm(subscriber)}
          disabled={!subscriber}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
