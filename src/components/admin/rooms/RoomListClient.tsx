"use client";

import { createRoom, deleteRoom, UpdateRoom } from "@/actions/room.action";
import { useTransition } from "react";
import { CreateRoomCardModal, RoomCardModal } from "./RoomModal";

interface RoomListClientProps {
  rooms: Room[];
}

export function RoomListCardClient({ rooms }: RoomListClientProps) {
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
        <RoomCardModal
          key={room.id}
          room={room}
          onDelete={() => handleDelete(room)}
          onEdit={(id, data) => handleEdit(id, data)}
        />
      ))}
    </>
  );
}

export function RoomCreateClient() {
  const [, startTransition] = useTransition();

  const handleCreate = (formData: FormData) => {
    startTransition(async () => {
      const res = await createRoom(formData);
      console.log("SERVER RESULT:", res); // add this
    });
  };
  return (
    <>
      <CreateRoomCardModal onCreate={(data) => handleCreate(data)} />
    </>
  );
}
