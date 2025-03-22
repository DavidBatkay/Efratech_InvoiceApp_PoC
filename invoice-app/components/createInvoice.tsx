import Button from "./buttons/button";

const CreateInvoiceButton: React.FC = () => {
  return (
    <div className="w-60 h-90 m-2 bg-white rounded-xl flex flex-col p-4">
      <div className="text-center bg-gradient-to-b from-white to-stone-100 rounded-sm shadow-xl p-2 font-semibold">
        New Invoice
      </div>

      <div className="flex-grow flex items-center justify-center text-center text-lg">
        <strong>
          Create <br /> new invoice
        </strong>
      </div>

      {/* Wrapper div to ensure button alignment and spacing */}
      <div className="mt-auto flex justify-center">
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
