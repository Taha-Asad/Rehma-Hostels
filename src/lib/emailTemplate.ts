// lib/email-template.ts

import { ContentBlock } from "@/components/admin/email/BlockEditor";
import { EmailContent } from "@/components/admin/email/ReplyModal";

/**
 * Parse text with **bold** and *italic* markers
 */
const parseTextFormatting = (text: string): string => {
  let parsed = text;
  // Bold: **text**
  parsed = parsed.replace(
    /\*\*(.+?)\*\*/g,
    '<span style="color: #7b2e2e; font-weight: 600;">$1</span>'
  );
  // Italic: *text*
  parsed = parsed.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Line breaks
  parsed = parsed.replace(/\n/g, "<br />");
  return parsed;
};

/**
 * Convert content blocks to HTML
 */
const blocksToHtml = (blocks: ContentBlock[]): string => {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "heading":
          const headingSizes: Record<1 | 2 | 3, string> = {
            1: "24px",
            2: "22px",
            3: "20px",
          };
          const headingMargins: Record<1 | 2 | 3, string> = {
            1: "0",
            2: "16px",
            3: "12px",
          };
          return `
            <h${block.level} style="
              margin-top: ${headingMargins[block.level]};
              margin-bottom: 12px;
              font-size: ${headingSizes[block.level]};
              color: #7b2e2e;
              font-weight: 600;
            ">${parseTextFormatting(block.text)}</h${block.level}>
          `;

        case "paragraph":
          return `
            <p style="
              line-height: 1.7;
              color: #3d444b;
              margin-top: 0;
              margin-bottom: 18px;
            ">${parseTextFormatting(block.text)}</p>
          `;

        case "list":
          const listTag = block.ordered ? "ol" : "ul";
          const listItems = block.items
            .map(
              (item) => `
              <li style="margin-bottom: 8px;">${parseTextFormatting(item)}</li>
            `
            )
            .join("");
          return `
            <${listTag} style="
              line-height: 1.7;
              color: #3d444b;
              margin-top: 0;
              margin-bottom: 18px;
              padding-left: 24px;
            ">
              ${listItems}
            </${listTag}>
          `;

        case "blockquote":
          return `
            <blockquote style="
              border-left: 4px solid #7b2e2e;
              padding-left: 16px;
              margin-left: 0;
              margin-right: 0;
              margin-top: 0;
              margin-bottom: 18px;
              font-style: italic;
              color: #5f2424;
              background-color: #fff5f5;
              padding: 12px 16px;
              border-radius: 0 8px 8px 0;
            ">${parseTextFormatting(block.text)}</blockquote>
          `;

        case "code":
          if (block.inline) {
            return `
              <code style="
                background-color: #f4f4f4;
                padding: 2px 6px;
                border-radius: 4px;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                color: #7b2e2e;
              ">${block.text}</code>
            `;
          }
          return `
            <pre style="
              background-color: #2d2d2d;
              color: #f8f8f2;
              padding: 16px;
              border-radius: 8px;
              overflow: auto;
              font-family: 'Courier New', monospace;
              font-size: 14px;
              margin-top: 0;
              margin-bottom: 18px;
              white-space: pre-wrap;
              word-break: break-word;
            "><code>${block.text}</code></pre>
          `;

        case "image":
          return `
            <div style="text-align: center; margin-bottom: 18px;">
              <img 
                src="${block.src}" 
                alt="${block.alt || "Email image"}" 
                style="
                  max-width: 100%;
                  height: auto;
                  border-radius: 8px;
                  border: 1px solid #e8e5e3;
                "
              />
              ${
                block.alt
                  ? `<p style="font-size: 12px; color: #666; margin-top: 8px;">${block.alt}</p>`
                  : ""
              }
            </div>
          `;

        case "link":
          return `
            <p style="margin-top: 0; margin-bottom: 18px;">
              <a 
                href="${block.href}" 
                target="_blank" 
                rel="noopener noreferrer"
                style="
                  color: #7b2e2e;
                  text-decoration: underline;
                  font-weight: 500;
                "
              >${block.text || block.href}</a>
            </p>
          `;

        case "button":
          return `
            <div style="margin-top: 12px; margin-bottom: 18px;">
              <a 
                href="${block.href}" 
                target="_blank" 
                rel="noopener noreferrer"
                style="
                  display: inline-block;
                  padding: 12px 22px;
                  background: linear-gradient(90deg, #7b2e2e, #d4a373);
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 6px;
                  font-weight: 600;
                  font-size: 15px;
                "
              >${block.text}</a>
            </div>
          `;

        default:
          return "";
      }
    })
    .join("\n");
};

/**
 * Generate complete HTML email template
 */
