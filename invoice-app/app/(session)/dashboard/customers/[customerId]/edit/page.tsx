import CustomerEditForm from "@/components/customers/customerEditForm";
import { notFound } from "next/navigation";
import { fetchCustomer } from "../page";
const EditCustomerPage = async ({
  params,
}: {
  params: { customerId: string };
}) => {
  const customer = await fetchCustomer(params.customerId);
  if (!customer) notFound();

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <CustomerEditForm customer={customer} />
    </div>
  );
};

export default EditCustomerPage;
