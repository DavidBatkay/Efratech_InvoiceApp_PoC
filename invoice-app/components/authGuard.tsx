"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Spinner from "./spinner";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const pathname = usePathname(); // ✅ Get current route
  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/login") {
      router.replace("/login"); // ✅ Avoid unnecessary redirects
    }
  }, [status, pathname, router]);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated" && pathname !== "/login") {
      setChecking(true);
      setTimeout(() => {
        router.replace("/login");
      }, 500); // Small delay to avoid race conditions
    } else {
      setChecking(false);
    }
  }, [status, pathname, router]);
  if (status === "loading") return <Spinner />;

  return <>{children}</>;
};

export default AuthGuard;
