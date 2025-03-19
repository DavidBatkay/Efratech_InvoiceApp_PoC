import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState, useEffect } from "react";
import { Customer } from "@prisma/client";
interface CustomerSelectProps {
  setCustomerId: (id: string) => void;
  selectedCustomerId?: string | null; // Make it optional
  disabled?: boolean; // Allow disabling the select
}

const CustomerSelect: React.FC<CustomerSelectProps> = ({
  setCustomerId,
  selectedCustomerId,
  disabled,
}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(
    selectedCustomerId || null
  );

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("/api/customers");
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  // Sync with prop changes
  useEffect(() => {
    setSelectedCustomer(selectedCustomerId || null);
  }, [selectedCustomerId]);

  const handleSelectChange = (customerId: string) => {
    setSelectedCustomer(customerId);
    setCustomerId(customerId);
  };

  return (
    <Select onValueChange={handleSelectChange} disabled={disabled}>
      <SelectTrigger className="w-full border rounded-lg px-4 py-2">
        <SelectValue
          placeholder={
            selectedCustomer
              ? customers.find((c) => c.id.toString() === selectedCustomer)
                  ?.customerName
              : "Select a Customer"
          }
        />
      </SelectTrigger>
      <SelectContent>
        {customers.map((customer) => (
          <SelectItem key={customer.id} value={customer.id.toString()}>
            {customer.customerName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomerSelect;
