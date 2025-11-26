"use client";

import {
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TablePagination,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MouseEvent, useState } from "react";

export type ColumnType = "text" | "avatar" | "chip" | "date";

export interface Column<T> {
  label: string;
  key: keyof T;
  type: ColumnType;
}

export interface TableAction {
  label: string;
  action: string; // "view" | "edit" | "delete"
}

interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[];
  rows: T[];
  actions: TableAction[];

  // NEW MODAL CALLBACKS
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function DataTable<T extends { id: string }>({
  columns,
  rows,
  actions,
  onView,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const openMenu = (event: MouseEvent<HTMLElement>, row: T) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleAction = (type: string, id: string) => {
    console.log("Action triggered:", type, id); // debugging

    switch (type) {
      case "view":
        onView?.(id);
        break;

      case "edit":
        onEdit?.(id);
        break;

      case "delete":
        onDelete?.(id);
        break;

      default:
        console.warn("Unknown action:", type);
    }
  };

  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const renderCell = (type: ColumnType, value: unknown) => {
    switch (type) {
      case "avatar":
        return <Avatar src={(value as string) || undefined} />;
      case "chip":
        return <Chip size="small" label={String(value)} />;
      case "date":
        return new Date(String(value)).toLocaleDateString();
      default:
        return String(value);
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={String(col.key)}>{col.label}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow hover key={row.id}>
                {columns.map((col) => (
                  <TableCell key={String(col.key)}>
                    {renderCell(col.type, row[col.key])}
                  </TableCell>
                ))}

                <TableCell>
                  <IconButton onClick={(e) => openMenu(e, row)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        disableScrollLock
        onClose={closeMenu}
      >
        {actions.map((action) => (
          <MenuItem
            key={action.action}
            onClick={() => {
              if (selectedRow) handleAction(action.action, selectedRow.id);
              closeMenu();
            }}
          >
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </Paper>
  );
}
