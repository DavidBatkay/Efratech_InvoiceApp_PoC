"use client";

import Menu from "@/components/dashboard/menu";
import { useEffect, useState } from "react";
import Statistics from "@/components/dashboard/statistics";
import { useUserAPI } from "@/app/api/__calls__/useUserAPI";
type User = {
  user_id: number;
  name?: string;
};

const DashBoard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const { fetchUser } = useUserAPI();
  useEffect(() => {
    const handleFetchUser = async () => {
      try {
        const data: User = await fetchUser();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    handleFetchUser();
  }, [fetchUser]);

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
