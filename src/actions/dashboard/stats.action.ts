"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  try {
    const [usersByRole, postsByStatus, roomsCount] = await Promise.all([
      prisma.user.groupBy({
        by: ["role"],
        _count: { _all: true },
        orderBy: {
          role: "asc",
        },
      }),

      prisma.post.groupBy({
        by: ["status"],
        _count: { _all: true },
        orderBy: {
          status: "asc",
        },
      }),

      prisma.room.count(),
    ]);

    return {
      success: true,
      data: {
        usersByRole,
        postsByStatus,
        rooms: roomsCount,
      },
    };
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return { success: false, data: null };
  }
}
