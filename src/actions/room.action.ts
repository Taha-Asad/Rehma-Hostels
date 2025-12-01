"use server";
import { prisma } from "@/lib/prisma";
import { utapi } from "@/utils/uploadthing";
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

export async function createRoom(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const price = formData.get("price") as string;
    const duration = formData.get("duration") as string;
    const capacity = Number(formData.get("capacity"));
    const size = formData.get("size") as string;
    const availability = formData.get("availability") as string;
    const rating = Number(formData.get("rating"));
    const reviews = Number(formData.get("reviews"));
    const description = formData.get("description") as string;

    // JSON fields
    const serviceList = JSON.parse(formData.get("serviceList") as string);
    const chips = JSON.parse(formData.get("chips") as string);
    const amenities = JSON.parse(formData.get("amenities") as string);

    // Image
    const imageFile = formData.get("image") as File | null;

    // Validate
    if (
      !title?.trim() ||
      !content?.trim() ||
      !imageFile ||
      !price ||
      !duration ||
      !size ||
      !availability?.trim() ||
      !description?.trim()
    ) {
      return {
        success: false,
        message: "Please fill required fields",
      };
    }

    // Check duplicate
    const exists = await prisma.room.findFirst({ where: { title } });
    if (exists) {
      return {
        success: false,
        message: "Room with this title already exists",
      };
    }

    // Upload image
    let imageUrl: string | null = null;
    if (imageFile && imageFile.size > 0) {
      const uploaded = await utapi.uploadFiles(imageFile);

      // Correct property: uploaded.data.url
      imageUrl = uploaded?.data?.ufsUrl ?? null;
    }

    // Create room
    const newRoom = await prisma.room.create({
      data: {
        title,
        content,
        image: imageUrl,
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

    return { success: true, data: newRoom };
  } catch (error) {
    console.log("Error in Creating Rooms", error);
    return {
      success: false,
      message: `Internal Server Error. ${error}`,
    };
  }
}
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

export async function UpdateRoom(roomId: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const price = formData.get("price") as string;
    const duration = formData.get("duration") as string;
    const capacity = Number(formData.get("capacity"));
    const size = formData.get("size") as string;
    const availability = formData.get("availability") as string;
    const rating = Number(formData.get("rating"));
    const reviews = Number(formData.get("reviews"));
    const description = formData.get("description") as string;

    const serviceList = JSON.parse(formData.get("serviceList") as string);
    const chips = JSON.parse(formData.get("chips") as string);
    const amenities = JSON.parse(formData.get("amenities") as string);

    const imageFile = formData.get("image") as File | null;

    let imageUrl: string | undefined | null = null;

    if (imageFile && imageFile.size > 0) {
      const uploadRes = await utapi.uploadFiles(imageFile);

      // Correct path
      imageUrl = uploadRes?.data?.ufsUrl;
    }

    // ********** APPLY UPDATE **********
    const updated = await prisma.room.update({
      where: { id: roomId },
      data: {
        title,
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
        amenities,
        ...(imageUrl && { image: imageUrl }), // update only if new image was uploaded
      },
    });
    revalidatePath("/admin/rooms");
    return { success: true, data: updated };
  } catch (e) {
    console.error("UpdateRoom error:", e);
    return { success: false, message: "Room update failed" };
  }
}

export async function deleteRoom(roomId: string) {
  try {
    const existence = await prisma.room.findFirst({ where: { id: roomId } });
    if (!existence) {
      return { success: false, message: "Room does not exist" };
    }
    await prisma.room.delete({ where: { id: roomId } });
    revalidatePath("/admin/rooms");
    return { success: true };
  } catch (error) {
    console.error("Delete room error:", error);
    return { success: false, error: "Failed to delete room" };
  }
}
