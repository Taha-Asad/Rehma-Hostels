"use server";

import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { compare, hash } from "bcryptjs";
import { revalidatePath } from "next/cache";

// Generate a readable admin-friendly user code
function generateUserCode() {
  return "USR-" + Math.floor(100000 + Math.random() * 900000).toString();
}

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        userCode: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        role: true,
        password: false,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      success: true,
      data: users,
    };
  } catch (error) {
    console.log("Error in Get All Users ");
    return {
      success: false,
      message: `Internal Server Error. ${error}`,
    };
  }
}

export async function CreateUser(
  name: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string,
  image?: string
) {
  try {
    if (!name || !email || !phone || !password || !confirmPassword) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    const pakistanPhoneRegex = /^\+923\d{9}$/;
    if (!pakistanPhoneRegex.test(phone)) {
      return {
        success: false,
        message: "Enter a valid Pakistan number like +923001234567.",
      };
    }

    if (password !== confirmPassword) {
      return {
        success: false,
        message: "Passwords do not match.",
      };
    }

    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      return {
        success: false,
        message: "User with this email already exists.",
      };
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        userCode: generateUserCode(),
        name,
        email,
        phone,
        password: hashedPassword,
        image: image || null,
        role: "USER",
      },
      select: {
        id: true,
        userCode: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        role: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      message: "User created successfully.",
      user,
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      message: "Something went wrong while creating the user.",
    };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminEmail) {
      if (password !== adminPassword) {
        return {
          success: false,
          message: "Wrong admin password",
        };
      }

      return {
        success: true,
        message: "Admin login successful",
        isAdmin: true,
      };
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        success: false,
        message: "User does not exist",
      };
    }

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      return {
        success: false,
        message: "Wrong password",
      };
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      return {
        success: false,
        message: res.error,
      };
    }

    const isAdmin = user.role === "ADMIN";

    return {
      success: true,
      message: "Login successful",
      isAdmin,
    };
  } catch (error) {
    return {
      success: false,
      message: `Login error: ${error}`,
    };
  }
}

export async function UpdateUser(formData: FormData) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    const userId = session.user.id;

    const name = formData.get("name") as string;
    const image = formData.get("image") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        image,
        email,
        phone,
      },
    });

    return { success: true, data: updatedUser };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

export async function deleteUser(userId: string) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    if (session.user.role !== "ADMIN") {
      return { success: false, error: "Forbidden: Admins only" };
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Delete user error:", error);
    return { success: false, error: "Failed to delete user" };
  }
}

export async function UpdateUserAdmin(userId: string, formData: FormData) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    if (session.user.role !== "ADMIN") {
      return { success: false, error: "Forbidden: Admins only" };
    }
    const name = formData.get("name") as string;
    const image = formData.get("image") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const role = formData.get("role") as "ADMIN" | "USER";
    await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        image,
        email,
        phone,
        role,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Update user by admin error:", error);
    return { success: false, error: "Failed to update user" };
  }
}

export async function logoutUser() {
  try {
    signOut();
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error: "Failed to logout" };
  }
}

export async function getUserById(userId: string) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    if (session.user.role !== "ADMIN") {
      return { success: false, error: "Forbidden: Admins only" };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    return { success: true, data: user };
  } catch (error) {
    console.error("Get User by Id error:", error);
    return { success: false, error: "Failed to get user by Id" };
  }
}

export async function changePassword(data: {
  oldPassword: string;
  newPassword: string;
}) {
  const session = await auth();
  if (!session) return { error: "Not logged in" };

  // Basic validation so TS doesn't cry
  if (
    !data ||
    typeof data.oldPassword !== "string" ||
    typeof data.newPassword !== "string" ||
    data.oldPassword.trim() === "" ||
    data.newPassword.trim() === ""
  ) {
    return { error: "Invalid input" };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) return { error: "User not found" };

  const match = await compare(data.oldPassword, user.password);
  if (!match) return { error: "Incorrect old password" };

  const hashedNew = await hash(data.newPassword, 10);

  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashedNew },
  });

  return { success: true };
}

export async function getAdmin() {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    if (session.user.role !== "ADMIN") {
      return { success: false, error: "Forbidden: Admins only" };
    }
    const admin = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        image: true,
        email: true,
      },
    });

    if (!admin) {
      return { success: false, error: "Admin not found" };
    }

    return { success: true, data: admin };
  } catch (error) {
    console.error(`Error in getting admin ${error}`);
    return { success: false, error: "Failed to get admin" };
  }
}
