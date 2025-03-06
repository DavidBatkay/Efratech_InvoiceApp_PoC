import CustomerList from "@/components/customers/customerList";

const CustomersPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <CustomerList />
    </div>
  );
};

export default CustomersPage;
