import Button from "./buttons/button";

const CreateInvoiceButton: React.FC = () => {
  return (
    <div className="w-60 h-90 m-2 bg-white rounded-xl grid p-4">
      <div className="text-center bg-gradient-to-b from-white to-stone-100 rounded-sm shadow-xl p-2 font-semibold">
        New Invoice
      </div>
      <div className="align-center text-center text-lg p-5">
        <strong>Create a new invoice</strong>
      </div>

      <div className="">
        <Button
          href={`./invoices/newInvoice`}
          aria_label={`Create a new invoice`}
          label="Create"
        />
      </div>
    </div>
  );
};

export default CreateInvoiceButton;
