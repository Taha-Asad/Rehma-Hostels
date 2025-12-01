import { prisma } from "@/lib/prisma";

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
