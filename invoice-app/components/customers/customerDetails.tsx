import Button from "../buttons/button";

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
    <div className="w-60 h-90 m-2 bg-white rounded-xl grid p-4">
      <div className="text-center bg-gradient-to-b from-white to-stone-100 rounded-sm shadow-xl p-2 font-semibold">
        {customer.customerName}
      </div>
      <Button
        href={`./customers/${customer.id}`}
        aria_label={`View details for customer ${customer.id}`}
        label="Details"
      />
    </div>
  );
};

export default CustomerDetails;
