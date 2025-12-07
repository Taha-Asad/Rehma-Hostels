"use client";

import {
  Close,
  Add,
  FormatListBulleted,
  Code,
  Image as ImageIcon,
  Link as LinkIcon,
  FormatQuote,
  Title,
  TextFields,
  Send,
} from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  TextField,
  Button,
  MenuItem,
  Paper,
  Typography,
  Divider,
  Stack,
  Menu,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState, useTransition } from "react";
import { BlockEditor, ContentBlock } from "./BlockEditor";
import { defaultBlocks } from "./DefaultBlocks";
import { EmailPreview } from "./EmailPreview";
import { SendMailById } from "@/actions/emails.action";
import toast from "react-hot-toast";

// ============ TYPES ============
interface SendEmailProp {
  open: boolean;
  onClose: () => void;
  email: {
    email: string;
    name: string;
  } | null;
  onConfirm: (data: FormData) => void;
}

export interface EmailContent {
  subject: string;
  headerTitle: string;
  headerSubtitle: string;
  contentTitle: string;
  recipientName: string;
  recipientEmail: string;
  ctaText: string;
  ctaLink: string;
  footerText: string;
  footerLink: string;
}

// ============ CONSTANTS ============
const generateId = () => Math.random().toString(36).substring(2, 9);

const defaultContent = (recipient?: {
  name: string;
  email: string;
}): EmailContent => ({
  subject: "Welcome to REHMA Hostel!",
  headerTitle: "Welcome to REHMA Hostel!",
  headerSubtitle: "You're officially subscribed to our newsletter",
  contentTitle: "Thank You for Joining Us!",
  recipientName: recipient?.name || "",
  recipientEmail: recipient?.email || "",
  ctaText: "Explore REHMA Hostel",
  ctaLink: "https://www.rehmahostels.com/",
  footerText: "© REHMA Hostel",
  footerLink: "www.rehmahostels.com",
});

