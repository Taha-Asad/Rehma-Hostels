import { getAllRooms } from "@/actions/room.action";
import Rooms from "./Rooms";

async function RoomPage() {
  const result = await getAllRooms();

  // Extract the actual rooms array
  const rooms = result?.data || [];

  return <Rooms rooms={rooms} />;
}

export default RoomPage;
