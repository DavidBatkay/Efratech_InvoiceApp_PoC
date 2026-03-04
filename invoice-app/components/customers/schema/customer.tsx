import { Schema } from "@/app/helpers/newSchema";

export interface Customer {
  id: string;
  customerName: string;
  email: string;
  createdAt: string;
}

export const customerSchema = new Schema<Customer>([
  {
    dataIndex: "customerName",
    title: "Name",
  },
  {
    dataIndex: "email",
    title: "Email",
    enableSorting: false,
  },
  {
    dataIndex: "createdAt",
    title: "Created",
    type: "date",
    // render: (row) =>
    //   new Date(row.createdAt).toLocaleString(undefined, {
    //     dateStyle: "medium",
    //     timeStyle: "short",
    //   }),
  },
]);
