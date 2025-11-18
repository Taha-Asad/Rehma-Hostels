"use server";
import { sendMail } from "@/lib/mailer";
import prisma from "@/lib/prisma";

export async function contactForm(
  name: string,
  email: string,
  phone: string,
  roomType: string,
  message: string
) {
  try {
    // Validation for missing fields
    if (!name || !email || !phone) {
      console.error("Missing required fields:", { name, email, phone });
      return {
        success: false,
        message: "Please fill in all the required fields before submitting.",
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Invalid email format:", email);
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    // Phone number validation for Pakistan
    const pakistanPhoneRegex = /^\+923\d{2}\d{7}$/;
    if (!pakistanPhoneRegex.test(phone)) {
      console.error("Invalid phone number format:", phone);
      return {
        success: false,
        message:
          "Please enter a valid Pakistan phone number in +92 format (e.g., +923001234567).",
      };
    }

    // Save contact form data to the database
    let contact;
    try {
      contact = await prisma.contact.create({
        data: {
          name,
          email,
          phone,
          roomType,
          message,
        },
      });
      console.log("Contact form saved:", contact);
    } catch (dbError) {
      console.error("Database error while saving contact form:", dbError);
      return {
        success: false,
        message: "Error in saving contact form to database.",
      };
    }

    // Admin email HTML
    const adminHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Booking Inquiry - REHMA Hostel</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #f8f5f3;
            font-family: "Poppins", sans-serif;
            color: #3d444b;
          }

          .container {
            max-width: 640px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 8px 30px rgba(123, 46, 46, 0.15);
            overflow: hidden;
          }

          .header {
            background: linear-gradient(135deg, #7b2e2e, #5f2424);
            color: #ffffff;
            text-align: center;
            padding: 40px 24px;
            position: relative;
          }

          .header h1 {
            margin: 0;
            font-size: 28px;
            letter-spacing: 1px;
            font-weight: 700;
          }

          .header p {
            margin: 10px 0 0;
            font-size: 16px;
            opacity: 0.9;
          }

          .content {
            padding: 32px 28px;
            background: linear-gradient(180deg, #ffffff, #f8f5f3 80%);
          }

          .field {
            margin-bottom: 20px;
          }

          .label {
            font-weight: 600;
            color: #7b2e2e;
            font-size: 15px;
            margin-bottom: 6px;
          }

          .value {
            background: #f1e9e9;
            padding: 12px 14px;
            border-radius: 6px;
            color: #3d444b;
          }

          .message {
            background: #faf6f5;
            padding: 16px;
            border-left: 4px solid #7b2e2e;
            border-radius: 8px;
            margin-top: 6px;
            color: #3d444b;
          }

          .cta {
            margin-top: 32px;
            background: #7b2e2e;
            color: white;
            text-align: center;
            padding: 28px 20px;
            border-radius: 8px;
          }

          .footer {
            background-color: #f1e9e9;
            color: #5f2424;
            text-align: center;
            padding: 16px;
            font-size: 14px;
            border-top: 1px solid #e0d8d5;
          }

          .footer a {
            color: #7b2e2e;
            text-decoration: none;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Booking Inquiry</h1>
            <p>Submitted via REHMA Hostel Website</p>
          </div>

          <div class="content">
            <p class="intro">
              A new booking request has been received. Here are the details
              submitted by the guest:
            </p>

            <div class="field">
              <div class="label">Full Name:</div>
              <div class="value">${contact.name}</div>
            </div>

            <div class="field">
              <div class="label">Email Address:</div>
              <div class="value">${contact.email}</div>
            </div>

            <div class="field">
              <div class="label">Phone Number:</div>
              <div class="value">${contact.phone}</div>
            </div>

            <div class="field">
              <div class="label">Preferred Room Type:</div>
              <div class="value">${contact.roomType}</div>
            </div>

            <div class="field">
              <div class="label">Message:</div>
              <div class="message">${contact.message}</div>
            </div>

            <div class="cta">
              <h3>Thank you for reaching out!</h3>
              <p>
                Our team will respond within 24 hours to help finalize the booking.
              </p>
            </div>
          </div>

          <div class="footer">
            <p>
              © REHMA Hostel | 
              <a href="https://www.rehmahostels.com/">Visit Website</a>
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
        <title>Thank You for Contacting REHMA Hostel</title>
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
            margin-top: 10px;
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
            <h2>Thank You, ${contact.name}!</h2>
            <p style="margin: 6px 0 0; font-size: 14px;">
              Your message has been received
            </p>
          </div>

          <div class="content">
            <h3>We appreciate you contacting REHMA Hostel</h3>
            <p>
              Hello <span class="highlight">${contact.name}</span>,<br />
              Thank you for reaching out to
              <span class="highlight">REHMA Hostel</span>. We’ve received your message and
              will get back to you as soon as possible.
            </p>

            <p>
              For urgent inquiries, you can email us directly at
              <a href="mailto:info@RehmaHostels.com" style="color: #7b2e2e"
                >info@RehmaHostels.com</a
              >.
            </p>

            <p>Meanwhile, you can explore our rooms and facilities on our website:</p>

            <a
              href="https://www.rehmahostels.com/"
              class="cta"
              >Visit REHMA Hostel</a
            >
          </div>

          <div class="footer">
            <p>
              © REHMA Hostel | Crafted with care and caffeine.<br />
              <a href="https://www.rehmahostels.com/</a>
            </p>
          </div>
        </div>
      </body>
    </html>
    `;

    // Send emails with error handling
    try {
      await sendMail(
        process.env.ADMIN_EMAIL!,
        "New Booking Inquiry",
        adminHtml
      );
    } catch (emailError) {
      console.error("Error sending admin email:", emailError);
      return { success: false, message: "Error sending admin email." };
    }

    try {
      await sendMail(
        contact.email,
        "Thank You for Contacting REHMA Hostel",
        userHtml
      );
    } catch (emailError) {
      console.error("Error sending user email:", emailError);
      return { success: false, message: "Error sending user email." };
    }

    return { success: true, message: "Contact Form Submitted Successfully" };
  } catch (err) {
    console.error("Error in contact form function:", err);
    return { success: false, message: "Error In Submitting Contact Form" };
  }
}

export async function subscriptionField(email: string) {
  try {
    if (!email) {
      console.error("Missing email:", email);
      return {
        success: false,
        message: "Please fill in all the required fields before submitting.",
      };
    }

    const existence = await prisma.subscription.findUnique({
      where: { email },
    });

    if (existence) {
      console.error("Email already subscribed:", email);
      return {
        success: false,
        message: "You have already subscribed to our email",
      };
    }

    const name = email.split("@")[0]; // Extract name from email
    const newsSub = await prisma.subscription.create({
      data: { name, email },
    });

    console.log("Subscription saved:", newsSub);

    const formattedDate = new Date(newsSub.createdAt).toLocaleString("en-PK", {
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
              <p><strong>Name:</strong> ${newsSub.name}</p>
              <p><strong>Email:</strong> ${newsSub.email}</p>
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
              Hi <span class="highlight"> ${newsSub.name}</span>,<br />
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

    // Send emails with error handling
    try {
      await sendMail(
        process.env.ADMIN_EMAIL!,
        "Newsletter Subscription",
        adminHtml
      );
    } catch (emailError) {
      console.error("Error sending admin email:", emailError);
      return { success: false, message: "Error sending admin email." };
    }

    try {
      await sendMail(
        newsSub.email,
        "Thank You for Subscribing to our Newsletter",
        userHtml
      );
    } catch (emailError) {
      console.error("Error sending user email:", emailError);
      return { success: false, message: "Error sending user email." };
    }

    return {
      success: true,
      message: "Newsletter subscription Submitted Successfully",
    };
  } catch (err) {
    console.error("Error in subscription function:", err);
    return {
      success: false,
      message: "Error in subscribing to the newsletter.",
    };
  }
}
