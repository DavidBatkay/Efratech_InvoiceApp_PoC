// CustomerList.tsx
"use client";
import { useEffect, useState } from "react";
import CreateCustomerButton from "./createCustomerButton";
import { useCustomerAPI } from "@/app/api/__calls__/useCustomerAPI";
// adjust this import to your real Table component path
import Table from "../table/Table";
import { MRT_ColumnDef, MRT_SortingState } from "mantine-react-table";

interface Customer {
  id: string;
  customerName: string;
  email: string;
  createdAt: string;
}

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [sorting, setSorting] = useState<MRT_SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const { fetchCustomers } = useCustomerAPI();

  useEffect(() => {
    const handleFetchCustomers = async () => {
      try {
        const currentSort = sorting[0] ?? { id: "createdAt", desc: true };
        const sortBy = currentSort.id as "customerName" | "createdAt";
        const sortOrder = currentSort.desc ? "desc" : "asc";
        const data = await fetchCustomers(sortBy, sortOrder);
        if (data.error) throw new Error(data.error);
        setCustomers(data);
      } catch (error) {
        console.error(error);
      }
    };
    handleFetchCustomers();
  }, [sorting, fetchCustomers]);

  const columns: MRT_ColumnDef<Customer>[] = [
    {
      accessorKey: "customerName",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      Cell: ({ cell }) =>
        new Date(cell.getValue<string>()).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        }),
    },
  ];

  return (
    <Table
      columns={columns}
      data={customers}
      manualSorting
      sorting={sorting}
      onSortingChange={setSorting}
      topToolbarActions={<CreateCustomerButton />}
    />
  );
};

export default CustomerList;
