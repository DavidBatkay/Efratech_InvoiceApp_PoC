"use client";
import { Button } from "../ui/button";
import Link from "next/link";
import CustomerDeleteButton from "./customerDeleteButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BackButtonCustomer from "../buttons/backButtonCustomer";
import { useEffect, useState } from "react";
import { useCustomerAPI } from "@/app/api/__calls__/useCustomerAPI";

type Customer = {
  id: number;
  email: string;
  customerName: string;
  createdAt: Date;
};

const CustomerDetails: React.FC<{ customerId: string }> = ({ customerId }) => {
  const { fetchCustomer } = useCustomerAPI();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleFetchCustomer = async () => {
      setLoading(true);
      const data = await fetchCustomer(Number(customerId));

      if (data.error) {
        setError("Failed to load customer");
      } else {
        setCustomer(data);
      }
      setLoading(false);
    };

    handleFetchCustomer();
  }, [customerId, fetchCustomer]);

  if (loading) return <p>Loading...</p>;
  if (error || !customer) return <p>{error || "Customer not found"}</p>;

  return (
    <>
      <div className="fixed top-26 left-4 sm:top-36 sm:left-32 z-50 rounded-full shadow-emerald-100 shadow-2xl">
        <BackButtonCustomer />
      </div>
      <Card className="w-72 bg-white shadow-lg rounded-xl p-6 transition-transform hover:scale-105">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            {customer.customerName}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {customer.email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-sm">
            <strong>Created:</strong>{" "}
            {customer.createdAt
              ? new Date(customer.createdAt).toLocaleDateString()
              : "Unknown"}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between items-center mt-4">
          <div className="flex gap-2">
            <p className="text-gray-500 text-sm">Customer #{customer.id}</p>

            <Link href={`/dashboard/customers/${customer.id}/edit`}>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </Link>
            <CustomerDeleteButton customerId={customer.id} />
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default CustomerDetails;
