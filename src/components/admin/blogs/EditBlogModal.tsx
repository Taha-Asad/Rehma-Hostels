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
} from "@mui/material";

import {
  Save as SaveIcon,
  Add as AddIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
const chipPosition = [
  {
    label: "top-right",
    value: "top-right",
  },
  {
    label: "bottom-left",
    value: "bottom-left",
  },
];
const category = [
  {
    label: "Available",
    value: "Available",
  },
  {
    label: "Unavailable",
    value: "Unavailable",
  },
];
const status = [
  {
    label: "DRAFT",
    value: "DRAFT",
  },
  {
    label: "PUBLISHED",
    value: "PUBLISHED",
  },
  {
    label: "ARCHIVED",
    value: "ARCHIVED",
  },
];
// mport Image from "next/image";
import toast from "react-hot-toast";
import Image from "next/image";
import { JsonValue } from "@prisma/client/runtime/client";
import type { Post } from "@prisma/client";
interface EditModelProps {
  open: boolean;
  onClose: () => void;
  blog: Post | null;
  onConfirm: (data: FormData) => void; // SERVER ACTION
}

const EditBlogModal = ({ onClose, open, blog, onConfirm }: EditModelProps) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    chips: [] as JsonValue[],
    newChip: { label: "", position: "" },
    fullContent: "",
    image: "",
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
      setFormData({
        title: blog.title || "",
        content: blog.content || "",
        chips:
          (blog.chips as any[])?.map((c) => ({
            label: c.label || "",
            position: c.position || "",
          })) || [],
        newChip: { label: "", position: "" },
        fullContent: blog.fullContent || "",
        image: blog.image || "",
        date: blog.date.toISOString().split("T")[0] || "", // better formatting
        readTime: blog.readTime || "",
        category: blog.category || "",
        status: blog.status || "",
      });

      setImagePreview(blog.image ?? "");
      setImage(null);
    } catch (error) {
      console.error(`Error getting Data ${error}`);
      toast.error(`Error getting Data ${error}`);
    }
  }, [blog]);

  const addChip = () => {
    if (!formData.newChip.label || !formData.newChip.position) return;

    setFormData({
      ...formData,
      chips: [...formData.chips, formData.newChip],
      newChip: { label: "", position: "" },
    });
  };
  useEffect(() => {
    console.log("chips updated", formData.chips);
  }, [formData.chips]);

  const removeChip = (i: number) => {
    const updated = [...formData.chips];
    updated.splice(i, 1);
    setFormData({ ...formData, chips: updated });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // SUBMIT (SERVER ACTION) ----------------------------------------------------

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const data = new FormData();

      // VERY IMPORTANT
      data.append("id", blog?.id.toString() ?? "");

      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          data.append(key, JSON.stringify(value));
        } else if (value !== null) {
          data.append(key, value.toString());
        }
      });

      if (image) data.append("image", image);

      await onConfirm(data);

      toast.success("blog updated");
      onClose();
    } catch (error) {
      toast.error(`Update failed: ${error}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
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
              background: "primary.main",
              color: "text.primary",
            },
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          Edit Room
          <IconButton onClick={onClose} sx={{ color: "primary.main" }}>
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
            {/* LEFT COLUMN ----------------------------------------------------- */}
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                label="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                sx={{ mb: 2 }}
                slotProps={{
                  input: {
                    sx: {
                      color: "text.primary",
                      "&::placeholder": { color: "text.secondary" },
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Content"
                multiline
                rows={3}
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                sx={{ mb: 2 }}
                slotProps={{
                  input: {
                    sx: {
                      color: "text.primary",
                      "&::placeholder": { color: "text.secondary" },
                    },
                  },
                }}
              />

              {/* CHIPS -------------------------------------------------------- */}

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                {formData.chips.map((c, i) => (
                  <Chip
                    key={i}
                    label={`${
                      (c as { label: string; position: string }).label
                    } (${(c as { label: string; position: string }).position})`}
                    onDelete={() => removeChip(i)}
                    sx={{
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                    }}
                  />
                ))}
              </Box>
              {/* CHIP SUGGESTIONS */}
              {formData.newChip.label && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
                  {formData.chips
                    .filter((c) =>
                      (c as any).label
                        .toLowerCase()
                        .includes(formData.newChip.label.toLowerCase())
                    )
                    .map((c, i) => (
                      <Chip
                        key={i}
                        label={(c as any).label}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            newChip: {
                              ...formData.newChip,
                              label: (c as any).label,
                            },
                          })
                        }
                        sx={{
                          bgcolor: "primary.main",
                          color: "primary.contrastText",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                </Box>
              )}

              <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                <TextField
                  fullWidth
                  label="Chip Label"
                  value={formData.newChip.label}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      newChip: { ...formData.newChip, label: e.target.value },
                    })
                  }
                />

                <Autocomplete
                  fullWidth
                  disablePortal
                  options={chipPosition}
                  value={
                    chipPosition.find(
                      (opt) => opt.label === formData.newChip.position
                    ) || null
                  }
                  onChange={(_, value) =>
                    setFormData({
                      ...formData,
                      newChip: {
                        ...formData.newChip,
                        position: value ? value.label : "",
                      },
                    })
                  }
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => {
                    // remove the `key` property before spreading
                    const { key, ...rest } = props;
                    return (
                      <Box key={key} component="li" {...rest}>
                        <Typography variant="body2">{option.label}</Typography>
                      </Box>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Position"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                  sx={{
                    mb: 2,
                  }}
                />

                <IconButton
                  onClick={() => {
                    console.log("before add", formData.chips);
                    addChip();
                    console.log("after add", formData.chips);
                  }}
                  sx={{ color: "primary.main", width: 50, height: 50 }}
                >
                  <AddIcon />
                </IconButton>
              </Box>

              <TextField
                fullWidth
                label="Full Content"
                value={formData.fullContent}
                onChange={(e) =>
                  setFormData({ ...formData, fullContent: e.target.value })
                }
                sx={{ mb: 2 }}
                slotProps={{
                  input: {
                    sx: {
                      color: "text.primary",
                      "&::placeholder": { color: "text.secondary" },
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Read Time"
                value={formData.readTime}
                onChange={(e) =>
                  setFormData({ ...formData, readTime: e.target.value })
                }
                sx={{ mb: 2 }}
                slotProps={{
                  input: {
                    sx: {
                      color: "text.primary",
                      "&::placeholder": { color: "text.secondary" },
                    },
                  },
                }}
              />

              {/* SIZE ----------------------------------------------------------- */}
              <TextField
                fullWidth
                label="Date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                sx={{ mb: 2 }}
                slotProps={{
                  input: {
                    sx: {
                      color: "text.primary",
                      "&::placeholder": { color: "text.secondary" },
                    },
                  },
                }}
              />

              {/* AVAILABILITY -------------------------------------------------- */}

              <Autocomplete
                disablePortal
                options={category}
                value={
                  category.find((opt) => opt.label === formData.category) ||
                  null
                }
                onChange={(_, value) =>
                  setFormData({ ...formData, category: value?.label || "" })
                }
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => {
                  // remove the `key` property before spreading
                  const { key, ...rest } = props;
                  return (
                    <Box key={key} component="li" {...rest}>
                      <Typography variant="body2">{option.label}</Typography>
                    </Box>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Category"
                    variant="outlined"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                )}
                sx={{
                  my: 2,
                }}
              />

              <Autocomplete
                disablePortal
                options={status}
                value={
                  status.find((opt) => opt.label === formData.status) || null
                }
                onChange={(_, value) =>
                  setFormData({ ...formData, status: value?.label || "" })
                }
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => {
                  // remove the `key` property before spreading
                  const { key, ...rest } = props;
                  return (
                    <Box key={key} component="li" {...rest}>
                      <Typography variant="body2">{option.label}</Typography>
                    </Box>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="status"
                    variant="outlined"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                )}
                sx={{
                  my: 2,
                }}
              />
            </Box>

            {/* RIGHT COLUMN ---------------------------------------------------- */}
            <Box sx={{ width: { xs: "100%", lg: 300 } }}>
              <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
                Featured Image
              </Typography>

              <Box
                sx={{
                  border: "2px dashed #6F4E34",
                  borderRadius: 2,
                  p: 2,
                  textAlign: "center",
                  mb: 2,
                }}
              >
                {imagePreview ? (
                  <>
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: 220, // now fill actually has something to fill
                        borderRadius: "8px",
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

                    <Button
                      variant="outlined"
                      component="label"
                      sx={{ color: "#6F4E34", borderColor: "#6F4E34" }}
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
                      sx={{ color: "#f44336", display: "block", mt: 1 }}
                    >
                      Remove
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography sx={{ color: "#fff", mb: 1 }}>
                      No image selected
                    </Typography>

                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<AddIcon />}
                      sx={{ color: "#6F4E34", borderColor: "#6F4E34" }}
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

              <Alert
                severity="info"
                sx={{ background: "#1e1e1e", color: "#fff" }}
              >
                Recommended size 1200x630
                <br />
                JPG, PNG, GIF
                <br />
                Max 5MB
              </Alert>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              border: "2px solid #7B2E2E",
              borderRadius: 0.5,
              mb: 2,
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
              mb: 2,
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
    </>
  );
};

export default EditBlogModal;
