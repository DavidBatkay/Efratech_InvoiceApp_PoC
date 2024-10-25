import InvoiceForm from "@/components/invoiceForm";
import { createInvoice } from "@/dao/invoice.dao";
const NewInvoicePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <InvoiceForm />
    </div>
  );
};

export default NewInvoicePage;
