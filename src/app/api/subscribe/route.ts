"use server";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const data = await req.formData(); // sending FormData from client
    const email = data.get("email") as string;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email required" },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const exists = await prisma.subscription.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json(
        { success: false, message: "Already subscribed" },
        { status: 409 }
      );
    }

    // Save subscription
    const name = email.split("@")[0];
    const sub = await prisma.subscription.create({ data: { email, name } });

    // Send emails
    const formattedDate = new Date(sub.createdAt).toLocaleString("en-PK", {
      timeZone: "Asia/Karachi",
      dateStyle: "medium",
      timeStyle: "short",
    });

    // Admin email HTML
    const adminHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Newsletter Subscription - REHMA Hostel</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #faf6f5;
            color: #3d444b;
            font-family: "Poppins", sans-serif;
          }

          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid #e8e5e3;
            box-shadow: 0 8px 28px rgba(123, 46, 46, 0.2);
          }

          .header {
            background: linear-gradient(90deg, #7b2e2e, #5f2424);
            color: #ffffff;
            text-align: center;
            padding: 28px 24px;
          }

          .header h2 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 0.5px;
          }

          .content {
            padding: 32px;
            background-color: #fffaf9;
          }

          .content h3 {
            margin-top: 0;
            font-size: 20px;
            color: #7b2e2e;
            font-weight: 600;
          }

          .content p {
            line-height: 1.7;
            color: #3d444b;
            margin-bottom: 18px;
          }

          .highlight {
            color: #7b2e2e;
            font-weight: 600;
          }

          .details {
            background-color: #f8f5f3;
            padding: 14px 20px;
            border-radius: 8px;
            border-left: 4px solid #7b2e2e;
            margin-bottom: 20px;
          }

          .details p {
            margin: 6px 0;
            font-size: 15px;
          }

          .footer {
            background-color: #7b2e2e;
            text-align: center;
            padding: 18px;
            font-size: 13px;
            color: #f8f5f3;
          }

          .footer a {
            color: #d4a373;
            text-decoration: none;
          }

          .footer a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Newsletter Subscriber</h2>
            <p style="margin: 6px 0 0; font-size: 14px;">
              Someone just joined the REHMA Hostel newsletter!
            </p>
          </div>

          <div class="content">
            <h3>Hello Admin,</h3>
            <p>
              A new user has successfully subscribed to the
              <span class="highlight">REHMA Hostel</span> newsletter. Here are their
              details:
            </p>

            <div class="details">
              <p><strong>Name:</strong> ${sub.name}</p>
              <p><strong>Email:</strong> ${sub.email}</p>
              <p><strong>Subscribed On:</strong> ${formattedDate}</p>
            </div>

            <p>
              You can view all subscriber records in your admin dashboard for
              further actions.
            </p>
          </div>

          <div class="footer">
            <p>
              © REHMA Hostel | Admin Notification<br />
            </p>
          </div>
        </div>
      </body>
    </html>
    `;

    // User email HTML
    const userHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to REHMA Hostel Newsletter</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #faf6f5;
            color: #3d444b;
            font-family: "Poppins", sans-serif;
          }

          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid #e8e5e3;
            box-shadow: 0 8px 28px rgba(123, 46, 46, 0.2);
          }

          .header {
            background: linear-gradient(90deg, #7b2e2e, #5f2424);
            color: #ffffff;
            text-align: center;
            padding: 28px 24px;
          }

          .header h2 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 0.5px;
          }

          .content {
            padding: 32px;
            background-color: #fffaf9;
          }

          .content h3 {
            margin-top: 0;
            font-size: 20px;
            color: #7b2e2e;
            font-weight: 600;
          }

          .content p {
            line-height: 1.7;
            color: #3d444b;
            margin-bottom: 18px;
          }

          .highlight {
            color: #7b2e2e;
            font-weight: 600;
          }

          .cta {
            display: inline-block;
            margin-top: 12px;
            padding: 12px 22px;
            background: linear-gradient(90deg, #7b2e2e, #d4a373);
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 15px;
          }

          .footer {
            background-color: #7b2e2e;
            text-align: center;
            padding: 18px;
            font-size: 13px;
            color: #f8f5f3;
          }

          .footer a {
            color: #d4a373;
            text-decoration: none;
          }

          .footer a:hover {
            text-decoration: underline;
          }
        </style>
      </head>

      <body>
        <div class="container">
          <div class="header">
            <h2>Welcome to REHMA Hostel!</h2>
            <p style="margin: 6px 0 0; font-size: 14px;">
              You’re officially subscribed to our newsletter
            </p>
          </div>

          <div class="content">
            <h3>Thank You for Joining Us!</h3>
            <p>
              Hi <span class="highlight"> ${sub.name}</span>,<br />
              We’re thrilled to have you on board! You’ll now receive updates,
              exclusive offers, and important announcements from
              <span class="highlight">REHMA Hostel</span> directly in your inbox.
            </p>

            <p>
              We promise not to spam — just honest updates about rooms, hostel life,
              and things that might actually interest you.
            </p>

            <p>
              Want to check out our latest rooms and amenities right now? Click
              below to explore.
            </p>

            <a href="https://www.rehmahostels.com/" class="cta"
              >Explore REHMA Hostel</a
            >
          </div>

          <div class="footer">
            <p>
              © REHMA Hostel<br />
              <a href="https://www.rehmahostels.com/">rehmahostels.com</a>
            </p>
          </div>
        </div>
      </body>
    </html>
    `;

    // Send emails
    try {
      await sendMail(
        process.env.ADMIN_EMAIL!,
        "Newsletter Subscription",
        adminHtml
      );
    } catch (emailError) {
      console.error("Error sending admin email:", emailError);
      return NextResponse.json(
        { success: false, message: "Error sending admin email" },
        { status: 500 }
      );
    }

    try {
      await sendMail(sub.email, "Thank You for Subscribing", userHtml);
    } catch (emailError) {
      console.error("Error sending user email:", emailError);
      return NextResponse.json(
        { success: false, message: "Error sending user email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Subscribed successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Subscription failed" },
      { status: 500 }
    );
  }
}
