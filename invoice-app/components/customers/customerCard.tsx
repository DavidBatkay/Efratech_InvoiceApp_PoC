"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "../buttons/button";

type Customer = {
  id: string;
  customerName: string;
  email: string;
  createdAt: string;
};

interface CustomerComponentProps {
  customer: Customer;
}

const CustomerCard: React.FC<CustomerComponentProps> = ({ customer }) => {
  const handleClick = () => {
    sessionStorage.setItem("previousPageCustomer", "customers");
  };

  return (
    <Card className="p-4 shadow-md transition-all duration-200">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{customer.customerName}</span>
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <div className="flex justify-between gap-2">
          <p className="text-gray-500 text-center py-5">
            Customer #{customer.id}
          </p>
          <button onClick={handleClick}>
            <Button
              href={`./customers/${customer.id}`}
              aria_label={`View details for customer ${customer.id}`}
              label="Details"
            />
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CustomerCard;
