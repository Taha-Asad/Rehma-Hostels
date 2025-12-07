"use server";

import { ContentBlock } from "@/components/admin/email/BlockEditor";
import { EmailContent } from "@/components/admin/email/ReplyModal";
import { generateEmailHtml, generateEmailText } from "@/lib/emailTemplate";
import { sendMail } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";

export async function GetAllEmails() {
  try {
    const subs = await prisma.subscription.findMany({
      select: { id: true, email: true, name: true, createdAt: true },
    });

    const contacts = await prisma.contact.findMany({
      select: { id: true, email: true, name: true, createdAt: true },
    });

    // const manual = await prisma.emailRecipient.findMany({
    //   select: { id: true, email: true, name: true, createdAt: true },
    // });

    return {
      success: true,
      data: [
        ...subs.map((s) => ({
          id: s.id,
          email: s.email,
          name: s.name,
          createdAt: s.createdAt,
          source: "Subscription",
        })),
        ...contacts.map((c) => ({
          id: c.id,

          email: c.email,
          name: c.name,
          createdAt: c.createdAt,
          source: "Contact Forms",
        })),
        // ...manual.map((m) => ({
        //   id: m.id,
        //   email: m.email,
        //   name: m.name,
        //   createdAt: m.createdAt,
        //   source: "Manual",
        // })),
      ],
    };
  } catch (error) {
    console.error("Database error while getting emails because:", error);
    return {
      success: false,
      message: "Error in getting emails form to database.",
    };
  }
}

export async function SendMailById(formData: FormData) {
  try {
    const contentRaw = formData.get("content");
    const blocksRaw = formData.get("blocks");

    if (!contentRaw || !blocksRaw) {
      return {
        success: false,
        message: "Missing required data",
        error: "Content and blocks are required",
      };
    }

    let content: EmailContent;
    let blocks: ContentBlock[];

    try {
      content = JSON.parse(contentRaw as string);
      blocks = JSON.parse(blocksRaw as string);
    } catch {
      return {
        success: false,
        message: "Invalid data format",
        error: "Failed to parse email content",
      };
    }

    const validBlocks = blocks.filter((block) => {
      if (
        block.type === "paragraph" ||
        block.type === "heading" ||
        block.type === "blockquote" ||
        block.type === "code"
      ) {
        return block.text && block.text.trim().length > 0;
      }

      if (block.type === "list") {
        return (
          block.items && block.items.some((item) => item.trim().length > 0)
        );
      }

      if (block.type === "image") {
        return block.src && block.src.trim().length > 0;
      }

      if (block.type === "link" || block.type === "button") {
        return (
          block.href &&
          block.href.trim().length > 0 &&
          block.text &&
          block.text.trim().length > 0
        );
      }

      return false;
    });

    const htmlContent = generateEmailHtml(content, validBlocks);
    const textContent = generateEmailText(content, validBlocks);

    const result = await sendMail(
      content.recipientEmail,
      content.subject,
      htmlContent,
      textContent
    );

    return {
      success: true,
      message: "Email successfully sent!",
      result,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Error in sending emails.",
    };
  }
}
