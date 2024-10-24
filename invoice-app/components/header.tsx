import Link from "next/link";
import Image from "next/image";
import imagePath from "../public/favicon.png";
const Header: React.FC = () => {
  return (
    <nav className="fixed w-full h-24 shadow-xl bg-gray-200">
      <div className="flex justify-between items-center w-full h-full px-4 2xl:px-16">
        <Link className="" href="/dashboard">
          <Image
            src={imagePath}
            alt="icon"
            width="80"
            height="80"
            priority
            className="cursor-pointer"
          />
        </Link>

        <div>
          <Link href="/login">
            <button
              type="button"
              className="relative inline-flex bg-gradient-to-br from-slate-400 to-slate-300 items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg  px-5"
            >
              Log Out
            </button>
          </Link>
          <Link href="/user">My Account</Link>
        </div>
      </div>
    </nav>
  );
};
export default Header;
