"use client";

import { useEffect, useState } from "react";
import Button from "@/components/buttons/button";
import { useUserAPI } from "@/app/api/__calls__/useUserAPI";

type User = {
  user_id: number;
  name?: string;
  email: string;
  createdAt?: string;
};

const UsersList: React.FC = () => {
  const { fetchUsers } = useUserAPI();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [sortBy, setSortBy] = useState<"email" | "createdAt">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers(search, sortBy, sortOrder);
      setUsers(data);
    };

    getUsers();
  }, [search, sortBy, sortOrder, fetchUsers]);

  return (
    <div className="flex flex-col min-h-screen items-center p-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full max-w-md"
      />

      {/* Sorting Controls */}
      <div className="flex gap-4 mb-4">
        <Button
          aria_label=""
          fromColor="from-blue-400"
          toColor="to-blue-600"
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          label={`Sort by ${sortBy === "createdAt" ? "Join Date" : "Email"} (${
            sortOrder === "desc" ? "↓" : "↑"
          })`}
        />
        <Button
          aria_label=""
          fromColor="from-gray-300"
          toColor="to-gray-400"
          onClick={() =>
            setSortBy(sortBy === "createdAt" ? "email" : "createdAt")
          }
          label={`Sort by ${sortBy === "createdAt" ? "Email" : "Join Date"}`}
        />
      </div>

      {/* User Cards */}
      <div className="grid-cols-1 m-4 gap-4 w-3/5">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.user_id}
              className="flex justify-between items-center border p-4 m-4 rounded-md shadow-md bg-white w-full"
            >
              <p className="font-semibold">{user.email}</p>
              <p className="font-semibold">{user.name}</p>
              {user.createdAt && (
                <p className="text-gray-500 text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UsersList;
