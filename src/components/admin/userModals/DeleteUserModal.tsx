"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface DeleteUserModalProps {
  open: boolean;
  onClose: () => void;
  user: { name: string; email: string } | null;
  onConfirm: (form: { name: string; email: string }) => void;
}

export default function DeleteUserModal({
  open,
  onClose,
  user,
  onConfirm,
}: DeleteUserModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Delete User</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete user: <strong>{user?.name}</strong>?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => user && onConfirm(user)}
          disabled={!user}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
