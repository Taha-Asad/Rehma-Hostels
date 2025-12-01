"use client";

import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import DeleteRoomModal from "./DeleteRoomModal";
import EditRoomModal from "./EditRoomModal";
import CreateRoomModal from "./CreateRoomModal";

interface RoomModalCardProps {
  room: Room;
  onDelete: (room: Room) => void;
  onEdit: (id: string, data: FormData) => void;
}
interface RoomModalCreateProps {
  onCreate: (data: FormData) => void;
}
export function RoomCardModal({ room, onDelete, onEdit }: RoomModalCardProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  return (
    <>
      <Box
        sx={{
          mt: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: "auto",
            mb: 2,
            gap: 2,
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
      </Box>
      <DeleteRoomModal
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        room={{ title: room.title, price: room.price }}
        onConfirm={() => onDelete(room)}
      />
      <EditRoomModal
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        room={room}
        onConfirm={(formData) => onEdit(room.id, formData)}
      />
    </>
  );
}

export function CreateRoomCardModal({ onCreate }: RoomModalCreateProps) {
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
      <CreateRoomModal
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onConfirm={(formData) => onCreate(formData)}
      />
    </>
  );
}
