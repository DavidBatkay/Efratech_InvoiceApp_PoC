import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import PaymentFormEdit from "@/components/paymentFormEdit";

const PaymentEditPage = async ({
  params,
}: {
  params: { paymentId: string };
}) => {
  const paymentId = Number(params.paymentId);
  if (isNaN(paymentId)) notFound();

  const payment = await prisma.payment.findFirst({
    where: { id: paymentId },
  });

  if (!payment) notFound();

  return (
    <div className="relative p-4">
      <PaymentFormEdit payment={payment} />
    </div>
  );
};

export default PaymentEditPage;
