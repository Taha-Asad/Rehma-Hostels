import React from "react";
import RoomClient from "./RoomClient";
import { getAllRooms } from "@/actions/room.action";

async function page() {
  const { success, data } = await getAllRooms();

  if (!success || !data) return <div>Failed to load rooms</div>;

  return <RoomClient allRooms={data} />;
}

export default page;
