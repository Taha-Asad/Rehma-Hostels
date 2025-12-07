"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface DeleteRoomModalProps {
  open: boolean;
  onClose: () => void;
  room: { title: string; price: number } | null;
  onConfirm: (data: { title: string; price: number }) => void;
}

export default function DeleteRoomModal({
  open,
  onClose,
  room,
  onConfirm,
}: DeleteRoomModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Delete Room</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete this Room:{" "}
          <strong>{room?.title}</strong>?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          color="error"
          variant="contained"
          onClick={() => room && onConfirm(room)}
          disabled={!room}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
