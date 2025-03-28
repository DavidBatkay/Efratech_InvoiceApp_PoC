import InvoiceEdit from "@/components/invoiceEdit";
const InvoiceEditPage = async ({
  params,
}: {
  params: { invoiceId: string };
}) => {
  return (
    <div className="relative p-4">
      <InvoiceEdit invoiceId={params.invoiceId} />
    </div>
  );
};

export default InvoiceEditPage;
