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
  action: string;
}

interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[];
  rows: T[];
  actions: TableAction[];
}

// --------------------------------------------------------------------

export default function DataTable<T extends { id: string }>({
  columns,
  rows,
  actions,
}: DataTableProps<T>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  const openMenu = (event: MouseEvent<HTMLElement>, row: T) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const renderCell = (type: ColumnType, value: unknown) => {
    switch (type) {
      case "avatar":
        return <Avatar src={(value as string) || undefined} />;
      case "chip":
        return <Chip size="small" label={String(value)} />;
      case "date":
        return new Date(value as string).toLocaleDateString();
      default:
        return String(value);
    }
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={String(col.key)}>{col.label}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((col) => (
                <TableCell key={String(col.key)}>
                  {renderCell(
                    col.type,
                    row[col.key] ?? (col.key === "id" ? row.id : undefined)
                  )}
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

      {/* ACTION MENU */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        {actions.map((action) => (
          <MenuItem
            key={action.action}
            onClick={() => {
              if (selectedRow) console.log(action.action, selectedRow.id);
              closeMenu();
            }}
          >
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
