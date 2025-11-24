"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  try {
    const usersByRole = await prisma.user.groupBy({
      by: ["role"],
      _count: { _all: true }, // Corrected for the user query as well
    });

    // --- Corrected Code Here ---
    const postsByStatus = await prisma.post.groupBy({
      by: ["status"],
      _count: { _all: true }, // Use _all to count all records in the group
      // You can also use an alias if preferred:
      // _count: { count: true }
    });
    // --- End Correction ---

    const [roomsCount, comments, likes] = await Promise.all([
      prisma.room.count(),
      prisma.comment.count(),
      prisma.like.count(),
    ]);

    return {
      success: true,
      data: {
        usersByRole,
        postsByStatus,
        rooms: roomsCount,
        comments,
        likes,
      },
    };
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return { success: false, data: null };
  }
}
