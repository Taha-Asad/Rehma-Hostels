"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAllRooms(): Promise<{
  success: boolean;
  data?: Room[];
  message?: string;
}> {
  try {
    const rooms = await prisma.room.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        serviceList: true,
        chips: true,
        price: true,
        duration: true,
        capacity: true,
        size: true,
        availability: true,
        rating: true,
        reviews: true,
        description: true,
        amenities: true,
      },
    });

    return { success: true, data: rooms };
  } catch (error) {
    console.log("Error in Get All Rooms", error);
    return {
      success: false,
      message: `Internal Server Error. ${error}`,
    };
  }
}

// -----------------------------------------------------
// CREATE ROOM
// -----------------------------------------------------
export async function createRoom(data: Room) {
  try {
    const {
      id,
      title,
      content,
      image,
      serviceList,
      chips,
      price,
      duration,
      capacity,
      size,
      availability,
      rating,
      reviews,
      description,
      amenities,
    } = data;

    if (
      !title ||
      !content ||
      !image ||
      !serviceList ||
      !chips ||
      !price ||
      !duration ||
      !capacity ||
      !size ||
      availability === undefined ||
      !rating ||
      !reviews ||
      !description ||
      !amenities
    ) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      };
    }

    const existence = await prisma.room.findFirst({ where: { title } });

    if (existence) {
      return {
        success: false,
        message: "Room with this title already exists",
      };
    }

    const newRoom = await prisma.room.create({
      data: {
        id,
        title,
        content,
        image,
        serviceList,
        chips,
        price,
        duration,
        capacity,
        size,
        availability,
        rating,
        reviews,
        description,
        amenities,
      },
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        serviceList: true,
        chips: true,
        price: true,
        duration: true,
        capacity: true,
        size: true,
        availability: true,
        rating: true,
        reviews: true,
        description: true,
        amenities: true,
      },
    });

    revalidatePath("/admin/rooms");

    return {
      success: true,
      data: newRoom,
    };
  } catch (error) {
    console.log("Error in Creating Rooms ", error);
    return {
      success: false,
      message: `Internal Server Error. ${error}`,
    };
  }
}

// -----------------------------------------------------
// GET ROOM BY ID
// -----------------------------------------------------
export async function getRoomById(roomId: string) {
  try {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return { success: false, error: "Room not found" };
    }

    return { success: true, data: room };
  } catch (error) {
    console.error("Get room by Id error:", error);
    return { success: false, error: "Failed to get room by Id" };
  }
}

// -----------------------------------------------------
// UPDATE ROOM
// -----------------------------------------------------
export async function UpdateRoom(roomId: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    const content = formData.get("content") as string;
    const price = formData.get("price") as string;
    const duration = formData.get("duration") as string;
    const capacity = Number(formData.get("capacity"));
    const size = formData.get("size") as string;
    const availability = formData.get("availability") as string;
    const rating = Number(formData.get("rating"));
    const reviews = Number(formData.get("reviews"));
    const description = formData.get("description") as string;

    const serviceListRaw = formData.get("serviceList") as string;
    const chipsRaw = formData.get("chips") as string;

    const serviceList = serviceListRaw ? JSON.parse(serviceListRaw) : [];
    const chips = chipsRaw ? JSON.parse(chipsRaw) : [];

    const UpdatedRoom = await prisma.room.update({
      where: { id: roomId },
      data: {
        title,
        image,
        content,
        price,
        duration,
        capacity,
        size,
        availability,
        rating,
        reviews,
        description,
        serviceList,
        chips,
      },
    });

    revalidatePath("/admin/rooms");

    return { success: true, data: UpdatedRoom };
  } catch (error) {
    console.error("Error updating room:", error);
    return { success: false, error: "Failed to update room" };
  }
}

// -----------------------------------------------------
// DELETE ROOM
// -----------------------------------------------------
export async function deleteRoom(roomId: string) {
  try {
    const existence = await prisma.room.findFirst({ where: { id: roomId } });

    if (!existence) {
      return {
        success: false,
        message: "Room does not exist",
      };
    }

    await prisma.room.delete({ where: { id: roomId } });

    revalidatePath("/admin/rooms");

    return { success: true };
  } catch (error) {
    console.error("Delete room error:", error);
    return { success: false, error: "Failed to delete room" };
  }
}
