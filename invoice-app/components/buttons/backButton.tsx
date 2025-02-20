"use client";

import Link from "next/link";
import Image from "next/image";
const BackButton = () => {
  const previous = sessionStorage.getItem("previousPage");
  return (
    <div className="fixed top-26 left-4 sm:top-36 sm:left-32 z-50 rounded-full shadow-emerald-100 shadow-2xl">
      <Link href={`/dashboard/${previous}`}>
        <Image
          className="bg-slate-200 rounded-full p-1"
          src="https://cdn-icons-png.flaticon.com/512/3545/3545314.png"
          alt="Back"
          width={40}
          height={40}
        />
      </Link>
    </div>
  );
};

export default BackButton;
