"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const NotFoundPage = () => {
  const params = useParams();
  const invoiceId = params?.invoiceId ? Number(params.invoiceId) : null;

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gradient-to-br from-slate-500 to-slate-700">
      <h1 className="text-red-900 p-5 text-3xl text-center">
        Invoice Not Found!
      </h1>
      <p>{"Could not find the requested invoice."}</p>

      {invoiceId && typeof invoiceId == "number" ? (
        <p className="text-xs">{`Invoice with ID ${invoiceId} might have been deleted or never existed.`}</p>
      ) : (
        <p className="text-xs">{`Invoice ID does not correspond to any of your invoices.`}</p>
      )}
      <Link
        className="p-2 bg-black text-white rounded-md"
        href="/dashboard/invoices"
      >
        Return to Invoices
      </Link>
    </div>
  );
};

export default NotFoundPage;
