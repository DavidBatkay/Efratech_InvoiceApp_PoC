"use client";

import { useEffect, useState } from "react";
import CustomerCard from "./customerCard";
import { Button } from "@/components/ui/button";
import CreateCustomerButton from "./createCustomerButton";
import { useCustomerAPI } from "@/app/api/__calls__/useCustomerAPI";
interface Customer {
  id: string;
  customerName: string;
  email: string;
  createdAt: string;
}

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [sortBy, setSortBy] = useState<"customerName" | "createdAt">(
    "createdAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const { fetchCustomers } = useCustomerAPI();
  useEffect(() => {
    const handleFetchCustomers = async () => {
      try {
        const data = await fetchCustomers(sortBy, sortOrder);
        if (data.error) throw new Error(data.error);
        setCustomers(data);
      } catch (error) {
        console.error(error);
      }
    };

    handleFetchCustomers();
  }, [sortBy, sortOrder, fetchCustomers]);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <CreateCustomerButton />
        <Button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          variant="outline"
        >
          Order {sortOrder === "asc" ? "Descending" : "Ascending"}
        </Button>
        <Button
          onClick={() =>
            setSortBy(sortBy === "customerName" ? "createdAt" : "customerName")
          }
          variant="outline"
        >
          Sort by {sortBy === "customerName" ? "Newest" : "Name"}
        </Button>
      </div>
      <div className="p-2 border-b grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
