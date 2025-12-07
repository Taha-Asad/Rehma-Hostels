import {
  Add,
  ArrowDownward,
  ArrowUpward,
  FormatListBulleted,
  FormatQuote,
  TextFields,
  Title,
} from "@mui/icons-material";
import {
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Code, Delete, ImageIcon, LinkIcon, Send } from "lucide-react";

export type ContentBlock =
  | { id: string; type: "heading"; level: 1 | 2 | 3; text: string }
  | { id: string; type: "paragraph"; text: string }
  | { id: string; type: "list"; ordered: boolean; items: string[] }
  | { id: string; type: "blockquote"; text: string }
  | { id: string; type: "code"; inline: boolean; text: string }
  | { id: string; type: "image"; src: string; alt?: string }
  | { id: string; type: "link"; href: string; text: string }
  | { id: string; type: "button"; href: string; text: string };

interface BlockEditorProps {
  block: ContentBlock;
  onUpdate: (block: ContentBlock) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const BlockEditor: React.FC<BlockEditorProps> = ({
  block,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}) => {
  const getBlockIcon = () => {
    switch (block.type) {
      case "heading":
        return <Title fontSize="small" />;
      case "paragraph":
        return <TextFields fontSize="small" />;
      case "list":
        return <FormatListBulleted fontSize="small" />;
      case "blockquote":
        return <FormatQuote fontSize="small" />;
      case "code":
        return <Code fontSize="small" />;
      case "image":
        return <ImageIcon fontSize="small" />;
      case "link":
        return <LinkIcon fontSize="small" />;
      case "button":
        return <Send fontSize="small" />;
      default:
        return <TextFields fontSize="small" />;
    }
  };

  const getBlockLabel = () => {
    const labels: Record<string, string> = {
      heading: "Heading",
      paragraph: "Paragraph",
      list: "List",
      blockquote: "Quote",
      code: "Code",
      image: "Image",
      link: "Link",
      button: "Button",
    };
    return labels[block.type] || "Block";
  };

  const renderBlockContent = () => {
    switch (block.type) {
      case "heading":
        return (
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <FormControl size="small" sx={{ minWidth: 70 }}>
              <Select
                value={block.level}
                onChange={(e) =>
                  onUpdate({ ...block, level: e.target.value as 1 | 2 | 3 })
                }
              >
                <MenuItem value={1}>H1</MenuItem>
                <MenuItem value={2}>H2</MenuItem>
                <MenuItem value={3}>H3</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              size="small"
              value={block.text}
              onChange={(e) => onUpdate({ ...block, text: e.target.value })}
              placeholder="Heading text..."
            />
          </Stack>
        );

      case "paragraph":
        return (
          <TextField
            fullWidth
            multiline
            minRows={2}
            maxRows={6}
            size="small"
            value={block.text}
            onChange={(e) => onUpdate({ ...block, text: e.target.value })}
            placeholder="Paragraph text... Use **bold** for emphasis"
            helperText="Use **text** for bold styling"
          />
        );

      case "list":
        return (
          <Stack spacing={1}>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={block.ordered}
                  onChange={(e) =>
                    onUpdate({ ...block, ordered: e.target.checked })
                  }
                />
              }
              label={
                <Typography variant="body2">
                  {block.ordered ? "Numbered list" : "Bullet list"}
                </Typography>
              }
            />
            {block.items.map((item, idx) => (
              <Stack key={idx} direction="row" spacing={1} alignItems="center">
                <Typography
                  sx={{ minWidth: 20, color: "text.secondary", fontSize: 14 }}
                >
                  {block.ordered ? `${idx + 1}.` : "•"}
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={item}
                  onChange={(e) => {
                    const newItems = [...block.items];
                    newItems[idx] = e.target.value;
                    onUpdate({ ...block, items: newItems });
                  }}
                  placeholder={`Item ${idx + 1}`}
                />
                <IconButton
                  size="small"
                  onClick={() => {
                    const newItems = block.items.filter((_, i) => i !== idx);
                    onUpdate({
                      ...block,
                      items: newItems.length ? newItems : [""],
                    });
                  }}
                  disabled={block.items.length <= 1}
                  color="error"
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Stack>
            ))}
            <Button
              size="small"
              startIcon={<Add />}
              onClick={() =>
                onUpdate({ ...block, items: [...block.items, ""] })
              }
              sx={{ alignSelf: "flex-start" }}
            >
              Add Item
            </Button>
          </Stack>
        );

      case "blockquote":
        return (
          <TextField
            fullWidth
            multiline
            minRows={2}
            maxRows={4}
            size="small"
            value={block.text}
            onChange={(e) => onUpdate({ ...block, text: e.target.value })}
            placeholder="Quote text..."
            sx={{
              "& .MuiOutlinedInput-root": {
                borderLeft: "4px solid #7b2e2e",
                borderRadius: "0 8px 8px 0",
              },
            }}
          />
        );

      case "code":
        return (
          <Stack spacing={1}>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={block.inline}
                  onChange={(e) =>
                    onUpdate({ ...block, inline: e.target.checked })
                  }
                />
              }
              label={<Typography variant="body2">Inline code</Typography>}
            />
            <TextField
              fullWidth
              multiline={!block.inline}
              minRows={block.inline ? 1 : 3}
              maxRows={block.inline ? 1 : 8}
              size="small"
              value={block.text}
              onChange={(e) => onUpdate({ ...block, text: e.target.value })}
              placeholder="Code..."
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontFamily: "monospace",
                  fontSize: "13px",
                },
              }}
            />
          </Stack>
        );

      case "image":
        return (
          <Stack spacing={1.5}>
            <TextField
              fullWidth
              size="small"
              value={block.src}
              onChange={(e) => onUpdate({ ...block, src: e.target.value })}
              placeholder="https://example.com/image.jpg"
              label="Image URL"
            />
            <TextField
              fullWidth
              size="small"
              value={block.alt || ""}
              onChange={(e) => onUpdate({ ...block, alt: e.target.value })}
              placeholder="Describe the image..."
              label="Alt Text (accessibility)"
            />
          </Stack>
        );

      case "link":
        return (
          <Stack spacing={1.5}>
            <TextField
              fullWidth
              size="small"
              value={block.text}
              onChange={(e) => onUpdate({ ...block, text: e.target.value })}
              placeholder="Click here"
              label="Link Text"
            />
            <TextField
              fullWidth
              size="small"
              value={block.href}
              onChange={(e) => onUpdate({ ...block, href: e.target.value })}
              placeholder="https://..."
              label="URL"
            />
          </Stack>
        );

      case "button":
        return (
          <Stack spacing={1.5}>
            <TextField
              fullWidth
              size="small"
              value={block.text}
              onChange={(e) => onUpdate({ ...block, text: e.target.value })}
              placeholder="Click Me"
              label="Button Text"
            />
            <TextField
              fullWidth
              size="small"
              value={block.href}
              onChange={(e) => onUpdate({ ...block, href: e.target.value })}
              placeholder="https://..."
              label="Button URL"
            />
          </Stack>
        );

      default:
        return null;
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        transition: "border-color 0.2s, box-shadow 0.2s",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: "0 2px 8px rgba(123, 46, 46, 0.1)",
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1.5}
      >
        <Chip
          icon={getBlockIcon()}
          label={getBlockLabel()}
          size="small"
          sx={{
            backgroundColor: "rgba(123, 46, 46, 0.1)",
            color: "#7b2e2e",
            "& .MuiChip-icon": {
              color: "#7b2e2e",
            },
          }}
        />
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Move up" arrow>
            <span>
              <IconButton size="small" onClick={onMoveUp} disabled={isFirst}>
                <ArrowUpward fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Move down" arrow>
            <span>
              <IconButton size="small" onClick={onMoveDown} disabled={isLast}>
                <ArrowDownward fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Delete block" arrow>
            <IconButton size="small" onClick={onDelete} color="error">
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      {renderBlockContent()}
    </Paper>
  );
};
