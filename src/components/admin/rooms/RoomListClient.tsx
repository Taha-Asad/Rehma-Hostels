"use client";

import RoomModal from "./RoomModal";
import { deleteRoom, UpdateRoom } from "@/actions/room.action";
import { useTransition } from "react";

interface RoomListClientProps {
  rooms: Room[];
}

export default function RoomListClient({ rooms }: RoomListClientProps) {
  const [, startTransition] = useTransition();

  const handleDelete = (room: Room) => {
    startTransition(() => {
      deleteRoom(room.id);
    });
  };
  const handleEdit = (roomId: string, formData: FormData) => {
    startTransition(() => {
      UpdateRoom(roomId, formData);
    });
  };

  return (
    <>
      {rooms.map((room) => (
        <RoomModal
          key={room.id}
          room={room}
          onDelete={() => handleDelete(room)}
          onEdit={(id, data) => handleEdit(id, data)}
        />
      ))}
    </>
  );
}
