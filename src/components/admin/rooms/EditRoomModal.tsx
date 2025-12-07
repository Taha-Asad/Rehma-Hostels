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
  InputAdornment,
  Switch,
  FormControlLabel,
  Paper,
} from "@mui/material";

import {
  Save as SaveIcon,
  Add as AddIcon,
  Close as CloseIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from "@mui/icons-material";

import toast from "react-hot-toast";
import Image from "next/image";
import { JsonValue } from "@prisma/client/runtime/client";

interface EditModelProps {
  open: boolean;
  onClose: () => void;
  room: Room | null;
  onConfirm: (data: FormData) => void;
}

const availability = [
  { label: "Available", value: "Available" },
  { label: "Unavailable", value: "Unavailable" },
];

const chipPosition = [
  { label: "top-right", value: "top-right" },
  { label: "bottom-left", value: "bottom-left" },
];

const EditRoomModal = ({ open, onClose, room, onConfirm }: EditModelProps) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    serviceList: [] as string[],
    newServiceItem: "",
    chips: [] as JsonValue[],
    newChip: { icon: "", label: "", position: "" },
    price: "" as string, // Keep as string for input, convert on submit
    duration: "",
    capacity: null as number | null,
    size: "",
    availability: "",
    rating: null as number | null,
    reviews: null as number | null,
    description: "",
    amenities: [] as string[],
    newAmenity: "",
    featured: false, // Added featured field
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (room) {
      setFormData({
        title: room.title || "",
        content: room.content || "",
        serviceList: room.serviceList || [],
        newServiceItem: "",
        chips:
          (room.chips as any[])?.map((c) => ({
            icon: c.icon || "",
            label: c.label || "",
            position: c.position || "",
          })) || [],
        newChip: { icon: "", label: "", position: "" },
        price: room.price?.toString() || "", // Convert to string for input
        duration: room.duration || "",
        capacity: room.capacity ?? null,
        size: room.size || "",
        availability: room.availability || "",
        rating: room.rating ?? null,
        reviews: room.reviews ?? null,
        description: room.description || "",
        amenities: room.amenities || [],
        newAmenity: "",
        featured: room.featured ?? false, // Set featured from room
      });

      setImagePreview(room.image ?? "");
      setImage(null);
    }
  }, [room]);

  // MULTI FIELD ADDERS --------------------------------------------------------

  const addServiceItem = () => {
    if (!formData.newServiceItem.trim()) return;
    setFormData({
      ...formData,
      serviceList: [...formData.serviceList, formData.newServiceItem.trim()],
      newServiceItem: "",
    });
  };

  const addChip = () => {
    if (!formData.newChip.label || !formData.newChip.position) return;

    setFormData({
      ...formData,
      chips: [...formData.chips, formData.newChip],
      newChip: { label: "", icon: "", position: "" },
    });
  };

  const removeChip = (i: number) => {
    const updated = [...formData.chips];
    updated.splice(i, 1);
    setFormData({ ...formData, chips: updated });
  };

  const removeService = (i: number) => {
    const updated = [...formData.serviceList];
    updated.splice(i, 1);
    setFormData({ ...formData, serviceList: updated });
  };

  const addAmenity = () => {
    if (!formData.newAmenity.trim()) return;

    setFormData({
      ...formData,
      amenities: [...formData.amenities, formData.newAmenity],
      newAmenity: "",
    });
  };

  const removeAmenity = (i: number) => {
    const updated = [...formData.amenities];
    updated.splice(i, 1);
    setFormData({ ...formData, amenities: updated });
  };

  // PRICE HANDLER -------------------------------------------------------------

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      setFormData({ ...formData, price: value });
    }
  };

  // Format price for display with commas
  const formatPriceDisplay = (price: string): string => {
    if (!price) return "";
    return parseInt(price).toLocaleString("en-PK");
  };

  // IMAGE ---------------------------------------------------------------------

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // SUBMIT (SERVER ACTION) ----------------------------------------------------

  const handleSubmit = async () => {
    // Validation
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!formData.price || parseInt(formData.price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("id", room?.id.toString() ?? "");

      // Handle each field appropriately
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("serviceList", JSON.stringify(formData.serviceList));
      data.append("chips", JSON.stringify(formData.chips));
      data.append("price", parseInt(formData.price).toString()); // Convert to integer
      data.append("duration", formData.duration);
      data.append("capacity", formData.capacity?.toString() ?? "");
      data.append("size", formData.size);
      data.append("availability", formData.availability);
      data.append("rating", formData.rating?.toString() ?? "");
      data.append("reviews", formData.reviews?.toString() ?? "");
      data.append("description", formData.description);
      data.append("amenities", JSON.stringify(formData.amenities));
      data.append("featured", formData.featured.toString()); // Add featured

      if (image) data.append("image", image);

      await onConfirm(data);

      toast.success("Room updated successfully");
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
            {/* FEATURED TOGGLE ----------------------------------------------- */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 3,
                borderRadius: 2,
                border: formData.featured
                  ? "2px solid #D4A373"
                  : "2px solid #E0E0E0",
                bgcolor: formData.featured
                  ? "rgba(212, 163, 115, 0.1)"
                  : "transparent",
                transition: "all 0.3s ease",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {formData.featured ? (
                    <StarIcon sx={{ color: "#D4A373", fontSize: 28 }} />
                  ) : (
                    <StarBorderIcon sx={{ color: "#9E9E9E", fontSize: 28 }} />
                  )}
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: formData.featured ? "#D4A373" : "text.primary",
                      }}
                    >
                      Featured Room
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formData.featured
                        ? "This room will be highlighted in listings"
                        : "Enable to highlight this room in listings"}
                    </Typography>
                  </Box>
                </Box>

                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#D4A373",
                          "&:hover": {
                            backgroundColor: "rgba(212, 163, 115, 0.08)",
                          },
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: "#D4A373",
                          },
                      }}
                    />
                  }
                  label=""
                  sx={{ m: 0 }}
                />
              </Box>

              {/* Featured Badge Preview */}
              {formData.featured && (
                <Box
                  sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Badge Preview:
                  </Typography>
                  <Chip
                    icon={<StarIcon sx={{ fontSize: 16 }} />}
                    label="Featured"
                    size="small"
                    sx={{
                      bgcolor: "#D4A373",
                      color: "white",
                      fontWeight: 600,
                      "& .MuiChip-icon": {
                        color: "white",
                      },
                    }}
                  />
                </Box>
              )}
            </Paper>

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

            {/* SERVICE LIST ------------------------------------------------ */}
            <Typography sx={{ mb: 1 }}>Service List</Typography>

            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                fullWidth
                label="Add service"
                value={formData.newServiceItem}
                onChange={(e) =>
                  setFormData({ ...formData, newServiceItem: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addServiceItem();
                  }
                }}
                slotProps={{
                  input: {
                    sx: {
                      color: "text.primary",
                      "&::placeholder": { color: "text.secondary" },
                    },
                  },
                }}
              />
              <IconButton
                onClick={addServiceItem}
                sx={{ color: "primary.main", width: 50, height: 50 }}
              >
                <AddIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
              {formData.serviceList.map((s, i) => (
                <Chip
                  key={i}
                  label={s}
                  onDelete={() => removeService(i)}
                  sx={{
                    color: "primary.main",
                    bgcolor: "primary.contrastText",
                    border: "1px solid",
                    borderColor: "primary.main",
                  }}
                />
              ))}
            </Box>

            {/* CHIPS -------------------------------------------------------- */}
            <Typography sx={{ mb: 1 }}>Chips</Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
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

            <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
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

              <TextField
                label="Icon"
                value={formData.newChip.icon}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    newChip: { ...formData.newChip, icon: e.target.value },
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
              />

              <IconButton
                onClick={addChip}
                sx={{ color: "primary.main", width: 50, height: 50 }}
              >
                <AddIcon />
              </IconButton>
            </Box>

            {/* PRICE --------------------------------------------------------- */}
            <TextField
              fullWidth
              label="Price"
              type="text"
              value={formData.price}
              onChange={handlePriceChange}
              placeholder="Enter price"
              sx={{ mb: 2 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography
                        sx={{
                          color: "primary.main",
                          fontWeight: 600,
                          fontSize: "0.95rem",
                        }}
                      >
                        PKR
                      </Typography>
                    </InputAdornment>
                  ),
                  sx: {
                    color: "text.primary",
                    "&::placeholder": { color: "text.secondary" },
                  },
                },
              }}
              helperText={
                formData.price
                  ? `Formatted: PKR ${formatPriceDisplay(formData.price)}`
                  : "Enter price in Pakistani Rupees"
              }
            />

            {/* DURATION ------------------------------------------------------ */}
            <TextField
              fullWidth
              label="Duration"
              value={formData.duration}
              placeholder="e.g., per month, per night"
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
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

            {/* CAPACITY ------------------------------------------------------ */}
            <TextField
              fullWidth
              label="Capacity"
              type="number"
              value={formData.capacity ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  capacity: e.target.value ? Number(e.target.value) : null,
                })
              }
              sx={{ mb: 2 }}
              slotProps={{
                input: {
                  inputProps: { min: 1 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="body2" color="text.secondary">
                        persons
                      </Typography>
                    </InputAdornment>
                  ),
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
              label="Size"
              value={formData.size}
              placeholder="e.g., 250 sq ft"
              onChange={(e) =>
                setFormData({ ...formData, size: e.target.value })
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
              options={availability}
              value={
                availability.find(
                  (opt) => opt.label === formData.availability
                ) || null
              }
              onChange={(_, value) =>
                setFormData({ ...formData, availability: value?.label || "" })
              }
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => {
                const { key, ...rest } = props;
                return (
                  <Box
                    key={key}
                    component="li"
                    {...rest}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        bgcolor:
                          option.value === "Available" ? "#4CAF50" : "#F44336",
                      }}
                    />
                    <Typography variant="body2">{option.label}</Typography>
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Availability"
                  variant="outlined"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              )}
              sx={{ my: 2 }}
            />

            {/* RATING -------------------------------------------------------- */}
            <TextField
              fullWidth
              label="Rating"
              type="number"
              value={formData.rating ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rating: e.target.value ? Number(e.target.value) : null,
                })
              }
              sx={{ mb: 2 }}
              slotProps={{
                input: {
                  inputProps: { min: 0, max: 5, step: 0.1 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="body2" color="text.secondary">
                        / 5
                      </Typography>
                    </InputAdornment>
                  ),
                  sx: {
                    color: "text.primary",
                    "&::placeholder": { color: "text.secondary" },
                  },
                },
              }}
            />

            {/* REVIEWS ------------------------------------------------------- */}
            <TextField
              fullWidth
              label="Reviews"
              type="number"
              value={formData.reviews ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  reviews: e.target.value ? Number(e.target.value) : null,
                })
              }
              sx={{ mb: 2 }}
              slotProps={{
                input: {
                  inputProps: { min: 0 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="body2" color="text.secondary">
                        reviews
                      </Typography>
                    </InputAdornment>
                  ),
                  sx: {
                    color: "text.primary",
                    "&::placeholder": { color: "text.secondary" },
                  },
                },
              }}
            />

            {/* DESCRIPTION --------------------------------------------------- */}
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              sx={{ mb: 3 }}
              slotProps={{
                input: {
                  sx: {
                    color: "text.primary",
                    "&::placeholder": { color: "text.secondary" },
                  },
                },
              }}
            />

            {/* AMENITIES ----------------------------------------------------- */}
            <Typography sx={{ mb: 1 }}>Amenities</Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              {formData.amenities.map((a, i) => (
                <Chip
                  key={i}
                  label={a}
                  onDelete={() => removeAmenity(i)}
                  sx={{
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                  }}
                />
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                fullWidth
                label="Amenity Label"
                value={formData.newAmenity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    newAmenity: e.target.value,
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addAmenity();
                  }
                }}
                slotProps={{
                  input: {
                    sx: {
                      color: "text.primary",
                      "&::placeholder": { color: "text.secondary" },
                    },
                  },
                }}
              />

              <IconButton
                onClick={addAmenity}
                sx={{ color: "primary.main", width: 50, height: 50 }}
              >
                <AddIcon />
              </IconButton>
            </Box>

            {/* Common Amenity Suggestions */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Quick Add:
              </Typography>
              <Box
                sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}
              >
                {[
                  "Wi-Fi",
                  "AC",
                  "TV",
                  "Refrigerator",
                  "Attached Bath",
                  "Parking",
                  "Security",
                  "Laundry",
                  "Kitchen",
                  "Geyser",
                ]
                  .filter((a) => !formData.amenities.includes(a))
                  .slice(0, 5)
                  .map((amenity) => (
                    <Chip
                      key={amenity}
                      label={amenity}
                      size="small"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          amenities: [...formData.amenities, amenity],
                        })
                      }
                      sx={{
                        cursor: "pointer",
                        bgcolor: "transparent",
                        border: "1px dashed",
                        borderColor: "primary.main",
                        color: "primary.main",
                        "&:hover": {
                          bgcolor: "rgba(123, 46, 46, 0.1)",
                        },
                      }}
                    />
                  ))}
              </Box>
            </Box>
          </Box>

          {/* RIGHT COLUMN ---------------------------------------------------- */}
          <Box sx={{ width: { xs: "100%", lg: 300 } }}>
            <Typography variant="h6" sx={{ color: "text.primary", mb: 2 }}>
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
                      height: 220,
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

                    {/* Featured overlay badge */}
                    {formData.featured && (
                      <Chip
                        icon={<StarIcon sx={{ fontSize: 14 }} />}
                        label="Featured"
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          bgcolor: "#D4A373",
                          color: "white",
                          fontWeight: 600,
                          "& .MuiChip-icon": {
                            color: "white",
                          },
                        }}
                      />
                    )}
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
                  <Typography sx={{ color: "text.secondary", mb: 1 }}>
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
              sx={{ background: "#1e1e1e", color: "#fff", mb: 2 }}
            >
              Recommended size 1200x630
              <br />
              JPG, PNG, GIF
              <br />
              Max 5MB
            </Alert>

            {/* Price Summary Card */}
            {formData.price && (
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(123, 46, 46, 0.05)",
                  border: "1px solid rgba(123, 46, 46, 0.2)",
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Price Preview
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "primary.main",
                    fontWeight: 700,
                    mt: 0.5,
                  }}
                >
                  PKR {formatPriceDisplay(formData.price)}
                </Typography>
                {formData.duration && (
                  <Typography variant="body2" color="text.secondary">
                    {formData.duration}
                  </Typography>
                )}
              </Paper>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
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

export default EditRoomModal;
