"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Tabs,
  Tab,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CreateUser, loginUser } from "@/actions/user.action";
import { toast } from "react-hot-toast";

interface authProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthDialog({ open, onClose }: authProps) {
  const [tab, setTab] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // SIGN IN
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // SIGN UP
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [showPassword2, setShowPassword2] = useState(false);

  const [resetDialog, setResetDialog] = useState(false);
  const [verificationCodes, setVerificationCodes] = useState(Array(6).fill(""));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleCodeChange = (index: number, value: string) => {
    const newCodes = [...verificationCodes];
    newCodes[index] = value ? value[value.length - 1] : "";
    setVerificationCodes(newCodes);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  // FIXED SUBMIT HANDLER
  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (tab === 0) {
        // LOGIN
        if (!loginEmail || !loginPassword) {
          toast.error("Please enter email and password");
          return;
        }

        const res = await loginUser(loginEmail, loginPassword);

        if (!res?.success) {
          toast.error(res.message || "Invalid credentials");
          return;
        }
        if (res.isAdmin) router.push("/admin/");
        else router.push("/");
        toast.success("Logged in successfully");
        setLoginEmail("");
        setLoginPassword("");
        onClose();
      } else {
        // SIGN UP
        if (!name || !email || !phone || !password || !confirmPassword) {
          toast.error("All fields are required");
          return;
        }

        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }

        const res = await CreateUser(
          name,
          email,
          phone,
          password,
          confirmPassword,
          image
        );

        if (!res?.success) {
          toast.error(res.message || "Failed to create account");
          return;
        }

        toast.success("Account created successfully");
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");
        onClose();
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsSubmitting(false);
      router.refresh();
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#7B2E2E",
          }}
        >
          Welcome
        </DialogTitle>

        <DialogContent>
          <Tabs
            value={tab}
            onChange={handleChange}
            centered
            sx={{
              "& .MuiTab-root": {
                width: "50%",
                fontWeight: "bold",
                color: "#7B2E2E",
              },
              "& .MuiTab-root.Mui-selected": {
                color: "#D4A373",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#D4A373",
              },
            }}
          >
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>

          {/* SIGN IN */}
          {tab === 0 && (
            <Box
              sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />

              <Box sx={{ position: "relative" }}>
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  size="small"
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Box>

              <FormControlLabel
                control={<Checkbox sx={{ color: "#7B2E2E" }} />}
                label="Remember me"
              />

              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                disabled={isSubmitting}
                sx={{
                  backgroundColor: "#7B2E2E",
                  "&:hover": { backgroundColor: "#622424" },
                }}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>

              <Button
                sx={{
                  textTransform: "none",
                  color: "#7B2E2E",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  onClose();
                  setResetDialog(true);
                }}
              >
                Forgot Password?
              </Button>
            </Box>
          )}

          {/* SIGN UP */}
          {tab === 1 && (
            <Box
              sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                fullWidth
                label="Email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                fullWidth
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <Box sx={{ position: "relative" }}>
                <TextField
                  fullWidth
                  label="Password"
                  value={password}
                  type={showPassword2 ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <IconButton
                  onClick={() => setShowPassword2(!showPassword2)}
                  size="small"
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Box>

              <TextField
                fullWidth
                label="Confirm Password"
                value={confirmPassword}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <FormControlLabel
                control={<Checkbox sx={{ color: "#7B2E2E" }} />}
                label={
                  <span>
                    I agree to the{" "}
                    <span style={{ color: "#7B2E2E", fontWeight: "bold" }}>
                      Terms & Conditions
                    </span>
                  </span>
                }
              />

              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                disabled={isSubmitting}
                sx={{
                  backgroundColor: "#7B2E2E",
                  "&:hover": { backgroundColor: "#622424" },
                }}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* RESET PASSWORD */}
      <Dialog
        open={resetDialog}
        onClose={() => setResetDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#7B2E2E",
          }}
        >
          Verification Code
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {verificationCodes.map((code, i) => (
              <TextField
                key={i}
                id={`code-input-${i}`}
                value={code}
                onChange={(e) => handleCodeChange(i, e.target.value)}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center", fontSize: "1.4rem" },
                }}
                sx={{
                  width: "50px",
                }}
              />
            ))}
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#7B2E2E",
              "&:hover": { backgroundColor: "#622424" },
            }}
          >
            Verify
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
