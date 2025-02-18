import Link from "next/link";
import LogoutButton from "./logoutButton";
import Logo from "./logo";
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
        <Logo />
        <div>
          <LogoutButton handleLogOut={handleLogOut} />
          <button>
            <Link href="/user">My Account</Link>
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Header;
