// CustomerList.tsx
"use client";
import { useEffect, useState } from "react";
import CreateCustomerButton from "./createCustomerButton";
import { useCustomerAPI } from "@/app/api/__calls__/useCustomerAPI";
import Table from "../table/Table";
import { MRT_SortingState } from "material-react-table";

import { customerSchema, type Customer } from "./schema/customer";
import { Button } from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "next/link";

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[] | undefined>(undefined);

  const [sorting, setSorting] = useState<MRT_SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const pathname = usePathname();
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
        setCustomers([]); // Stop loading state on error
      }
    };
    handleFetchCustomers();
  }, [sorting, fetchCustomers]);

  return (
    <Table
      title="Customers"
      schema={customerSchema.fields}
      data={customers}
      manualSorting={true}
      sorting={sorting}
      onSortingChange={setSorting}
      actions={(row) => (
        <Button component={Link} href={`${pathname}/${row.id}`}>
          View
        </Button>
      )}
      topToolbarActions={<CreateCustomerButton />}
    />
  );
};

export default CustomerList;
