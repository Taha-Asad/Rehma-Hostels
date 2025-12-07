"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
import { SaveIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const statusOptions = [
  {
    label: "PENDING",
    value: "PENDING",
  },
  {
    label: "REPLIED",
    value: "REPLIED",
  },
  {
    label: "IGNORED",
    value: "IGNORED",
  },
];
interface EditContactModalProps {
  open: boolean;
  onClose: () => void;
  contact: {
    id: string;
    status: string;
  } | null;
  onSubmit: (form: { id: string; status: string }) => void;
}

export default function EditContactModal({
  open,
  onClose,
  contact,
  onSubmit,
}: EditContactModalProps) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (contact) {
      setStatus(contact.status);
    }
  }, [contact]);

  const handleSubmit = async () => {
    if (!contact) return;

    try {
      setLoading(true);

      onSubmit({
        id: contact.id,
        status,
      });
      setStatus(contact.status);

      toast.success("Status updated");
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
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            color: "text.primary",
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
          },
        },
      }}
    >
      <DialogTitle>Edit Status</DialogTitle>

      <DialogContent
        sx={{
          py: 4,
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
        <Autocomplete
          fullWidth
          disablePortal
          options={statusOptions}
          value={statusOptions.find((opt) => opt.value === status) || null}
          onChange={(_, value) => setStatus(value?.value || "")}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} label="Status" variant="outlined" />
          )}
        />
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
          {loading ? "Saving..." : "Update Status"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
