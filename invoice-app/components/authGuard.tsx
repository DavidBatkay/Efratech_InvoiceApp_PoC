"use client"; // This should be the very first line in the file

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Spinner from "./spinner";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to login page if user is not authenticated
    }
  }, [status, router]);
  if (status === "unauthenticated") return null;
  if (status === "loading") {
    return <Spinner />; //NOTE You can customize the loading state
  }

  return <>{children}</>; // Render the protected children if authenticated
};

export default AuthGuard;
