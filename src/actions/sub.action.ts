"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAllSubscription() {
  try {
    const subs = await prisma.subscription.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
        name: true,
      },
    });
    return { success: true, data: subs };
  } catch (error) {
    console.log(`Error getting all subs ${error}`);
    return { success: false, error: "Failed to get all subs" };
  }
}

export async function DeleteSubscription(subId: string) {
  try {
    if (!subId) {
      return null;
    }

    await prisma.subscription.delete({
      where: { id: subId },
    });
    revalidatePath("/admin/subscriptions");
    return { success: true };
  } catch (error) {
    console.log(`Error deleting all  ${error}`);
    return { success: false, error: "Failed to delete subs" };
  }
}
