import Button from "./button";

const CreateInvoiceButton: React.FC = () => {
  return (
    <div className="w-60 h-90 m-2 bg-stone-200 rounded-xl grid p-4">
      <div className="text-center bg-gradient-to-b from-stone-200 to-gray-100 rounded-sm shadow-xl p-2 font-semibold">
        New Invoice
      </div>
      <div className="align-center text-lg p-5">Create a new invoice</div>

      {/* <div className="flex justify-between items-center px-2 py-1">
        <span className="font-medium ">x</span>
        <span className="text-black font-semibold ">x</span>
      </div> */}

      <Button
        href={`./invoices/newInvoice`}
        aria_label={`Create a new invoice`}
        label="Create"
      />
    </div>
  );
};

export default CreateInvoiceButton;
