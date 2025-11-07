import { ColumnDef } from "@tanstack/react-table";

export interface Customer {
  id: string;
  customerName: string;
  email: string;
  createdAt: string;
}

export const customerColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: "customerName",
    header: "Name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
  },
];
