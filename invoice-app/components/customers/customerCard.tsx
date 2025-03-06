"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  return (
    <Card className="p-4 shadow-md transition-all duration-200">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{customer.customerName}</span>
        </CardTitle>
        <CardDescription>{customer.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Joined:</strong>{" "}
          {customer.createdAt
            ? new Date(customer.createdAt).toLocaleDateString()
            : "Unknown"}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between">
          <p className="text-gray-500">Customer #{customer.id}</p>
          <Link href={`/dashboard/customers/${customer.id}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CustomerCard;
