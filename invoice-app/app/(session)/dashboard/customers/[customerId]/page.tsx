import CustomerDetails from "@/components/customers/customerDetails";
const CustomerIdPage = async ({
  params,
}: {
  params: { customerId: string };
}) => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <CustomerDetails customerId={params.customerId} />
    </div>
  );
};
export default CustomerIdPage;
