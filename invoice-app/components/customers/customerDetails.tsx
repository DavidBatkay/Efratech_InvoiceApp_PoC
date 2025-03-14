import { Button } from "../ui/button";
import Link from "next/link";
import BackButton from "../buttons/backButton";
import CustomerDeleteButton from "./customerDeleteButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Customer = {
  id: number;
  email: string;
  customerName: string;
  createdAt: Date;
};

interface CustomerDetailsProps {
  customer: Customer;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  return (
    <>
      <div className="fixed top-26 left-4 sm:top-36 sm:left-32 z-50 rounded-full shadow-emerald-100 shadow-2xl">
        <BackButton />
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