export const generateEmailHtml = (
  content: EmailContent,
  blocks: ContentBlock[]
): string => {
  const blocksHtml = blocksToHtml(blocks);

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>${content.subject}</title>
        <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
        <![endif]-->
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        </style>
      </head>
      <body style="
        margin: 0;
        padding: 0;
        background-color: #faf6f5;
        color: #3d444b;
        font-family: 'Poppins', Arial, Helvetica, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      ">
        <!-- Preheader text (hidden) -->
        <div style="
          display: none;
          max-height: 0;
          overflow: hidden;
          mso-hide: all;
        ">
          ${content.headerSubtitle}
        </div>

        <!-- Email wrapper -->
        <table 
          role="presentation" 
          cellspacing="0" 
          cellpadding="0" 
          border="0" 
          width="100%" 
          style="background-color: #faf6f5;"
        >
          <tr>
            <td style="padding: 40px 20px;">
              <!-- Email container -->
              <table 
                role="presentation" 
                cellspacing="0" 
                cellpadding="0" 
                border="0" 
                width="600" 
                style="
                  max-width: 600px;
                  margin: 0 auto;
                  background: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                  border: 1px solid #e8e5e3;
                  box-shadow: 0 8px 28px rgba(123, 46, 46, 0.2);
                "
              >
                <!-- Header -->
                <tr>
                  <td style="
                    background: linear-gradient(90deg, #7b2e2e, #5f2424);
                    color: #ffffff;
                    text-align: center;
                    padding: 28px 24px;
                  ">
                    <h1 style="
                      margin: 0;
                      font-size: 24px;
                      font-weight: 700;
                      letter-spacing: 0.5px;
                      color: #ffffff;
                    ">${content.headerTitle}</h1>
                    <p style="
                      margin: 6px 0 0;
                      font-size: 14px;
                      color: rgba(255, 255, 255, 0.9);
                    ">${content.headerSubtitle}</p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="
                    padding: 32px;
                    background-color: #fffaf9;
                  ">
                    <!-- Content Title -->
                    <h2 style="
                      margin-top: 0;
                      margin-bottom: 16px;
                      font-size: 20px;
                      color: #7b2e2e;
                      font-weight: 600;
                    ">${content.contentTitle}</h2>

                    <!-- Greeting -->
                    <p style="
                      line-height: 1.7;
                      color: #3d444b;
                      margin-top: 0;
                      margin-bottom: 18px;
                    ">
                      Hi <span style="color: #7b2e2e; font-weight: 600;">${
                        content.recipientName
                      }</span>,
                    </p>

                    <!-- Dynamic Content Blocks -->
                    ${blocksHtml}

                    <!-- CTA Button -->
                    ${
                      content.ctaText
                        ? `
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top: 24px;">
                        <tr>
                          <td style="border-radius: 6px; background: linear-gradient(90deg, #7b2e2e, #d4a373);">
                            <a 
                              href="${content.ctaLink}" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style="
                                display: inline-block;
                                padding: 14px 28px;
                                color: #ffffff;
                                text-decoration: none;
                                font-weight: 600;
                                font-size: 15px;
                                font-family: 'Poppins', Arial, sans-serif;
                              "
                            >${content.ctaText}</a>
                          </td>
                        </tr>
                      </table>
                    `
                        : ""
                    }
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="
                    background-color: #7b2e2e;
                    text-align: center;
                    padding: 24px 18px;
                  ">
                    <p style="
                      margin: 0 0 8px;
                      font-size: 13px;
                      color: #f8f5f3;
                    ">${content.footerText}</p>
                    <a 
                      href="https://${content.footerLink}" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style="
                        color: #d4a373;
                        text-decoration: none;
                        font-size: 13px;
                      "
                    >${content.footerLink}</a>
                    
                    <!-- Unsubscribe link -->
                    <p style="
                      margin: 16px 0 0;
                      font-size: 11px;
                      color: rgba(248, 245, 243, 0.6);
                    ">
                      <a 
                        href="https://${content.footerLink}/unsubscribe" 
                        style="color: rgba(248, 245, 243, 0.6); text-decoration: underline;"
                      >Unsubscribe</a>
                      from these emails
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};

/**
 * Generate plain text version of the email
 */
export const generateEmailText = (
  content: EmailContent,
  blocks: ContentBlock[]
): string => {
  const blocksText = blocks
    .map((block) => {
      switch (block.type) {
        case "heading":
          return `\n${"=".repeat(block.text.length)}\n${
            block.text
          }\n${"=".repeat(block.text.length)}\n`;
        case "paragraph":
          return block.text.replace(/\*\*/g, "").replace(/\*/g, "") + "\n";
        case "list":
          return (
            block.items
              .map((item, idx) =>
                block.ordered ? `${idx + 1}. ${item}` : `• ${item}`
              )
              .join("\n") + "\n"
          );
        case "blockquote":
          return `> ${block.text}\n`;
        case "code":
          return `\`${block.text}\`\n`;
        case "link":
          return `${block.text}: ${block.href}\n`;
        case "button":
          return `[${block.text}]: ${block.href}\n`;
        case "image":
          return `[Image: ${block.alt || block.src}]\n`;
        default:
          return "";
      }
    })
    .join("\n");

  return `
${content.headerTitle}
${content.headerSubtitle}

${content.contentTitle}

Hi ${content.recipientName},

${blocksText}

${content.ctaText ? `${content.ctaText}: ${content.ctaLink}` : ""}

---
${content.footerText}
${content.footerLink}
  `.trim();
};
