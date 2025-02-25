"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Spinner from "./spinner";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname(); // ✅ Get current route

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/login") {
      router.replace("/login"); // ✅ Avoid unnecessary redirects
    }
  }, [status, pathname, router]);

  if (status === "unauthenticated") return null;
  if (status === "loading") return <Spinner />;

  return <>{children}</>;
};

export default AuthGuard;
