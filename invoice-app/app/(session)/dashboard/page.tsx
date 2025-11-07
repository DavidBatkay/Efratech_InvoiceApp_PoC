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
    <div className="flex flex-col items-center mt-5 text-white">
      {/* Welcome */}
      <span className="md:text-3xl text-xl flex justify-center items-center gap-2">
        <p>Welcome back</p> <strong>{user?.name || ""}</strong>
        <p>!</p>
      </span>

      {/* Main Layout */}
      <div className="mt-8 flex w-full max-w-7xl gap-6 px-4">
        {/* Left (Main Content) */}
        <div className="flex-1">
          <div className="bg-gray-900/60 shadow-xl rounded-2xl p-6 sm:p-10 backdrop-blur-md border border-white/10">
            <div className="container mx-auto">
              <Menu />
            </div>
          </div>
        </div>

        {/* Right Sidebar (Statistics) */}
        <aside className="hidden lg:block w-72">
          <div className="bg-gray-900/60 shadow-xl rounded-2xl p-5 backdrop-blur-md border border-white/10 h-fit">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">
              Statistics
            </h3>
            <Statistics compact />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashBoard;
