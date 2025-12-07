"use server";
import prisma from "@/lib/prisma";
import { utapi } from "@/utils/uploadthing";
import { revalidatePath } from "next/cache";

export async function getAllRooms() {
  try {
    const rooms = await prisma.room.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        serviceList: true,
        chips: true,
        featured: true,
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

// Retry utility function
async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    if (retries > 0 && error?.code === "ETIMEDOUT") {
      console.log(`Retrying... ${retries} attempts left`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

export async function createRoom(formData: FormData) {
  try {
    // Parse price as integer
    const priceString = formData.get("price") as string;
    const price = priceString ? parseInt(priceString, 10) : 0;

    if (isNaN(price) || price <= 0) {
      return { success: false, message: "Invalid price value" };
    }

    // Parse featured as boolean
    const featuredString = formData.get("featured") as string;
    const featured = featuredString === "true";

    // Parse other numeric fields
    const capacityString = formData.get("capacity") as string;
    const capacity = capacityString ? parseInt(capacityString, 10) : 1;

    const ratingString = formData.get("rating") as string;
    const rating = ratingString ? parseFloat(ratingString) : 0;

    const reviewsString = formData.get("reviews") as string;
    const reviews = reviewsString ? parseInt(reviewsString, 10) : 0;

    // Parse JSON arrays
    const serviceList = JSON.parse(
      (formData.get("serviceList") as string) || "[]"
    );
    const chips = JSON.parse((formData.get("chips") as string) || "[]");
    const amenities = JSON.parse((formData.get("amenities") as string) || "[]");

    // Get image URL (already uploaded by UploadThing)
    const imageFile = formData.get("image") as File | null;

    let imageUrl: string | null = null;
    if (imageFile && imageFile.size > 0) {
      const uploaded = await utapi.uploadFiles(imageFile);

      // Correct property: uploaded.data.url
      imageUrl = uploaded?.data?.ufsUrl ?? null;
    }
    // Create room with retry logic
    const newRoom = await withRetry(async () => {
      return prisma.room.create({
        data: {
          title: formData.get("title") as string,
          content: formData.get("content") as string,
          image: imageUrl,
          serviceList,
          chips,
          price,
          duration: formData.get("duration") as string,
          capacity,
          size: formData.get("size") as string,
          availability: formData.get("availability") as string,
          rating,
          reviews,
          description: formData.get("description") as string,
          amenities,
          featured,
        },
      });
    });

    // Revalidate paths
    revalidatePath("/rooms");
    revalidatePath("/admin/rooms");

    return {
      success: true,
      data: newRoom,
      message: "Room created successfully",
    };
  } catch (error: any) {
    console.error("Error creating room:", error);

    // Provide more specific error messages
    if (error?.code === "ETIMEDOUT") {
      return {
        success: false,
        message: "Database connection timed out. Please try again.",
      };
    }

    if (error?.code === "P2002") {
      return {
        success: false,
        message: "A room with this title already exists.",
      };
    }

    return {
      success: false,
      message: `Failed to create room: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
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

export async function UpdateRoom(roomID: string, formData: FormData) {
  try {
    const id = roomID;

    if (!id) {
      return { success: false, message: "Room ID is required" };
    }

    // Parse price as integer
    const priceString = formData.get("price") as string;
    const price = priceString ? parseInt(priceString, 10) : 0;

    if (isNaN(price) || price <= 0) {
      return { success: false, message: "Invalid price value" };
    }

    // Parse featured as boolean
    const featuredString = formData.get("featured") as string;
    const featured = featuredString === "true";

    // Parse other numeric fields
    const capacityString = formData.get("capacity") as string;
    const capacity = capacityString ? parseInt(capacityString, 10) : null;

    const ratingString = formData.get("rating") as string;
    const rating = ratingString ? parseFloat(ratingString) : null;

    const reviewsString = formData.get("reviews") as string;
    const reviews = reviewsString ? parseInt(reviewsString, 10) : null;

    // Parse JSON arrays
    const serviceList = JSON.parse(
      (formData.get("serviceList") as string) || "[]"
    );
    const chips = JSON.parse((formData.get("chips") as string) || "[]");
    const amenities = JSON.parse((formData.get("amenities") as string) || "[]");

    // Handle image upload
    const imageFile = formData.get("image") as File | null;
    let imageUrl: string | undefined;

    if (imageFile && imageFile.size > 0) {
      const uploadRes = await utapi.uploadFiles(imageFile);

      // Correct path
      imageUrl = uploadRes?.data?.ufsUrl;
    }

    // Build update data
    const updateData: Room = {
      id: id,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      serviceList,
      chips,
      price, // Integer
      duration: formData.get("duration") as string,
      capacity,
      size: formData.get("size") as string,
      availability: formData.get("availability") as string,
      rating,
      reviews,
      image: imageUrl || "",
      description: formData.get("description") as string,
      amenities,
      featured, // Boolean
    };

    // Only update image if new one was uploaded
    if (imageUrl) {
      updateData.image = imageUrl;
    }

    // Update in database
    const updatedRoom = await prisma.room.update({
      where: { id },
      data: updateData,
    });

    // Revalidate paths
    revalidatePath("/rooms");
    revalidatePath("/admin/rooms");

    return {
      success: true,
      data: updatedRoom,
      message: "Room updated successfully",
    };
  } catch (error) {
    console.error("Error updating room:", error);
    return {
      success: false,
      message: `Failed to update room: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
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
