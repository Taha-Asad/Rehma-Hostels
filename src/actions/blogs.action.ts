/* eslint-disable @typescript-eslint/no-explicit-any */
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

// ContentBlock type matching the modal
export type ContentBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "code"; inline: boolean; text: string }
  | { type: "image"; src: string; alt?: string }
  | { type: "link"; href: string; text: string };

export async function CreateBlog(formData: FormData) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return { success: false, message: "Unauthorized" };
    }

    // Extract form data
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const fullContentRaw = formData.get("fullContent") as string;
    const dateRaw = formData.get("date") as string;
    const readTime = formData.get("readTime") as string;
    const category = formData.get("category") as string;
    const chipsRaw = formData.get("chips") as string;
    const statusRaw = formData.get("status") as string;

    // Validation
    if (!title || !content) {
      return { success: false, message: "Title and content are required" };
    }

    // Parse and validate fullContent
    let fullContent: ContentBlock[] = [];
    try {
      if (fullContentRaw) {
        fullContent = JSON.parse(fullContentRaw);
        // Validate each content block
        if (!Array.isArray(fullContent)) {
          fullContent = [];
        }
      }
    } catch (error) {
      console.error("Error parsing fullContent:", error);
      fullContent = [];
    }

    // Parse and validate chips
    let chips: { label: string; position: string }[] = [];
    try {
      if (chipsRaw) {
        chips = JSON.parse(chipsRaw);
        // Validate chips structure
        if (!Array.isArray(chips)) {
          chips = [];
        } else {
          chips = chips.filter(
            (chip) =>
              typeof chip === "object" && "label" in chip && "position" in chip
          );
        }
      }
    } catch (error) {
      console.error("Error parsing chips:", error);
      chips = [];
    }

    // Parse and validate date
    let date = new Date();
    if (dateRaw) {
      const parsedDate = new Date(dateRaw);
      if (!isNaN(parsedDate.getTime())) {
        date = parsedDate;
      }
    }

    // Validate status enum
    let status: PostStatus = "DRAFT";
    if (
      statusRaw === "DRAFT" ||
      statusRaw === "PUBLISHED" ||
      statusRaw === "ARCHIVED"
    ) {
      status = statusRaw as PostStatus;
    }

    // Handle image upload
    let imageUrl: string | null = null;
    const imageFile = formData.get("image") as File | null;

    if (imageFile && imageFile.size > 0) {
      try {
        const uploadRes = await utapi.uploadFiles(imageFile);
        if (uploadRes?.data?.url) {
          imageUrl = uploadRes.data.url;
        }
      } catch (error) {
        console.error("Image upload error:", error);
        // Continue without image
      }
    }

    // Create the blog post
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        fullContent: fullContent, // Prisma will stringify this automatically if it's a Json field
        date,
        readTime: readTime || "5 min read",
        category: category || "General",
        chips: chips, // Prisma will stringify this automatically if it's a Json field
        status,
        image: imageUrl,
        authorId: session.user.id,
      },
      include: {
        author: true,
        comments: true,
        likes: true,
        notifications: true,
      },
    });

    revalidatePath("/admin/blogs");
    revalidatePath("/news");

    return {
      success: true,
      data: newPost,
      message: "Blog post created successfully",
    };
  } catch (error) {
    console.error("CreateBlog error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create blog post",
    };
  }
}

