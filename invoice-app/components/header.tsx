import Link from "next/link";
import Image from "next/image";
import imagePath from "../public/favicon.png";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
const Header: React.FC = () => {
  const router = useRouter();
  const handleLogOut = async () => {
    await signOut({ redirect: false });
    router.refresh();
  };

  return (
    <nav className="fixed w-full h-24 shadow-2xl bg-gradient-to-b from-gray-200 to-gray-300 z-50">
      <div className="flex justify-between items-center w-full h-full px-4 2xl:px-16">
        <div className="flex ">
          <Link href="/dashboard">
            <Image
              src={imagePath}
              alt="icon"
              width="80"
              height="80"
              priority
              className="cursor-pointer"
            />
          </Link>
        </div>
        <div>
          <Link href="/login">
            <button
              onClick={handleLogOut}
              type="button"
              className="relative inline-flex bg-gradient-to-br from-slate-400 to-slate-300 items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg  px-5"
            >
              Log Out
            </button>
          </Link>
          <button>
            <Link href="/user">My Account</Link>
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Header;
