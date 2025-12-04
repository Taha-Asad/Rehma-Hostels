/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Chip,
  IconButton,
  Typography,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import {
  Save as SaveIcon,
  Add as AddIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

import toast from "react-hot-toast";
import Image from "next/image";
import type { Post } from "@prisma/client";
import CardPreview from "./preview/CardPreview";
import ModalPreview from "./preview/ModalPreview";
import PagePreview from "./preview/PagePreview";

const chipPosition = [
  { label: "top-right", value: "top-right" },
  { label: "bottom-left", value: "bottom-left" },
];

const categoryOptions = [
  { label: "Technology", value: "Technology" },
  { label: "Announcements", value: "Announcements" },
  { label: "Events", value: "Events" },
  { label: "Facilities", value: "Facilities" },
];

const statusOptions = [
  { label: "DRAFT", value: "DRAFT" },
  { label: "PUBLISHED", value: "PUBLISHED" },
  { label: "ARCHIVED", value: "ARCHIVED" },
];

// Improved ContentBlock types with discriminated unions
export type ContentBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "code"; inline: boolean; text: string }
  | { type: "image"; src: string; alt?: string }
  | { type: "link"; href: string; text: string };

interface EditModelProps {
  open: boolean;
  onClose: () => void;
  blog: Post | null;
  onConfirm: (data: FormData) => void;
}

// Type guards for ContentBlock
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

