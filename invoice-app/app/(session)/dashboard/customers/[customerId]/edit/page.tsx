import CustomerEditForm from "@/components/customers/customerEditForm";
const EditCustomerPage = async ({
  params,
}: {
  params: { customerId: string };
}) => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <CustomerEditForm customerId={params.customerId} />
    </div>
  );
};

export default EditCustomerPage;
