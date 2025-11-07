// Table.tsx
"use client";
import React from "react";
import {
  MantineReactTable,
  MRT_ColumnDef,
  type MRT_SortingState,
  type MRT_TableOptions,
  type MRT_Cell,
  type MRT_Row,
  type MRT_TableInstance,
} from "mantine-react-table";
import { MantineProvider, Button } from "@mantine/core";
import Link from "next/link";

interface TableProps<T extends Record<string, any>> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  title?: string;
  enableRowActions?: boolean;
  renderRowActions?: (props: {
    cell: MRT_Cell<T>;
    row: MRT_Row<T>;
    table: MRT_TableInstance<T>;
  }) => React.ReactNode;
  topToolbarActions?: React.ReactNode;
  manualSorting?: boolean;
  sorting?: MRT_SortingState;
  onSortingChange?: MRT_TableOptions<T>["onSortingChange"];
}

export default function Table<T extends Record<string, any>>({
  columns,
  data,
  title,
  enableRowActions = true,
  renderRowActions,
  topToolbarActions,
  manualSorting = false,
  sorting,
  onSortingChange,
}: TableProps<T>) {
  const defaultRenderRowActions = ({ row }: { row: MRT_Row<T> }) => {
    const pathname = window.location.pathname.replace(/\/$/, "");
    return (
      <Button
        component={Link}
        href={`${pathname}/${row.original.id}`}
        variant="subtle"
      >
        View
      </Button>
    );
  };

  return (
    <MantineProvider>
      <div>
        {title && <h2 className="text-xl mb-4">{title}</h2>}
        <MantineReactTable<T>
          columns={columns}
          data={data}
          enableColumnFilters
          enableGlobalFilter
          enableSorting
          enablePagination
          enableRowActions={enableRowActions}
          enableColumnActions
          positionActionsColumn="last"
          renderRowActions={renderRowActions ?? defaultRenderRowActions}
          renderTopToolbarCustomActions={() => topToolbarActions}
          initialState={{
            pagination: { pageSize: 10, pageIndex: 0 },
          }}
          state={{
            sorting,
          }}
          manualSorting={manualSorting}
          onSortingChange={onSortingChange}
        />
      </div>
    </MantineProvider>
  );
}
