import { Box, Typography } from "@mui/material";
import { ContentBlock } from "./BlockEditor";
import { EmailContent } from "./ReplyModal";

// ============ EMAIL PREVIEW COMPONENT (MUI VERSION) ============
interface EmailPreviewProps {
  content: EmailContent;
  blocks: ContentBlock[];
}

export const EmailPreview: React.FC<EmailPreviewProps> = ({
  content,
  blocks,
}) => {
  // Parse **bold** and *italic* text
  const parseText = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Check for bold (**text**)
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // Check for italic (*text*)
      const italicMatch = remaining.match(
        /(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/
      );

      if (boldMatch && boldMatch.index !== undefined) {
        if (boldMatch.index > 0) {
          parts.push(remaining.substring(0, boldMatch.index));
        }
        parts.push(
          <Box
            key={key++}
            component="span"
            sx={{ color: "#7b2e2e", fontWeight: 600 }}
          >
            {boldMatch[1]}
          </Box>
        );
        remaining = remaining.substring(boldMatch.index + boldMatch[0].length);
      } else if (italicMatch && italicMatch.index !== undefined) {
        if (italicMatch.index > 0) {
          parts.push(remaining.substring(0, italicMatch.index));
        }
        parts.push(
          <Box key={key++} component="em">
            {italicMatch[1]}
          </Box>
        );
        remaining = remaining.substring(
          italicMatch.index + italicMatch[0].length
        );
      } else {
        parts.push(remaining);
        break;
      }
    }

    return parts;
  };

  // Render individual content blocks
  const renderBlock = (block: ContentBlock): React.ReactNode => {
    switch (block.type) {
      case "heading":
        const headingSizes = { 1: "24px", 2: "22px", 3: "20px" };
        return (
          <Box
            key={block.id}
            component={`h${block.level}` as "h1" | "h2" | "h3"}
            sx={{
              marginTop: block.level === 1 ? 0 : "16px",
              marginBottom: "12px",
              fontSize: headingSizes[block.level],
              color: "#7b2e2e",
              fontWeight: 600,
            }}
          >
            {block.text}
          </Box>
        );

      case "paragraph":
        return (
          <Box
            key={block.id}
            component="p"
            sx={{
              lineHeight: 1.7,
              color: "#3d444b",
              marginTop: 0,
              marginBottom: "18px",
            }}
          >
            {parseText(block.text)}
          </Box>
        );

      case "list":
        return (
          <Box
            key={block.id}
            component={block.ordered ? "ol" : "ul"}
            sx={{
              lineHeight: 1.7,
              color: "#3d444b",
              marginTop: 0,
              marginBottom: "18px",
              paddingLeft: "24px",
              "& li": {
                marginBottom: "8px",
              },
            }}
          >
            {block.items.map((item, idx) => (
              <Box component="li" key={idx}>
                {parseText(item)}
              </Box>
            ))}
          </Box>
        );

      case "blockquote":
        return (
          <Box
            key={block.id}
            component="blockquote"
            sx={{
              borderLeft: "4px solid #7b2e2e",
              paddingLeft: "16px",
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              marginBottom: "18px",
              fontStyle: "italic",
              color: "#5f2424",
              backgroundColor: "#fff5f5",
              padding: "12px 16px",
              borderRadius: "0 8px 8px 0",
            }}
          >
            {parseText(block.text)}
          </Box>
        );

      case "code":
        return block.inline ? (
          <Box
            key={block.id}
            component="code"
            sx={{
              backgroundColor: "#f4f4f4",
              padding: "2px 6px",
              borderRadius: "4px",
              fontFamily: "monospace",
              fontSize: "14px",
              color: "#7b2e2e",
            }}
          >
            {block.text}
          </Box>
        ) : (
          <Box
            key={block.id}
            component="pre"
            sx={{
              backgroundColor: "#2d2d2d",
              color: "#f8f8f2",
              padding: "16px",
              borderRadius: "8px",
              overflow: "auto",
              fontFamily: "monospace",
              fontSize: "14px",
              marginTop: 0,
              marginBottom: "18px",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            <code>{block.text}</code>
          </Box>
        );

      case "image":
        return (
          <Box
            key={block.id}
            sx={{
              textAlign: "center",
              marginBottom: "18px",
            }}
          >
            <Box
              component="img"
              src={
                block.src ||
                "https://via.placeholder.com/400x200?text=Image+Preview"
              }
              alt={block.alt || "Email image"}
              sx={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                border: "1px solid #e8e5e3",
              }}
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/400x200?text=Image+Not+Found";
              }}
            />
            {block.alt && (
              <Typography
                variant="caption"
                sx={{ display: "block", color: "#666", mt: 1 }}
              >
                {block.alt}
              </Typography>
            )}
          </Box>
        );

      case "link":
        return (
          <Box
            key={block.id}
            component="p"
            sx={{ marginTop: 0, marginBottom: "18px" }}
          >
            <Box
              component="a"
              href={block.href}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "#7b2e2e",
                textDecoration: "underline",
                fontWeight: 500,
                "&:hover": {
                  color: "#5f2424",
                },
              }}
            >
              {block.text || block.href}
            </Box>
          </Box>
        );

      case "button":
        return (
          <Box
            key={block.id}
            sx={{
              marginTop: "12px",
              marginBottom: "18px",
            }}
          >
            <Box
              component="a"
              href={block.href}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "inline-block",
                padding: "12px 22px",
                background: "linear-gradient(90deg, #7b2e2e, #d4a373)",
                color: "#ffffff",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "15px",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(123, 46, 46, 0.3)",
                },
              }}
            >
              {block.text}
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  // Generate blocks HTML
  const blocksContent = blocks.map((block) => renderBlock(block));

  return (
    <Box
      sx={{
        margin: 0,
        padding: 0,
        color: "#3d444b",
        fontFamily: "'Poppins', Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Email Container */}
      <Box
        sx={{
          maxWidth: "600px",
          margin: "40px auto",
          background: "#ffffff",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #e8e5e3",
          boxShadow: "0 8px 28px rgba(123, 46, 46, 0.2)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: "linear-gradient(90deg, #7b2e2e, #5f2424)",
            color: "#ffffff",
            textAlign: "center",
            padding: "28px 24px",
          }}
        >
          <Typography
            component="h2"
            sx={{
              margin: 0,
              fontSize: "24px",
              fontWeight: 700,
              letterSpacing: "0.5px",
            }}
          >
            {content.headerTitle}
          </Typography>
          <Typography
            component="p"
            sx={{
              margin: "6px 0 0",
              fontSize: "14px",
              opacity: 0.9,
            }}
          >
            {content.headerSubtitle}
          </Typography>
        </Box>

        {/* Content */}
        <Box
          sx={{
            padding: "32px",
            backgroundColor: "#fffaf9",
          }}
        >
          {/* Content Title */}
          <Typography
            component="h3"
            sx={{
              marginTop: 0,
              marginBottom: "16px",
              fontSize: "20px",
              color: "#7b2e2e",
              fontWeight: 600,
            }}
          >
            {content.contentTitle}
          </Typography>

          {/* Greeting */}
          <Box
            component="p"
            sx={{
              lineHeight: 1.7,
              color: "#3d444b",
              marginTop: 0,
              marginBottom: "18px",
            }}
          >
            Hi{" "}
            <Box
              component="span"
              sx={{
                color: "#7b2e2e",
                fontWeight: 600,
              }}
            >
              {content.recipientName}
            </Box>
            ,
          </Box>

          {/* Dynamic Content Blocks */}
          {blocksContent}

          {/* CTA Button */}
          {content.ctaText && (
            <Box
              component="a"
              href={content.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "inline-block",
                marginTop: "12px",
                padding: "12px 22px",
                background: "linear-gradient(90deg, #7b2e2e, #d4a373)",
                color: "#ffffff",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "15px",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(123, 46, 46, 0.3)",
                },
              }}
            >
              {content.ctaText}
            </Box>
          )}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            backgroundColor: "#7b2e2e",
            textAlign: "center",
            padding: "18px",
            fontSize: "13px",
            color: "#f8f5f3",
          }}
        >
          <Typography
            component="p"
            sx={{
              margin: 0,
              fontSize: "13px",
            }}
          >
            {content.footerText}
            <br />
            <Box
              component="a"
              href={`https://${content.footerLink}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "#d4a373",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {content.footerLink}
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
