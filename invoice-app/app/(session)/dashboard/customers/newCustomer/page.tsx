import CustomerCreateForm from "@/components/customers/customerCreateForm";
const NewCustomerPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <CustomerCreateForm />
    </div>
  );
};

export default NewCustomerPage;
