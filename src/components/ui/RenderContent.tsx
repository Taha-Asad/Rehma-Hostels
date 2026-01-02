/* eslint-disable @typescript-eslint/no-explicit-any */

import { ContentBlock } from "@/actions/blogs.action";
import { Box, Typography } from "@mui/material";

// Type guards
const hasText = (
  block: ContentBlock
): block is ContentBlock & { text: string } => {
  return "text" in block;
};

const hasLevel = (
  block: ContentBlock
): block is ContentBlock & { level: 1 | 2 | 3 } => {
  return "level" in block;
};

const hasSrc = (
  block: ContentBlock
): block is ContentBlock & { src: string; alt?: string } => {
  return "src" in block;
};

const hasHref = (
  block: ContentBlock
): block is ContentBlock & { href: string; text: string } => {
  return "href" in block;
};

const hasItems = (
  block: ContentBlock
): block is ContentBlock & { items: string[] } => {
  return "items" in block;
};

const hasInline = (
  block: ContentBlock
): block is ContentBlock & { inline: boolean } => {
  return "inline" in block;
};
export const RenderContent = ({ content }: { content: ContentBlock[] }) => {
  if (!content || content.length === 0) return null;

  return (
    <>
      {content.map((block, i) => {
        switch (block.type) {
          case "heading":
            return hasLevel(block) && hasText(block) ? (
              <Typography
                key={i}
                variant={
                  block.level === 1 ? "h2" : block.level === 2 ? "h3" : "h4"
                }
                sx={{
                  color: "#7B2E2E",
                  mt: 3,
                  mb: 1.5,
                  fontWeight: 600,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {block.text}
              </Typography>
            ) : null;

          case "paragraph":
            return hasText(block) ? (
              <Typography
                key={i}
                variant="body1"
                sx={{ color: "#505A63", lineHeight: 1.8, mb: 2 }}
              >
                {block.text}
              </Typography>
            ) : null;

          case "list":
            return hasItems(block) ? (
              <Box
                key={i}
                component={(block as any).ordered ? "ol" : "ul"}
                sx={{
                  pl: 3,
                  mb: 2,
                  color: "#505A63",
                  "& li": {
                    mb: 0.75,
                    lineHeight: 1.6,
                  },
                }}
              >
                {block.items.map((item, j) => (
                  <Box component="li" key={j}>
                    {item}
                  </Box>
                ))}
              </Box>
            ) : null;

          case "blockquote":
            return hasText(block) ? (
              <Box
                key={i}
                sx={{
                  borderLeft: "4px solid #7B2E2E",
                  pl: 2,
                  ml: 0,
                  my: 2,
                  py: 1,
                  bgcolor: "rgba(123,46,46,0.03)",
                }}
              >
                <Typography
                  sx={{
                    fontStyle: "italic",
                    color: "#505A63",
                    lineHeight: 1.7,
                  }}
                >
                  {block.text}
                </Typography>
              </Box>
            ) : null;

          case "code":
            return hasText(block) && hasInline(block) ? (
              block.inline ? (
                <Box
                  key={i}
                  component="code"
                  sx={{
                    bgcolor: "#F1E9E9",
                    px: 0.75,
                    py: 0.25,
                    borderRadius: 0.5,
                    fontFamily: "monospace",
                    fontSize: "0.9em",
                    color: "#7B2E2E",
                  }}
                >
                  {block.text}
                </Box>
              ) : (
                <Box
                  key={i}
                  component="pre"
                  sx={{
                    bgcolor: "#F1E9E9",
                    p: 2,
                    borderRadius: 1,
                    overflow: "auto",
                    mb: 2,
                    border: "1px solid rgba(123,46,46,0.1)",
                    fontFamily: "monospace",
                    fontSize: "0.9em",
                  }}
                >
                  <code style={{ color: "#3D444B" }}>{block.text}</code>
                </Box>
              )
            ) : null;

          case "image":
            return hasSrc(block) && block.src ? (
              <Box
                key={i}
                sx={{
                  my: 3,
                  textAlign: "center",
                  "& img": {
                    borderRadius: 1,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={block.src}
                  alt={block.alt || ""}
                  sx={{
                    maxWidth: "100%",
                    height: "auto",
                    display: "inline-block",
                  }}
                />
                {block.alt && (
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      color: "#909090",
                      mt: 1,
                      fontStyle: "italic",
                    }}
                  >
                    {block.alt}
                  </Typography>
                )}
              </Box>
            ) : null;

          case "link":
            return hasHref(block) && hasText(block) ? (
              <Box
                key={i}
                component="a"
                href={block.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "#7B2E2E",
                  textDecoration: "none",
                  fontWeight: 500,
                  "&:hover": {
                    textDecoration: "underline",
                    color: "#D4A373",
                  },
                }}
              >
                {block.text}
              </Box>
            ) : null;

          default:
            return null;
        }
      })}
    </>
  );
};