const EditBlogModal = ({ onClose, open, blog, onConfirm }: EditModelProps) => {
  const [previewMode, setPreviewMode] = useState<"card" | "modal" | "page">(
    "card"
  );

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    chips: [] as { label: string; position: string }[],
    newChip: { label: "", position: "" },
    fullContent: [] as ContentBlock[],
    date: "",
    readTime: "",
    category: "",
    status: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!blog) return;
    try {
      // Parse fullContent if it's a string
      let parsedFullContent: ContentBlock[] = [];
      if (typeof blog.fullContent === "string") {
        try {
          parsedFullContent = JSON.parse(blog.fullContent);
        } catch {
          parsedFullContent = [];
        }
      } else if (Array.isArray(blog.fullContent)) {
        parsedFullContent = blog.fullContent as ContentBlock[];
      }

      setFormData({
        title: blog.title || "",
        content: blog.content || "",
        chips:
          (blog.chips as any[])?.map((c) => ({
            label: c.label || "",
            position: c.position || "",
          })) || [],
        newChip: { label: "", position: "" },
        fullContent: parsedFullContent,
        date: blog.date ? new Date(blog.date).toISOString().split("T")[0] : "",
        readTime: blog.readTime || "",
        category: blog.category || "",
        status: blog.status || "",
      });
      setImagePreview(blog.image ?? "");
      setImage(null);
    } catch (error) {
      console.error(`Error getting Data ${error}`);
      toast.error(`Error getting Data`);
    }
  }, [blog]);

  const addChip = () => {
    if (!formData.newChip.label || !formData.newChip.position) {
      toast.error("Please fill chip label and position");
      return;
    }
    setFormData({
      ...formData,
      chips: [...formData.chips, formData.newChip],
      newChip: { label: "", position: "" },
    });
  };

  const removeChip = (index: number) => {
    const updated = [...formData.chips];
    updated.splice(index, 1);
    setFormData({ ...formData, chips: updated });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const updateContentBlock = (
    index: number,
    updates: Partial<ContentBlock>
  ) => {
    const newBlocks = [...formData.fullContent];
    newBlocks[index] = { ...newBlocks[index], ...updates } as ContentBlock;
    setFormData({ ...formData, fullContent: newBlocks });
  };

  const deleteContentBlock = (index: number) => {
    const newBlocks = [...formData.fullContent];
    newBlocks.splice(index, 1);
    setFormData({ ...formData, fullContent: newBlocks });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Validation
      if (!formData.title) {
        toast.error("Title is required");
        return;
      }

      const data = new FormData();
      data.append("id", blog?.id.toString() ?? "");

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "newChip") {
          if (Array.isArray(value) || typeof value === "object") {
            data.append(key, JSON.stringify(value));
          } else if (value !== null && value !== undefined) {
            data.append(key, value.toString());
          }
        }
      });

      if (image) data.append("image", image);

      await onConfirm(data);
      toast.success("Blog updated successfully");
      onClose();
    } catch (error) {
      toast.error(`Update failed: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xl"
      disableScrollLock
      slotProps={{
        paper: {
          sx: {
            bgcolor: "background.main",
            maxHeight: "90vh",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid background.main",
        }}
      >
        Edit Blog Post
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          pb: 4,
          bgcolor: "background.default",
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
            display: "flex",
            gap: 3,
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          {/* LEFT COLUMN */}
          <Box sx={{ flex: 1 }}>
            {/* Image Upload */}
            <Typography variant="h6" sx={{ mb: 2, color: "#3D444B" }}>
              Featured Image
            </Typography>
            <Box
              sx={{
                border: "2px dashed #7B2E2E30",
                borderRadius: 2,
                p: 2,
                textAlign: "center",
                mb: 3,
              }}
            >
              {imagePreview ? (
                <>
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 220,
                      borderRadius: 2,
                      overflow: "hidden",
                      mb: 2,
                    }}
                  >
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="outlined"
                      component="label"
                      sx={{ color: "#7B2E2E", borderColor: "#7B2E2E" }}
                    >
                      Change Image
                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => {
                        setImage(null);
                        setImagePreview("");
                      }}
                      sx={{ color: "#f44336" }}
                    >
                      Remove
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Typography sx={{ color: "#909090", mb: 2 }}>
                    No image selected
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<AddIcon />}
                    sx={{ color: "#7B2E2E", borderColor: "#7B2E2E" }}
                  >
                    Upload Image
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Button>
                </>
              )}
            </Box>

            <Alert severity="info" sx={{ mb: 3 }}>
              Recommended: 1200x630px, JPG/PNG/GIF, Max 5MB
            </Alert>

            {/* Basic Fields */}
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="Content Summary"
              multiline
              rows={3}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              sx={{ mb: 2 }}
            />

            {/* Chips Section */}
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, color: "primary.contrastText", fontWeight: 600 }}
            >
              Tags
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              {formData.chips.map((chip, i) => (
                <Chip
                  key={i}
                  label={`${chip.label} (${chip.position})`}
                  onDelete={() => removeChip(i)}
                  sx={{ bgcolor: "#7B2E2E15", color: "secondary.main" }}
                />
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
              <TextField
                size="medium"
                fullWidth
                label="Tag Label"
                value={formData.newChip.label}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    newChip: { ...formData.newChip, label: e.target.value },
                  })
                }
              />
              <Autocomplete
                size="medium"
                options={chipPosition}
                value={
                  chipPosition.find(
                    (opt) => opt.value === formData.newChip.position
                  ) || null
                }
                onChange={(_, value) =>
                  setFormData({
                    ...formData,
                    newChip: {
                      ...formData.newChip,
                      position: value?.value || "",
                    },
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Position" />
                )}
                sx={{ minWidth: 230 }}
              />
              <IconButton
                onClick={addChip}
                sx={{ color: "primary.main", width: 50, height: 50 }}
              >
                <AddIcon />
              </IconButton>
            </Box>

            {/* Meta Fields */}
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Read Time"
                placeholder="e.g., 5 min read"
                value={formData.readTime}
                onChange={(e) =>
                  setFormData({ ...formData, readTime: e.target.value })
                }
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <Autocomplete
                fullWidth
                options={categoryOptions}
                value={
                  categoryOptions.find(
                    (opt) => opt.value === formData.category
                  ) || null
                }
                onChange={(_, value) =>
                  setFormData({ ...formData, category: value?.value || "" })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Category" />
                )}
              />
              <Autocomplete
                fullWidth
                options={statusOptions}
                value={
                  statusOptions.find((opt) => opt.value === formData.status) ||
                  null
                }
                onChange={(_, value) =>
                  setFormData({ ...formData, status: value?.value || "" })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Status" />
                )}
              />
            </Box>

            {/* Content Builder */}
            <Typography
              variant="subtitle1"
              sx={{ mb: 2, color: "primary.contrastText", fontWeight: 600 }}
            >
              Content Builder
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() =>
                setFormData({
                  ...formData,
                  fullContent: [
                    ...formData.fullContent,
                    { type: "paragraph", text: "" },
                  ],
                })
              }
              sx={{ mb: 2, color: "#D4A373", borderColor: "#D4A373" }}
            >
              Add Content Block
            </Button>

            {formData.fullContent.map((block, i) => (
              <Box
                key={i}
                sx={{
                  mb: 2,
                  p: 2,
                  border: "1px solid #E0E0E0",
                  borderRadius: 1,
                  bgcolor: "background.main",
                }}
              >
                <Box
                  sx={{ display: "flex", gap: 1, alignItems: "center", mb: 2 }}
                >
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={block.type}
                      onChange={(e: SelectChangeEvent) => {
                        const newType = e.target.value as ContentBlock["type"];
                        let newBlock: ContentBlock;

                        switch (newType) {
                          case "heading":
                            newBlock = { type: "heading", level: 2, text: "" };
                            break;
                          case "paragraph":
                            newBlock = { type: "paragraph", text: "" };
                            break;
                          case "list":
                            newBlock = {
                              type: "list",
                              ordered: false,
                              items: [],
                            };
                            break;
                          case "blockquote":
                            newBlock = { type: "blockquote", text: "" };
                            break;
                          case "code":
                            newBlock = {
                              type: "code",
                              inline: false,
                              text: "",
                            };
                            break;
                          case "image":
                            newBlock = { type: "image", src: "", alt: "" };
                            break;
                          case "link":
                            newBlock = { type: "link", href: "", text: "" };
                            break;
                          default:
                            return;
                        }

                        const newBlocks = [...formData.fullContent];
                        newBlocks[i] = newBlock;
                        setFormData({ ...formData, fullContent: newBlocks });
                      }}
                    >
                      <MenuItem value="paragraph">Paragraph</MenuItem>
                      <MenuItem value="heading">Heading</MenuItem>
                      <MenuItem value="list">List</MenuItem>
                      <MenuItem value="blockquote">Quote</MenuItem>
                      <MenuItem value="code">Code</MenuItem>
                      <MenuItem value="image">Image</MenuItem>
                      <MenuItem value="link">Link</MenuItem>
                    </Select>
                  </FormControl>

                  {block.type === "heading" && hasLevel(block) && (
                    <FormControl size="small" sx={{ minWidth: 80 }}>
                      <Select
                        value={block.level}
                        onChange={(e) =>
                          updateContentBlock(i, {
                            level: Number(e.target.value) as 1 | 2 | 3,
                          })
                        }
                      >
                        <MenuItem value={1}>H1</MenuItem>
                        <MenuItem value={2}>H2</MenuItem>
                        <MenuItem value={3}>H3</MenuItem>
                      </Select>
                    </FormControl>
                  )}

                  {block.type === "code" && hasInline(block) && (
                    <FormControl size="small" sx={{ minWidth: 100 }}>
                      <Select
                        value={block.inline ? "inline" : "block"}
                        onChange={(e) =>
                          updateContentBlock(i, {
                            inline: e.target.value === "inline",
                          })
                        }
                      >
                        <MenuItem value="inline">Inline</MenuItem>
                        <MenuItem value="block">Block</MenuItem>
                      </Select>
                    </FormControl>
                  )}

                  <Button
                    size="small"
                    color="error"
                    onClick={() => deleteContentBlock(i)}
                    sx={{ ml: "auto" }}
                  >
                    Delete
                  </Button>
                </Box>

                {/* Content Fields */}
                {(block.type === "paragraph" ||
                  block.type === "heading" ||
                  block.type === "blockquote") &&
                  hasText(block) && (
                    <TextField
                      fullWidth
                      multiline={block.type !== "heading"}
                      rows={block.type === "paragraph" ? 3 : 2}
                      label={
                        block.type.charAt(0).toUpperCase() +
                        block.type.slice(1) +
                        " Text"
                      }
                      value={block.text}
                      onChange={(e) =>
                        updateContentBlock(i, { text: e.target.value })
                      }
                    />
                  )}

                {block.type === "list" && hasItems(block) && (
                  <>
                    <FormControl component="fieldset" sx={{ mb: 1 }}>
                      <RadioGroup
                        row
                        value={(block as any).ordered ? "ordered" : "unordered"}
                        onChange={(e) =>
                          updateContentBlock(i, {
                            ordered: e.target.value === "ordered",
                          })
                        }
                      >
                        <FormControlLabel
                          value="unordered"
                          control={<Radio size="small" />}
                          label="Bullet List"
                        />
                        <FormControlLabel
                          value="ordered"
                          control={<Radio size="small" />}
                          label="Numbered List"
                        />
                      </RadioGroup>
                    </FormControl>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="List Items (one per line)"
                      value={block.items.join("\n")}
                      onChange={(e) =>
                        updateContentBlock(i, {
                          items: e.target.value
                            .split("\n")
                            .filter((item) => item.trim()),
                        })
                      }
                    />
                  </>
                )}

                {block.type === "code" && hasText(block) && (
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Code"
                    value={block.text}
                    onChange={(e) =>
                      updateContentBlock(i, { text: e.target.value })
                    }
                    sx={{ fontFamily: "monospace" }}
                  />
                )}

                {block.type === "image" && hasSrc(block) && (
                  <>
                    <TextField
                      fullWidth
                      label="Image URL"
                      value={block.src}
                      onChange={(e) =>
                        updateContentBlock(i, { src: e.target.value })
                      }
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      fullWidth
                      label="Alt Text"
                      value={block.alt || ""}
                      onChange={(e) =>
                        updateContentBlock(i, { alt: e.target.value })
                      }
                    />
                    {block.src && (
                      <Box sx={{ mt: 1, textAlign: "center" }}>
                        <Box
                          component="img"
                          src={block.src}
                          alt={block.alt}
                          sx={{ maxWidth: "100%", maxHeight: 200 }}
                        />
                      </Box>
                    )}
                  </>
                )}

                {block.type === "link" && hasHref(block) && hasText(block) && (
                  <>
                    <TextField
                      fullWidth
                      label="Link Text"
                      value={block.text}
                      onChange={(e) =>
                        updateContentBlock(i, { text: e.target.value })
                      }
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      fullWidth
                      label="URL"
                      value={block.href}
                      onChange={(e) =>
                        updateContentBlock(i, { href: e.target.value })
                      }
                    />
                  </>
                )}
              </Box>
            ))}
          </Box>

          {/* RIGHT COLUMN - Preview */}
          <Box sx={{ width: { xs: "100%", lg: 500 } }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Preview Mode</InputLabel>
              <Select
                value={previewMode}
                label="Preview Mode"
                onChange={(e) =>
                  setPreviewMode(e.target.value as "card" | "modal" | "page")
                }
              >
                <MenuItem value="card">Card Preview</MenuItem>
                <MenuItem value="modal">Modal Preview</MenuItem>
                <MenuItem value="page">Full Blog Page</MenuItem>
              </Select>
            </FormControl>

            <Box
              sx={{
                border: "1px solid #E0E0E0",
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "background.main",
              }}
            >
              {previewMode === "card" && (
                <CardPreview
                  cardPost={{
                    ...formData,
                    image: imagePreview,
                  }}
                />
              )}
              {previewMode === "modal" && (
                <ModalPreview
                  modalPost={{
                    ...formData,
                    image: imagePreview,
                    author: "Admin",
                  }}
                />
              )}
              {previewMode === "page" && (
                <PagePreview
                  pagePost={{
                    ...formData,
                    image: imagePreview,
                    author: "Admin",
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "flex-end",
          gap: 2,
          p: 3,
          borderTop: "1px solid #F1E9E9",
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            border: "2px solid #7B2E2E",
            borderRadius: 0.5,
            py: "10px",
            px: "15px",
            width: 200,
            fontWeight: 600,
            boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
            transition: "all 0.3s",
            "&:hover": {
              bgcolor: "secondary.main",
              color: "primary.contrastText",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          startIcon={<SaveIcon />}
          disabled={loading}
          sx={{
            bgcolor: "secondary.main",
            color: "primary.contrastText",
            border: "2px solid #7B2E2E",
            borderRadius: 0.5,
            py: "10px",
            px: "15px",
            width: 200,
            fontWeight: 600,
            boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
            transition: "all 0.3s",
            "&:hover": {
              bgcolor: "primary.main",
              color: "primary.contrastText",
            },
          }}
        >
          {loading ? "Saving..." : "Update Room"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBlogModal;
