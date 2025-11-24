"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { compare, hash } from "bcryptjs";

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

// LOGIN -----------------------------------------------------------------

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
