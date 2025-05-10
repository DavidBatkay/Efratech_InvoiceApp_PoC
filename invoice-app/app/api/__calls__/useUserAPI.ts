import { useCallback } from "react";
type User = {
  user_id: number;
  name?: string;
  email: string;
  createdAt?: string;
};
export function useUserAPI() {
  const fetchUsers = useCallback(
    async (search: string, sortBy: string, sortOrder: string) => {
      const url = `/api/users?email=${encodeURIComponent(
        search
      )}&sortBy=${sortBy}&order=${sortOrder}`;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch users");

        const data: User[] = await res.json();
        return data;
      } catch (error) {
        throw error;
      }
    },
    []
  );
  const updateUser = useCallback(async (newName: string) => {
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });

      if (!res.ok) throw new Error("Failed to update user");

      const data = await res.json();
      return data; // Return the updated user data or success message
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("/api/user");
      if (!res.ok) throw new Error("Failed to fetch user");

      const data: User = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }, []);

  const createUser = useCallback(
    async (email: string, password: string, name?: string) => {
      try {
        const res = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, name }),
        });

        if (!res.ok) {
          const { error } = await res.json();
          throw new Error(error || "Failed to create user");
        }

        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    },
    []
  );

  return { createUser, fetchUsers, updateUser, fetchUser };
}
