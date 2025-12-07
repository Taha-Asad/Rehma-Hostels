// components/ProfileClient.tsx
"use client";

import React, { useState, useRef, useTransition } from "react";
import {
  Avatar,
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Alert,
  Snackbar,
  CircularProgress,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Badge,
  Grid,
} from "@mui/material";
import {
  Edit,
  Save,
  Cancel,
  CameraAlt,
  Visibility,
  VisibilityOff,
  Lock,
  Person,
  Email,
  Phone,
  Check,
  Close,
} from "@mui/icons-material";
import { changePassword, updateProfile } from "@/actions/user.action";

type ProfileProps = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  phone?: string | null;
  createdAt?: Date;
} | null;

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

const ProfileClient = ({ profile }: { profile: ProfileProps }) => {
  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Form state
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    image: profile?.image || "",
  });

  // Image upload state
  const [imagePreview, setImagePreview] = useState<string | null>(
    profile?.image || null
  );
  const [isUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password change state
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Snackbar state
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });

  const [image, setImage] = useState<File | null>(null);
  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.phone && !/^[\d\s\-+()]*$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle image upload
  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    // optional but still useful: basic type validation
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setSnackbar({
        open: true,
        message:
          "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.",
        severity: "error",
      });
      return;
    }

    // optional but useful size check
    if (file.size > 5 * 1024 * 1024) {
      setSnackbar({
        open: true,
        message: "File too large. Maximum size is 5MB.",
        severity: "error",
      });
      return;
    }

    // save file to state (so it can go in FormData later)
    setImage(file);

    // show preview instantly
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle save
  const handleSave = () => {
    if (!validateForm()) return;

    startTransition(async () => {
      const submitFormData = new FormData();
      submitFormData.append("name", formData.name);
      submitFormData.append("email", formData.email);
      submitFormData.append("phone", formData.phone);

      if (image) {
        // user uploaded new file
        submitFormData.append("image", image);
      } else {
        // no new file, send old URL or empty
        submitFormData.append("image", formData.image || "");
      }

      const result = await updateProfile(submitFormData);

      if (result.success) {
        setIsEditing(false);
        setSnackbar({
          open: true,
          message: result.message || "Profile updated successfully",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: result.error || "Failed to update profile",
          severity: "error",
        });
      }
    });
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({
      name: profile?.name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      image: profile?.image || "",
    });
    setImagePreview(profile?.image || null);
    setErrors({});
    setIsEditing(false);
  };

  // Password validation
  const validatePassword = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!passwordData.oldPassword) {
      newErrors.oldPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle password change
  const handlePasswordChange = async () => {
    if (!validatePassword()) return;

    setIsChangingPassword(true);
    try {
      const result = await changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });

      if (result.success) {
        setShowPasswordDialog(false);
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setSnackbar({
          open: true,
          message: result.message || "Password changed successfully",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: result.error || "Failed to change password",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: `An error occurred:  ${error}`,
        severity: "error",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Close password dialog
  const handleClosePasswordDialog = () => {
    setShowPasswordDialog(false);
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setErrors({});
  };

  if (!profile) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <Typography color="error">Profile not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.main", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        {/* Profile Card */}
        <Paper
          elevation={16}
          sx={{
            bgcolor: "background.main",
            boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
            overflow: "hidden",
            my: 4,
            mb: 6,
          }}
        >
          {/* Header Banner */}
          <Box
            sx={{
              height: 120,
              background: "linear-gradient(135deg, #7b2e2e 0%, #d4a373 100%)",
              position: "relative",
            }}
          />

          {/* Profile Content */}
          <Box sx={{ px: 4, pb: 4, mt: -6 }}>
            {/* Avatar Section */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Box sx={{ position: "relative" }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    isEditing ? (
                      <IconButton
                        size="small"
                        onClick={handleImageClick}
                        disabled={isUploading}
                        sx={{
                          bgcolor: "#7b2e2e",
                          color: "#fff",
                          "&:hover": { bgcolor: "#5f2424" },
                          width: 36,
                          height: 36,
                        }}
                      >
                        {isUploading ? (
                          <CircularProgress size={18} color="inherit" />
                        ) : (
                          <CameraAlt fontSize="small" />
                        )}
                      </IconButton>
                    ) : null
                  }
                >
                  <Avatar
                    src={imagePreview || "/placeholder.png"}
                    alt={formData.name || "Profile"}
                    sx={{
                      width: 120,
                      height: 120,
                      border: "4px solid #fff",
                      boxShadow: 3,
                      cursor: isEditing ? "pointer" : "default",
                      transition: "transform 0.2s",
                      "&:hover": isEditing
                        ? {
                            transform: "scale(1.02)",
                            opacity: 0.9,
                          }
                        : {},
                    }}
                    onClick={handleImageClick}
                  />
                </Badge>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  style={{ display: "none" }}
                />

                {/* Remove image button */}
                {isEditing && imagePreview && (
                  <Tooltip title="Remove image">
                    <IconButton
                      size="small"
                      onClick={handleRemoveImage}
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: -10,
                        bgcolor: "error.main",
                        color: "#fff",
                        "&:hover": { bgcolor: "error.dark" },
                        width: 28,
                        height: 28,
                      }}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>

              {/* Action Buttons */}
              <Stack direction="row" spacing={1}>
                {isEditing ? (
                  <>
                    <Button
                      variant="outlined"
                      startIcon={<Cancel />}
                      onClick={handleCancel}
                      disabled={isPending}
                      sx={{
                        color: "secondary.main",
                        borderRadius: 0.5,
                        py: "10px",
                        px: "15px",
                        fontWeight: 600,
                        boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
                        transition: "all 0.3s",
                        "&:hover": {
                          bgcolor: "#D4A373",
                          color: "#ffff",
                        },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={
                        isPending ? (
                          <CircularProgress size={18} color="inherit" />
                        ) : (
                          <Save />
                        )
                      }
                      onClick={handleSave}
                      disabled={isPending}
                      sx={{
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        borderRadius: 0.5,
                        py: "10px",
                        px: "15px",
                        fontWeight: 600,
                        boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
                        transition: "all 0.3s",
                        "&:hover": {
                          bgcolor: "#D4A373",
                          color: "#ffff",
                        },
                      }}
                    >
                      {isPending ? "Saving..." : "Save Changes"}
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={() => setIsEditing(true)}
                    sx={{
                      bgcolor: "#ffff",
                      color: "#7B2E2E",
                      borderRadius: 0.5,
                      py: "10px",
                      px: "15px",
                      fontWeight: 600,
                      boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
                      transition: "all 0.3s",
                      "&:hover": {
                        bgcolor: "#D4A373",
                        color: "#ffff",
                      },
                    }}
                  >
                    Edit Profile
                  </Button>
                )}
              </Stack>
            </Stack>

            {/* Name Display (when not editing) */}
            {!isEditing && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h4" fontWeight={700}>
                  {profile.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {profile.email}
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            {/* Profile Form */}
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={!isEditing || isPending}
                  error={!!errors.name}
                  helperText={errors.name}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color={isEditing ? "primary" : "disabled"} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: isEditing
                        ? "background.default"
                        : "background.main",
                    },
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing || isPending}
                  error={!!errors.email}
                  helperText={errors.email}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color={isEditing ? "primary" : "disabled"} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: isEditing
                        ? "background.default"
                        : "background.main",
                    },
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={!isEditing || isPending}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  placeholder="+1 (555) 123-4567"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone color={isEditing ? "primary" : "disabled"} />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: isEditing
                        ? "background.default"
                        : "background.main",
                    },
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Member Since"
                  value={
                    profile.createdAt
                      ? new Date(profile.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "N/A"
                  }
                  disabled
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: isEditing
                        ? "background.default"
                        : "background.main",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Security Section */}
        <Paper
          elevation={16}
          sx={{
            boxShadow: "0 20px 40px rgba(123,46,46,0.4)",
            mt: 3,
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: 4 }}>
            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
              <Lock sx={{ color: "#7b2e2e" }} />
              <Typography variant="h6" fontWeight={600}>
                Security Settings
              </Typography>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={2}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight={500}>
                  Password
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Change your password to keep your account secure
                </Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={<Lock />}
                onClick={() => setShowPasswordDialog(true)}
                sx={{
                  color: "secondary.main",
                  borderRadius: 0.5,
                  py: "10px",
                  px: "15px",
                  fontWeight: 600,
                  boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
                  transition: "all 0.3s",
                  "&:hover": {
                    bgcolor: "#D4A373",
                    color: "#ffff",
                  },
                }}
              >
                Change Password
              </Button>
            </Stack>
          </Box>
        </Paper>

        {/* Password Change Dialog */}
        <Dialog
          open={showPasswordDialog}
          onClose={handleClosePasswordDialog}
          maxWidth="sm"
          fullWidth
          disablePortal
          disableAutoFocus
          disableScrollLock
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Lock sx={{ color: "#7b2e2e" }} />
              <Typography variant="h6" fontWeight={600}>
                Change Password
              </Typography>
            </Stack>
          </DialogTitle>

          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Current Password"
                type={showPasswords.old ? "text" : "password"}
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    oldPassword: e.target.value,
                  }))
                }
                error={!!errors.oldPassword}
                helperText={errors.oldPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPasswords((prev) => ({
                            ...prev,
                            old: !prev.old,
                          }))
                        }
                        edge="end"
                      >
                        {showPasswords.old ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="New Password"
                type={showPasswords.new ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                error={!!errors.newPassword}
                helperText={errors.newPassword || "Minimum 8 characters"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPasswords((prev) => ({
                            ...prev,
                            new: !prev.new,
                          }))
                        }
                        edge="end"
                      >
                        {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Confirm New Password"
                type={showPasswords.confirm ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPasswords((prev) => ({
                            ...prev,
                            confirm: !prev.confirm,
                          }))
                        }
                        edge="end"
                      >
                        {showPasswords.confirm ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Password strength indicator */}
              {passwordData.newPassword && (
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    gutterBottom
                  >
                    Password Strength
                  </Typography>
                  <Box
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      bgcolor: "#e0e0e0",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        width: `${Math.min(
                          (passwordData.newPassword.length / 12) * 100,
                          100
                        )}%`,
                        bgcolor:
                          passwordData.newPassword.length < 8
                            ? "error.main"
                            : passwordData.newPassword.length < 12
                            ? "warning.main"
                            : "success.main",
                        transition: "width 0.3s",
                      }}
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {passwordData.newPassword.length < 8
                      ? "Weak"
                      : passwordData.newPassword.length < 12
                      ? "Medium"
                      : "Strong"}
                  </Typography>
                </Box>
              )}
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button
              variant="outlined"
              onClick={handleClosePasswordDialog}
              disabled={isChangingPassword}
              sx={{
                color: "secondary.main",
                borderRadius: 0.5,
                py: "10px",
                px: "15px",
                width: "130px",
                fontWeight: 600,
                boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
                transition: "all 0.3s",
                "&:hover": {
                  color: "#ffff",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handlePasswordChange}
              disabled={isChangingPassword}
              startIcon={
                isChangingPassword ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <Check />
                )
              }
              sx={{
                bgcolor: "#ffff",
                color: "#7B2E2E",
                borderRadius: 0.5,
                py: "10px",
                px: "15px",
                fontWeight: 600,
                boxShadow: "5px 5px 10px rgba(123, 46, 46, 0.2)",
                transition: "all 0.3s",
                "&:hover": {
                  bgcolor: "#D4A373",
                  color: "#ffff",
                },
              }}
            >
              {isChangingPassword ? "Changing..." : "Change Password"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={5000}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ProfileClient;
