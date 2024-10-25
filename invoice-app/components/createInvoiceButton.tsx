import Link from "next/link";

const CreateInvoiceButton: React.FC = () => {
  return (
    <div className="w-60 h-90 m-2 bg-stone-200 rounded-xl grid p-4">
      <div className="text-center bg-gradient-to-b from-stone-200 to-gray-100 rounded-sm shadow-xl p-2 font-semibold">
        New Invoice
      </div>
      <div className="align-top text-lg p-5">Create a new invoice</div>

      <Link
        href={`./invoices/newInvoice`}
        aria-label={`Create a new invoice`}
        className="bg-gradient-to-br from-blue-400 to-blue-600 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded-md mt-4"
      >
        Create
      </Link>
    </div>
  );
};

export default CreateInvoiceButton;