export interface EmailResult {
  success: boolean;
  message: string;
  messageId?: string;
  error?: string;
}
const ReplyModal: React.FC<SendEmailProp> = ({
  open,
  email,
  onClose,
  onConfirm,
}) => {
  const [blocks, setBlocks] = useState<ContentBlock[]>(defaultBlocks);
  const [content, setContent] = useState<EmailContent>(
    defaultContent(email || undefined)
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isPending, startTransition] = useTransition();
  const [, setResult] = useState<EmailResult | null>(null);
  const handleAddBlock = (type: ContentBlock["type"]) => {
    const id = generateId();
    const newBlock = ((): ContentBlock => {
      switch (type) {
        case "heading":
          return { id, type: "heading", level: 2, text: "" };
        case "paragraph":
          return { id, type: "paragraph", text: "" };
        case "list":
          return { id, type: "list", ordered: false, items: [""] };
        case "blockquote":
          return { id, type: "blockquote", text: "" };
        case "code":
          return { id, type: "code", inline: false, text: "" };
        case "image":
          return { id, type: "image", src: "", alt: "" };
        case "link":
          return { id, type: "link", href: "", text: "" };
        case "button":
          return { id, type: "button", href: "", text: "" };
        default:
          return { id, type: "paragraph", text: "" };
      }
    })();
    setBlocks((prev) => [...prev, newBlock]);
    setAnchorEl(null);
  };

  const handleUpdateBlock = (index: number, updatedBlock: ContentBlock) => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      newBlocks[index] = updatedBlock;
      return newBlocks;
    });
  };

  const handleDeleteBlock = (index: number) => {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveBlock = (index: number, direction: "up" | "down") => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      [newBlocks[index], newBlocks[targetIndex]] = [
        newBlocks[targetIndex],
        newBlocks[index],
      ];
      return newBlocks;
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("content", JSON.stringify(content));
    formData.append("blocks", JSON.stringify(blocks));

    startTransition(async () => {
      try {
        const response = await SendMailById(formData);
        setResult(response);

        if (response.success) {
          // Call the onConfirm callback
          onConfirm(formData);
          toast.success("Mail Send Successfully");
          // Optionally close the modal after success
          // setTimeout(() => onClose(), 2000);
        }
      } catch (error) {
        setResult({
          success: false,
          message: "An unexpected error occurred",
          error: error instanceof Error ? error.message : "Unknown error",
        });
        toast.error(`Error Sending Mail : ${error}`);
      }
    });
  };
  useEffect(() => {
    setContent(defaultContent(email || undefined));
  }, [email]);

  const updateContent = (field: keyof EmailContent, value: string) => {
    setContent((prev) => ({ ...prev, [field]: value }));
  };

  const blockMenuItems = [
    { type: "heading", label: "Heading", icon: <Title /> },
    { type: "paragraph", label: "Paragraph", icon: <TextFields /> },
    { type: "list", label: "List", icon: <FormatListBulleted /> },
    { type: "blockquote", label: "Quote", icon: <FormatQuote /> },
    { type: "code", label: "Code", icon: <Code /> },
    { type: "image", label: "Image", icon: <ImageIcon /> },
    { type: "link", label: "Link", icon: <LinkIcon /> },
    { type: "button", label: "Button", icon: <Send /> },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      disableScrollLock
      disableEnforceFocus
      maxWidth="xl"
      slotProps={{
        paper: {
          sx: {
            height: "90vh",
            maxHeight: "90vh",
            background: "background.paper",
          },
        },
      }}
    >
      {/* Dialog Title */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: "divider",
          py: 1.5,
        }}
      >
        Compose Email
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            variant="contained"
            startIcon={
              isPending ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <Send />
              )
            }
            onClick={handleSubmit}
            disabled={isPending}
            sx={{
              background: "linear-gradient(90deg, #7b2e2e, #5f2424)",
              "&:hover": {
                background: "linear-gradient(90deg, #5f2424, #4a1c1c)",
              },
              "&:disabled": {
                background: "rgba(123, 46, 46, 0.5)",
              },
            }}
          >
            {isPending ? "Sending..." : "Send Email"}{" "}
          </Button>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>

      {/* Dialog Content */}
      <DialogContent
        sx={{ p: 0, display: "flex", height: "100%", overflow: "hidden" }}
      >
        {/* Editor Panel */}
        <Box
          sx={{
            width: "45%",
            p: 3,
            overflowY: "auto",
            borderRight: "1px solid",
            borderColor: "divider",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(123,46,46,0.5)",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "rgba(123,46,46,0.8)",
            },
            // top fade
            "&::before": {
              content: '""',
              position: "sticky",
              top: 0,
              left: 0,
              right: 0,
              height: 12,
              background:
                "linear-gradient(to bottom, rgba(246,244,244,1), rgba(246,244,244,0))",
              zIndex: 1,
            },
            // bottom fade
            "&::after": {
              content: '""',
              position: "sticky",
              bottom: 0,
              left: 0,
              right: 0,
              height: 12,
              background:
                "linear-gradient(to top, rgba(246,244,244,1), rgba(246,244,244,0))",
              zIndex: 1,
            },
          }}
        >
          {/* Email Settings */}
          <Typography
            variant="subtitle1"
            fontWeight={600}
            mb={2}
            color="secondary.main"
          >
            Email Settings
          </Typography>
          <Stack spacing={2} mb={3}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                size="small"
                label="Recipient Name"
                value={content.recipientName}
                onChange={(e) => updateContent("recipientName", e.target.value)}
              />
              <TextField
                fullWidth
                size="small"
                label="Recipient Email"
                value={content.recipientEmail}
                onChange={(e) =>
                  updateContent("recipientEmail", e.target.value)
                }
              />
            </Stack>
            <TextField
              fullWidth
              size="small"
              label="Subject"
              value={content.subject}
              onChange={(e) => updateContent("subject", e.target.value)}
            />
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Header Settings */}
          <Typography
            variant="subtitle1"
            fontWeight={600}
            mb={2}
            color="secondary.main"
          >
            Header
          </Typography>
          <Stack spacing={2} mb={3}>
            <TextField
              fullWidth
              size="small"
              label="Header Title"
              value={content.headerTitle}
              onChange={(e) => updateContent("headerTitle", e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              label="Header Subtitle"
              value={content.headerSubtitle}
              onChange={(e) => updateContent("headerSubtitle", e.target.value)}
            />
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Content Title */}
          <Typography
            variant="subtitle1"
            fontWeight={600}
            mb={2}
            color="secondary.main"
          >
            Content
          </Typography>
          <TextField
            fullWidth
            size="small"
            label="Content Title"
            value={content.contentTitle}
            onChange={(e) => updateContent("contentTitle", e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Content Blocks */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="body2" color="text.secondary">
              Content Blocks ({blocks.length})
            </Typography>
            <Button
              startIcon={<Add />}
              onClick={(e) => setAnchorEl(e.currentTarget)}
              variant="outlined"
              size="small"
              sx={{
                borderColor: "#7b2e2e",
                color: "secondary.main",
                "&:hover": {
                  borderColor: "#5f2424",
                  backgroundColor: "rgba(123, 46, 46, 0.04)",
                },
              }}
            >
              Add Block
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              PaperProps={{
                sx: { minWidth: 180 },
              }}
            >
              {blockMenuItems.map((item) => (
                <MenuItem
                  key={item.type}
                  onClick={() =>
                    handleAddBlock(item.type as ContentBlock["type"])
                  }
                >
                  <ListItemIcon sx={{ color: "secondary.main" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText>{item.label}</ListItemText>
                </MenuItem>
              ))}
            </Menu>
          </Stack>

          {blocks.length === 0 ? (
            <Paper
              sx={{
                p: 4,
                textAlign: "center",
                border: "2px dashed",
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <Typography color="text.secondary">
                No content blocks yet. Click `Add Block` to get started.
              </Typography>
            </Paper>
          ) : (
            blocks.map((block, index) => (
              <BlockEditor
                key={block.id}
                block={block}
                onUpdate={(updatedBlock) =>
                  handleUpdateBlock(index, updatedBlock)
                }
                onDelete={() => handleDeleteBlock(index)}
                onMoveUp={() => handleMoveBlock(index, "up")}
                onMoveDown={() => handleMoveBlock(index, "down")}
                isFirst={index === 0}
                isLast={index === blocks.length - 1}
              />
            ))
          )}

          <Divider sx={{ my: 2 }} />

          {/* CTA Settings */}
          <Typography
            variant="subtitle1"
            fontWeight={600}
            mb={2}
            color="secondary.main"
          >
            Call to Action Button
          </Typography>
          <Stack spacing={2} mb={3}>
            <TextField
              fullWidth
              size="small"
              label="Button Text"
              value={content.ctaText}
              onChange={(e) => updateContent("ctaText", e.target.value)}
              placeholder="Leave empty to hide button"
            />
            <TextField
              fullWidth
              size="small"
              label="Button URL"
              value={content.ctaLink}
              onChange={(e) => updateContent("ctaLink", e.target.value)}
            />
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Footer Settings */}
          <Typography
            variant="subtitle1"
            fontWeight={600}
            mb={2}
            color="secondary.main"
          >
            Footer
          </Typography>
          <Stack spacing={2}>
            <TextField
              fullWidth
              size="small"
              label="Footer Text"
              value={content.footerText}
              onChange={(e) => updateContent("footerText", e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              label="Footer Link"
              value={content.footerLink}
              onChange={(e) => updateContent("footerLink", e.target.value)}
              placeholder="www.example.com"
            />
          </Stack>
        </Box>

        {/* Preview Panel */}
        <Box
          sx={{
            width: "55%",
            overflowY: "auto",
            backgroundColor: "background.main",

            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(123,46,46,0.5)",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "rgba(123,46,46,0.8)",
            },
            // top fade
            "&::before": {
              content: '""',
              position: "sticky",
              top: 0,
              left: 0,
              right: 0,
              height: 12,
              background:
                "linear-gradient(to bottom, rgba(246,244,244,1), rgba(246,244,244,0))",
              zIndex: 1,
            },
            // bottom fade
            "&::after": {
              content: '""',
              position: "sticky",
              bottom: 0,
              left: 0,
              right: 0,
              height: 12,
              background:
                "linear-gradient(to top, rgba(246,244,244,1), rgba(246,244,244,0))",
              zIndex: 1,
            },
          }}
        >
          <Box
            sx={{
              position: "sticky",
              top: 0,
              bgcolor: "background.default",
              borderBottom: "1px solid",
              borderColor: "divider",
              p: 2,
              zIndex: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              Live Preview
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Subject: {content.subject}
            </Typography>
          </Box>
          <EmailPreview content={content} blocks={blocks} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyModal;
