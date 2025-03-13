"use client";

import { useEffect, useState } from "react";
import CustomerCard from "./customerCard";
import { Button } from "@/components/ui/button";
import CreateCustomerButton from "./createCustomerButton";
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

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch(
          `/api/customers?orderBy=${sortBy}&order=${sortOrder}`
        );
        if (!res.ok) throw new Error("Failed to fetch customers");
        const data = await res.json();
        setCustomers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomers();
  }, [sortBy, sortOrder]);

  return (
    <div>
      <div className="flex gap-2 mb-4">
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
        <CreateCustomerButton />
        {customers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
