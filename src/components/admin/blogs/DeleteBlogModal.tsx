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

interface DeleteBlogModal {
  open: boolean;
  onClose: () => void;
  blog: { title: string; authorId: string } | null;
  onConfirm: (data: { title: string; authorId: string }) => void;
}
function DeleteBlogModal({ open, onClose, blog, onConfirm }: DeleteBlogModal) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Delete The Blog</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete this blog:{" "}
          <strong>{blog?.title}</strong>?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          color="error"
          variant="contained"
          onClick={() => blog && onConfirm(blog)}
          disabled={!blog}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteBlogModal;
