"use client";

import Item from "@/components/item";
import { usePathname } from "next/navigation";

const DashBoard: React.FC = () => {
  const path = usePathname();
  return (
    <div className="bg-gray-100 p-4 sm:p-8 md:p-16 mt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Item
            href={`${path}/invoices`}
            description="See all your Invoices or create a new one"
          >
            Invoices
          </Item>
          <Item
            href={`${path}/payments`}
            description="Check your pending payments"
          >
            Payments
          </Item>
          <Item
            href={`${path}/dashboard`}
            description="Manage your customer base"
          >
            Manage Customers
          </Item>

          <Item href={`${path}/dashboard`} description="Manage All Users">
            Manage Users
          </Item>
        </div>
      </div>
    </div>
  );
};

/*NOTE managing pages not yet done */
export default DashBoard;
