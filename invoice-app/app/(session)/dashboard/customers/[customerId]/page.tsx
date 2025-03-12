import CustomerDetails from "@/components/customers/customerDetails";
import { notFound } from "next/navigation";
import { getCustomerById } from "@/dao/customer.dao";
const CustomerIdPage = async ({
  params,
}: {
  params: { customerId: string };
}) => {
  const customer = await fetchCustomer(params.customerId);
  if (!customer) notFound();
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <CustomerDetails customer={customer} />
    </div>
  );
};
export const fetchCustomer = async (customerIdParam: string) => {
  const customerId = Number(customerIdParam);
  if (isNaN(customerId)) return null;
  return await getCustomerById(customerId);
};
export default CustomerIdPage;
