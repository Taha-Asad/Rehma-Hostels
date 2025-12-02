"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { utapi } from "@/utils/uploadthing";
import type { PostStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getAllBlogs() {
  try {
    const blogs = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        fullContent: true,
        image: true,
        date: true,
        authorId: true,
        readTime: true,
        category: true,
        chips: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        author: true,
        comments: true,
        likes: true,
        notifications: true,
      },
    });

    return { success: true, data: blogs };
  } catch (error) {
    return {
      success: false,
      message: `Internal Server Error. ${error}`,
    };
  }
}

export async function UpdateBlog(postId: string, formData: FormData) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return { success: false, message: "Unauthorized" };
    }

    // Fetch existing to avoid overwriting author
    const existing = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!existing) {
      return { success: false, message: "Post not found" };
    }

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const fullContent = formData.get("fullContent") as string;

    const date = new Date(formData.get("date") as string);
    if (isNaN(date.getTime())) {
      return { success: false, message: "Invalid date" };
    }

    const readTime = formData.get("readTime") as string;
    const category = formData.get("category") as string;

    const chips = JSON.parse(formData.get("chips") as string);

    // Status enum validation
    const rawStatus = formData.get("status");
    if (
      rawStatus !== "DRAFT" &&
      rawStatus !== "PUBLISHED" &&
      rawStatus !== "ARCHIVED"
    ) {
      return { success: false, message: "Invalid status" };
    }
    const status = rawStatus as PostStatus;

    // Image upload
    const imageFile = formData.get("image") as File | null;
    let imageUrl: string | undefined | null = null;

    if (imageFile && imageFile.size > 0) {
      const uploadRes = await utapi.uploadFiles(imageFile);
      imageUrl = uploadRes?.data?.ufsUrl || null;
    }

    const updated = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        fullContent,
        date,
        readTime,
        category,
        chips,
        status,
        ...(imageUrl && { image: imageUrl }),
      },
      include: {
        author: true,
        comments: true,
        likes: true,
        notifications: true,
      },
    });

    revalidatePath("/admin/blogs");
    return { success: true, data: updated };
  } catch (e) {
    console.error("UpdateBlog error:", e);
    return { success: false, message: "Blog update failed" };
  }
}

export async function DeleteBlog(postId: string) {
  try {
    const existence = await prisma.post.findFirst({ where: { id: postId } });
    if (!existence) {
      return { success: false, message: "Blog does not exist" };
    }
    await prisma.post.delete({ where: { id: postId } });
    revalidatePath("/admin/blogs");
    return { success: true };
  } catch (error) {
    console.error("Delete blog error:", error);
    return { success: false, error: "Failed to blog room" };
  }
}
