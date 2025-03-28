import InvoiceDetails from "@/components/invoiceDetails";
const InvoiceIdPage = async ({ params }: { params: { invoiceId: string } }) => {
  return (
    <div className="relative p-4">
      {/* Invoice Details */}
      <InvoiceDetails invoiceId={params.invoiceId} />
    </div>
  );
};

export default InvoiceIdPage;
