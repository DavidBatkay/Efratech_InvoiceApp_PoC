"use client";

import Menu from "@/components/dashboard/menu";
import { useEffect, useState } from "react";
import Statistics from "@/components/dashboard/statistics";
type User = {
  user_id: string;
  name?: string;
};

const DashBoard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) throw new Error("Failed to fetch user");

        const data: User = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <span className="md:text-3xl text-xl text-white flex mt-5 justify-center items-center gap-2">
        <p>Welcome back</p> <strong>{user?.name || ""}</strong>
        <p>!</p>
      </span>
      <div className="mt-4 mx-auto max-w-5xl">
        <Statistics />
      </div>
      <div className="bg-gray-400 shadow-md rounded-lg p-4 sm:p-8 md:p-16 mt-14">
        <div className="container mx-auto">
          <Menu />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
