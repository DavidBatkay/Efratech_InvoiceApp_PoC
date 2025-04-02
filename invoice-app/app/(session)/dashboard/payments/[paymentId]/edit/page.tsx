import PaymentFormEdit from "@/components/paymentFormEdit";

const PaymentEditPage = async ({
  params,
}: {
  params: { paymentId: string };
}) => {
  return (
    <div className="relative p-4">
      <PaymentFormEdit paymentId={params.paymentId} />
    </div>
  );
};

export default PaymentEditPage;
