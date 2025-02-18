"use client";
import Link from "next/link";

export default function LogoutButton({
  handleLogOut,
}: {
  handleLogOut: () => void;
}) {
  return (
    <Link href="/login">
      <button
        onClick={handleLogOut}
        type="button"
        className="relative inline-flex bg-gradient-to-br from-slate-400 to-slate-300 items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg  px-5 hover:bg-gradient-to-tl hover:from-slate-500 hover:to-slate-600 transition-all duration-100"
      >
        Log Out
      </button>
    </Link>
  );
}
