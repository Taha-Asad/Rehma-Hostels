import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import DeleteBlogModal from "./DeleteBlogModal";
import EditBlogModal from "./EditBlogModal";
import type { Post } from "@prisma/client";
import CreateBlogModal from "./CreateBlogModal";
interface BlogCardProps {
  blogs: Post;
  onDelete: (blog: Post) => void;
  onEdit: (id: string, data: FormData) => void;
}
interface BlogModalCreateProps {
  onCreate: (data: FormData) => void;
}
export function BlogCardModal({ blogs, onEdit, onDelete }: BlogCardProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  return (
    <>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          color: "secondary.main",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "0.95rem",
          mt: "auto",
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            color: "#D4A373",
            gap: 1.5,
            "& .arrow-icon": {
              transform: "translateX(4px)",
            },
          },
        }}
      >
        <Button
          onClick={() => setOpenEditDialog(true)}
          sx={{
            bgcolor: "secondary.main",
            color: "text.secondary",
            border: "2px solid #7B2E2E",
            borderRadius: 0.5,
            mb: 2,
            py: "10px",
            px: "15px",
            width: 200,
            fontWeight: 600,
            boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
            transition: "all 0.3s",
            "&:hover": {
              bgcolor: "primary.main",
              color: "text.main",
            },
          }}
        >
          Edit
        </Button>
        <Button
          onClick={() => setOpenDeleteDialog(true)}
          sx={{
            bgcolor: "primary.main",
            color: "text.secondary",
            border: "2px solid #7B2E2E",
            borderRadius: 0.5,
            mb: 2,
            py: "10px",
            px: "15px",
            width: 200,
            fontWeight: 600,
            boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
            transition: "all 0.3s",
            "&:hover": {
              bgcolor: "secondary.main",
              color: "text.main",
            },
          }}
        >
          Delete
        </Button>
      </Box>
      <DeleteBlogModal
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        blog={{ title: blogs.title, authorId: blogs.authorId }}
        onConfirm={() => onDelete(blogs)}
      />
      <EditBlogModal
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        blog={blogs}
        onConfirm={(formData) => onEdit(blogs.id, formData)}
      />
    </>
  );
}

export function CreateBlogCardModal({ onCreate }: BlogModalCreateProps) {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpenCreateDialog(true)}
        sx={{
          bgcolor: "secondary.main",
          color: "secondary.contrastText",
          border: "2px solid #7B2E2E",
          borderRadius: 0.5,
          mb: 2,
          py: "10px",
          px: "15px",
          width: 200,
          fontWeight: 600,
          boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
          transition: "all 0.3s",
          "&:hover": {
            bgcolor: "primary.main",
            color: "secondary.contrastText",
          },
        }}
      >
        Create
      </Button>
      <CreateBlogModal
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onConfirm={(formData) => onCreate(formData)}
      />
    </>
  );
}
