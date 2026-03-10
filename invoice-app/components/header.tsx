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
    <nav className="fixed w-full h-20 border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-md z-50">
      <div className="flex justify-between items-center w-full h-full px-6 2xl:px-16">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo />
          <span className="text-2xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
            ModuFlow
          </span>
        </Link>

        <div className="flex items-center gap-x-6 h-full">
          <Link
            href="/user"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center"
          >
            My Account
          </Link>

          <div className="h-5 w-[1px] bg-white/20 self-center" />

          <div className="flex items-center justify-center">
            <LogoutButton handleLogOut={handleLogOut} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