export async function UpdateBlog(formData: FormData) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return { success: false, message: "Unauthorized" };
    }

    // Get post ID from formData
    const postId = formData.get("id") as string;
    if (!postId) {
      return { success: false, message: "Post ID is required" };
    }

    // Fetch existing post to avoid overwriting author and check permissions
    const existing = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        authorId: true,
        image: true, // Get existing image for potential deletion
      },
    });

    if (!existing) {
      return { success: false, message: "Post not found" };
    }

    // Optional: Check if user is author or admin
    // if (existing.authorId !== session.user.id && session.user.role !== "ADMIN") {
    //   return { success: false, message: "Unauthorized to edit this post" };
    // }

    // Extract form data
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const fullContentRaw = formData.get("fullContent") as string;
    const dateRaw = formData.get("date") as string;
    const readTime = formData.get("readTime") as string;
    const category = formData.get("category") as string;
    const chipsRaw = formData.get("chips") as string;
    const statusRaw = formData.get("status") as string;

    // Validation
    if (!title || !content) {
      return { success: false, message: "Title and content are required" };
    }

    // Parse and validate fullContent
    let fullContent: ContentBlock[] = [];
    try {
      if (fullContentRaw) {
        fullContent = JSON.parse(fullContentRaw);
        // Validate it's an array
        if (!Array.isArray(fullContent)) {
          fullContent = [];
        }
        // Filter out any invalid blocks
        fullContent = fullContent.filter(
          (block) => block && typeof block === "object" && "type" in block
        );
      }
    } catch (error) {
      console.error("Error parsing fullContent:", error);
      fullContent = [];
    }

    // Parse and validate chips
    let chips: { label: string; position: string }[] = [];
    try {
      if (chipsRaw) {
        chips = JSON.parse(chipsRaw);
        // Validate chips structure
        if (!Array.isArray(chips)) {
          chips = [];
        } else {
          chips = chips.filter(
            (chip) =>
              typeof chip === "object" &&
              "label" in chip &&
              "position" in chip &&
              typeof chip.label === "string" &&
              typeof chip.position === "string"
          );
        }
      }
    } catch (error) {
      console.error("Error parsing chips:", error);
      chips = [];
    }

    // Parse and validate date
    const date = new Date(dateRaw);
    if (isNaN(date.getTime())) {
      return { success: false, message: "Invalid date" };
    }

    // Validate status enum
    if (
      statusRaw !== "DRAFT" &&
      statusRaw !== "PUBLISHED" &&
      statusRaw !== "ARCHIVED"
    ) {
      return { success: false, message: "Invalid status" };
    }
    const status = statusRaw as PostStatus;

    // Handle image upload
    let imageUrl: string | undefined | null = undefined;
    const imageFile = formData.get("image") as File | null;

    if (imageFile && imageFile.size > 0) {
      try {
        // Optional: Delete old image from uploadthing if replacing
        // if (existing.image) {
        //   await utapi.deleteFiles(existing.image);
        // }

        const uploadRes = await utapi.uploadFiles(imageFile);
        if (uploadRes?.data?.url) {
          imageUrl = uploadRes.data.url;
        }
      } catch (error) {
        console.error("Image upload error:", error);
        // Continue with existing image
      }
    }

    // Prepare update data
    const updateData: any = {
      title,
      content,
      fullContent: fullContent, // Prisma will stringify this automatically
      date,
      readTime: readTime || "5 min read",
      category: category || "General",
      chips: chips, // Prisma will stringify this automatically
      status,
      updatedAt: new Date(),
    };

    // Only update image if new one was uploaded
    if (imageUrl !== undefined) {
      updateData.image = imageUrl;
    }

    // Update the post
    const updated = await prisma.post.update({
      where: { id: postId },
      data: updateData,
      include: {
        author: true,
        comments: true,
        likes: true,
        notifications: true,
      },
    });

    revalidatePath("/admin/blogs");
    revalidatePath("/news");
    revalidatePath(`/news/${postId}`);

    return {
      success: true,
      data: updated,
      message: "Blog post updated successfully",
    };
  } catch (error) {
    console.error("UpdateBlog error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Blog update failed",
    };
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

export async function getPublishedBlogs(limit: number = 3) {
  try {
    const blogs = await prisma.post.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: {
        date: "desc",
      },
      take: limit,
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Transform the data
    const transformedBlogs = blogs.map((blog) => {
      let parsedChips = [];
      let parsedFullContent: ContentBlock[] = [];

      // Parse chips
      try {
        if (typeof blog.chips === "string") {
          parsedChips = JSON.parse(blog.chips);
        } else if (Array.isArray(blog.chips)) {
          parsedChips = blog.chips;
        }
      } catch (error) {
        console.error("Error parsing chips:", error);
        parsedChips = [];
      }

      // Parse fullContent
      try {
        if (typeof blog.fullContent === "string") {
          parsedFullContent = JSON.parse(blog.fullContent);
        } else if (Array.isArray(blog.fullContent)) {
          parsedFullContent = blog.fullContent as ContentBlock[];
        }
      } catch (error) {
        console.error("Error parsing fullContent:", error);
        parsedFullContent = [];
      }

      return {
        id: blog.id,
        title: blog.title || "",
        content: blog.content || "",
        image: blog.image || "/placeholder.jpg",
        date: blog.date ? new Date(blog.date).toLocaleDateString() : "",
        category: blog.category || "General",
        author: blog.author?.name || "Admin",
        readTime: blog.readTime || "5 min read",
        chips: parsedChips,
        fullContent: parsedFullContent,
      };
    });

    return { success: true, data: transformedBlogs };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { success: false, data: [] };
  }
}

function parseJSONSafe<T>(value: unknown, fallback: T): T {
  try {
    if (typeof value === "string") return JSON.parse(value) as T;
    if (Array.isArray(value)) return value as T;
    return fallback;
  } catch {
    return fallback;
  }
}

export type ChipDTO = { label: string; position: "top-right" | "bottom-left" };

export type NewsArticle = {
  id: string;
  image: string;
  title: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  chips: ChipDTO[];
  views?: number;
  featured?: boolean;
};
export async function getArticleById(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: { select: { name: true } },
    },
  });

  if (!post) return null;

  const fullContent = parseJSONSafe<ContentBlock[]>(post.fullContent, []);

  return {
    id: post.id,
    title: post.title ?? "",
    content: post.content ?? "",
    image: post.image ?? "",
    date: post.date ? new Date(post.date).toLocaleDateString("en-US") : "",
    author: post.author?.name ?? "Admin",
    readTime: post.readTime ?? "5 min read",
    category: post.category ?? "General",
    fullContent,
  };
}

export async function getPublishedNews(limit?: number) {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { date: "desc" },
    take: limit,
    include: { author: { select: { name: true } } },
  });

  return posts.map((p) => {
    const chips = parseJSONSafe<ChipDTO[]>(p.chips, []);

    const views = (p as any).views ?? 0;
    const featured =
      (p as any).featured ??
      chips.some((c) => c.label?.toLowerCase() === "featured");

    return {
      id: String(p.id),
      title: p.title || "",
      content: p.content || "",
      image: p.image || "",
      date: p.date ? new Date(p.date).toLocaleDateString() : "",
      author: p.author?.name || "Admin",
      readTime: p.readTime || "5 min read",
      category: p.category || "General",
      views,
      featured,
      chips,
    };
  });
}
