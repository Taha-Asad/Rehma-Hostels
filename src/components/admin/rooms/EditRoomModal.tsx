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
} from "@mui/material";

import {
  Save as SaveIcon,
  Add as AddIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

// import Image from "next/image";
import toast from "react-hot-toast";
import { JsonValue } from "@/generated/prisma/runtime/library";

interface EditModelProps {
  open: boolean;
  onClose: () => void;
  room: Room | null;
  onConfirm: (data: FormData) => void; // SERVER ACTION
}

const EditRoomModal = ({ open, onClose, room, onConfirm }: EditModelProps) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    serviceList: [] as string[],
    newServiceItem: "",
    chips: [] as JsonValue[],
    newChip: { icon: "", label: "", position: "" },
    price: "",
    duration: "",
    capacity: null as number | null,
    size: "",
    availability: "",
    rating: null as number | null,
    reviews: null as number | null,
    description: "",
    amenities: [] as JsonValue[], // [{icon, label}]
    newAmenity: { icon: "", label: "" },
  });

  //   const [image, setImage] = useState<File | null>(null);
  //   const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (room) {
      setFormData({
        title: room.title || "",
        content: room.content || "",
        serviceList: room.serviceList || [],
        newServiceItem: "",
        chips: (room.chips as any[]).map((c) => ({
          icon: c.icon || "",
          label: c.label || "",
          position: c.position || "",
        })),
        newChip: { icon: "", label: "", position: "" },
        price: room.price || "",
        duration: room.duration || "",
        capacity: room.capacity ?? null,
        size: room.size || "",
        availability: room.availability || "",
        rating: room.rating ?? null,
        reviews: room.reviews ?? null,
        description: room.description || "",
        amenities: (room.amenities as any[]).map((a) => ({
          icon: a.icon || "",
          label: a.label || "",
        })),
        newAmenity: { icon: "", label: "" },
      });
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
    if (!formData.newChip.label) return;

    setFormData({
      ...formData,
      chips: [...formData.chips, formData.newChip],
      newChip: { icon: "", label: "", position: "" },
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
    if (!formData.newAmenity.label) return;

    setFormData({
      ...formData,
      amenities: [...formData.amenities, formData.newAmenity],
      newAmenity: { icon: "", label: "" },
    });
  };

  const removeAmenity = (i: number) => {
    const updated = [...formData.amenities];
    updated.splice(i, 1);
    setFormData({ ...formData, amenities: updated });
  };

  // IMAGE ---------------------------------------------------------------------

  //   const handleImageChange = (e: SyntheticEvent) => {
  //     const file = e.target.files?.[0];
  //     if (!file) return;

  //     setImage(file);
  //     setImagePreview(URL.createObjectURL(file));
  //   };

  // SUBMIT (SERVER ACTION) ----------------------------------------------------

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          data.append(key, JSON.stringify(value));
        } else if (value !== null) {
          data.append(key, value.toString());
        }
      });

      //   if (image) data.append("image", image);

      await onConfirm(data);

      toast.success("Room updated");
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
      PaperProps={{
        sx: {
          background: "#111",
          color: "#fff",
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Edit Room
        <IconButton onClick={onClose} sx={{ color: "#fff" }}>
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
              InputProps={{ sx: { color: "#fff" } }}
              InputLabelProps={{ sx: { color: "#909090" } }}
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
              InputProps={{ sx: { color: "#fff" } }}
              InputLabelProps={{ sx: { color: "#909090" } }}
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
                InputProps={{ sx: { color: "#fff" } }}
                InputLabelProps={{ sx: { color: "#909090" } }}
              />
              <IconButton onClick={addServiceItem} sx={{ color: "#fff" }}>
                <AddIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
              {formData.serviceList.map((s, i) => (
                <Chip
                  key={i}
                  label={s}
                  onDelete={() => removeService(i)}
                  sx={{ background: "#333", color: "#fff" }}
                />
              ))}
            </Box>

            {/* CHIPS -------------------------------------------------------- */}

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
              {formData.chips.map((c, i) => (
                <Chip
                  key={i}
                  label={`${
                    (c as { label: string; position: string }).label
                  } (${(c as { label: string; position: string }).position})`}
                  onDelete={() => removeChip(i)}
                  sx={{ background: "#333", color: "#fff" }}
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
                        background: "#222",
                        color: "#fff",
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

              <TextField
                label="Position"
                value={formData.newChip.position}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    newChip: { ...formData.newChip, position: e.target.value },
                  })
                }
              />

              <IconButton onClick={addChip}>
                <AddIcon />
              </IconButton>
            </Box>

            {/* PRICE --------------------------------------------------------- */}
            <TextField
              fullWidth
              label="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              sx={{ mb: 2 }}
              InputProps={{ sx: { color: "#fff" } }}
              InputLabelProps={{ sx: { color: "#909090" } }}
            />

            {/* DURATION ------------------------------------------------------ */}
            <TextField
              fullWidth
              label="Duration"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              sx={{ mb: 2 }}
              InputProps={{ sx: { color: "#fff" } }}
              InputLabelProps={{ sx: { color: "#909090" } }}
            />

            {/* CAPACITY ------------------------------------------------------ */}
            <TextField
              fullWidth
              label="Capacity"
              type="number"
              value={formData.capacity ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, capacity: Number(e.target.value) })
              }
              sx={{ mb: 2 }}
              InputProps={{ sx: { color: "#fff" } }}
              InputLabelProps={{ sx: { color: "#909090" } }}
            />

            {/* SIZE ----------------------------------------------------------- */}
            <TextField
              fullWidth
              label="Size"
              value={formData.size}
              onChange={(e) =>
                setFormData({ ...formData, size: e.target.value })
              }
              sx={{ mb: 2 }}
              InputProps={{ sx: { color: "#fff" } }}
              InputLabelProps={{ sx: { color: "#909090" } }}
            />

            {/* AVAILABILITY -------------------------------------------------- */}
            <TextField
              fullWidth
              label="Availability"
              value={formData.availability}
              onChange={(e) =>
                setFormData({ ...formData, availability: e.target.value })
              }
              sx={{ mb: 2 }}
              InputProps={{ sx: { color: "#fff" } }}
              InputLabelProps={{ sx: { color: "#909090" } }}
            />

            {/* RATING -------------------------------------------------------- */}
            <TextField
              fullWidth
              label="Rating"
              type="number"
              value={formData.rating ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, rating: Number(e.target.value) })
              }
              sx={{ mb: 2 }}
              InputProps={{ sx: { color: "#fff" } }}
              InputLabelProps={{ sx: { color: "#909090" } }}
            />

            {/* REVIEWS ------------------------------------------------------- */}
            <TextField
              fullWidth
              label="Reviews"
              type="number"
              value={formData.reviews ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, reviews: Number(e.target.value) })
              }
              sx={{ mb: 2 }}
              InputProps={{ sx: { color: "#fff" } }}
              InputLabelProps={{ sx: { color: "#909090" } }}
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
              InputProps={{ sx: { color: "#fff" } }}
              InputLabelProps={{ sx: { color: "#909090" } }}
            />

            {/* AMENITIES ----------------------------------------------------- */}
            <Typography sx={{ mb: 1 }}>Amenities</Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
              {formData.amenities.map((a, i) => (
                <Chip
                  key={i}
                  label={`${(a as { label: string }).label}`}
                  onDelete={() => removeAmenity(i)}
                  sx={{ background: "#444", color: "#fff" }}
                />
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                label="Amenity Label"
                value={formData.newAmenity.label}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    newAmenity: {
                      ...formData.newAmenity,
                      label: e.target.value,
                    },
                  })
                }
                InputProps={{ sx: { color: "#fff" } }}
                InputLabelProps={{ sx: { color: "#909090" } }}
              />

              <TextField
                label="Icon"
                value={formData.newAmenity.icon}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    newAmenity: {
                      ...formData.newAmenity,
                      icon: e.target.value,
                    },
                  })
                }
                InputProps={{ sx: { color: "#fff" } }}
                InputLabelProps={{ sx: { color: "#909090" } }}
              />

              <IconButton onClick={addAmenity} sx={{ color: "#fff" }}>
                <AddIcon />
              </IconButton>
            </Box>
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
              {/* {imagePreview ? (
                <>
                  <Image
                    src={imagePreview}
                    width={300}
                    height={200}
                    alt="Preview"
                    style={{
                      borderRadius: "8px",
                      marginBottom: "16px",
                      width: "100%",
                      height: "auto",
                    }}
                  />

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
              )} */}
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
          sx={{ color: "#fff", borderColor: "#6F4E34" }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          startIcon={<SaveIcon />}
          disabled={loading}
          sx={{
            backgroundColor: "#6F4E34",
            "&:hover": { backgroundColor: "#5a3e2a" },
          }}
        >
          {loading ? "Saving..." : "Update Room"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRoomModal;
