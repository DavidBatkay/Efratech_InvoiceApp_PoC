import Button from "./button";
const EditButton: React.FC<{ invoiceId: number }> = ({ invoiceId }) => {
  return (
    <>
      <Button
        href={`/dashboard/invoices/${invoiceId}/edit`}
        aria_label="Edit invoice"
        label="Edit"
        fromColor="from-amber-400"
        toColor="to-amber-600"
      />
    </>
  );
};

export default EditButton;
