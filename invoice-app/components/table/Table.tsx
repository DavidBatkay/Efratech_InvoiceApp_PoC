"use client";

import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Box, Typography, Stack } from "@mui/material";
import { SchemaField } from "@/app/helpers/newSchema";

interface GeneralTableProps<T extends Record<string, any>> {
  data: T[] | undefined;
  schema: SchemaField<T>[];
  title?: string;
  enableRowSelection?: boolean;
  actions?: (row: T) => React.ReactNode;
  topToolbarActions?: React.ReactNode;
  manualSorting?: boolean;
  sorting?: import("material-react-table").MRT_SortingState;
  onSortingChange?: import("material-react-table").MRT_TableOptions<T>["onSortingChange"];
}

export default function Table<T extends Record<string, any>>({
  data,
  schema,
  title,
  enableRowSelection = false,
  actions,
  topToolbarActions,
  manualSorting,
  sorting,
  onSortingChange,
}: GeneralTableProps<T>) {
  // --- 1. Schema to Column Transformation ---
  const columns = useMemo<MRT_ColumnDef<T>[]>(() => {
    const generatedCols: MRT_ColumnDef<T>[] = schema
      .filter((field) => field.showInTable !== false) // Keep if true or undefined
      .map((field) => ({
        accessorKey: field.dataIndex,
        header: field.title,
        enableSorting: field.enableSorting !== false,
        // Handle custom rendering or basic data types based on schema
        Cell: ({ row }) => {
          if (field.render) return field.render(row.original);

          const value = row.original[field.dataIndex];

          if (field.type === "boolean") {
            return value ? "Yes" : "No";
          }
          if (field.type === "date" && value) {
            return new Date(value as string).toLocaleDateString();
          }

          return value as React.ReactNode;
        },
      }));

    // --- 2. Actions Column Injection ---
    if (actions) {
      generatedCols.push({
        id: "mrt-row-actions",
        header: "Actions",
        enableSorting: false,
        enableColumnFilter: false,
        size: 100,
        Cell: ({ row }) => <Box>{actions(row.original)}</Box>,
      });
    }

    return generatedCols;
  }, [schema, actions]);

  // --- 3. MRT Table Initialization ---
  const table = useMaterialReactTable({
    columns,
    data: data ?? [],
    manualSorting: manualSorting, // Add this
    onSortingChange: onSortingChange, // Add this
    state: {
      isLoading: data === undefined,
      showSkeletons: data === undefined,
      sorting: sorting, // Add this
    },
    // Core features (enabled by default in this clean version)
    enableRowSelection,
    enableGlobalFilter: true,
    enableColumnFilters: true,
    enableSorting: true,
    enablePagination: true,
    enableDensityToggle: true,
    enableFullScreenToggle: true,
    enableHiding: true,

    // Toolbar customization
    renderTopToolbarCustomActions: () => (
      <Stack direction="row" spacing={2} alignItems="center" sx={{ p: "4px" }}>
        {title && (
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
        )}
        {topToolbarActions}
      </Stack>
    ),

    // Clean defaults
    initialState: {
      density: "compact",
      pagination: { pageIndex: 0, pageSize: 25 },
    },

    // Styling matches the general aesthetic of your original
    muiTablePaperProps: {
      elevation: 0,
      sx: { border: "1px solid #e0e0e0", borderRadius: "8px" },
    },
    muiTableHeadCellProps: {
      sx: { fontWeight: 600, backgroundColor: "#fafafa" },
    },
  });

  return (
    <Box sx={{ width: "100%" }}>
      <MaterialReactTable table={table} />
    </Box>
  );
}
