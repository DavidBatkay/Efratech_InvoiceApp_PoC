import Button from "../buttons/button";

const CreateCustomerButton: React.FC = () => {
  return (
    <div className="w-64 bg-white rounded-lg shadow-md flex flex-col items-center p-6 gap-4 border border-gray-200">
      <div className="text-lg font-semibold text-gray-700">New Customer</div>

      <p className="text-center text-gray-600 leading-tight">
        Create a new <br /> customer profile
      </p>

      <Button
        href="/customers/newCustomer"
        aria_label="Create a new Customer"
        label="Create"
      />
    </div>
  );
};

export default CreateCustomerButton;
