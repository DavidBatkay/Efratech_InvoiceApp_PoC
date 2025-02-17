"use client";

import Item from "@/components/item";
import { usePathname } from "next/navigation";


const DashBoard: React.FC = () => {
  const path = usePathname();

  return (
    <>
      <span className="bold text-3xl text-white flex flex-col mt-5 justify-center items-center">
        Welcome back !
      </span>
      <div className="bg-gray-400 shadow-md rounded-lg p-4 sm:p-8 md:p-16 mt-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
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
              href={`${path}/customers`}
              description="Manage your customer base"
            >
              Manage Customers
            </Item>
            {/*TODO get only the customers from personal invoices */}
            <Item href={`${path}/users`} description="Manage All Users">
              Manage Users
            </Item>
          </div>
        </div>
      </div>
    </>
  );
};

/*NOTE managing pages not yet done */

export default DashBoard;
