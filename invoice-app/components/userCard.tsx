"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type User = {
  user_id: string;
  email: string;
  name?: string;
  createdAt?: string;
};

const UserCard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) throw new Error("Failed to fetch user");

        const data: User = await res.json();
        setUser(data);
        setNewName(data.name || ""); // Set initial name
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });

      if (!res.ok) throw new Error("Failed to update username");

      setUser((prev) => (prev ? { ...prev, name: newName } : null));
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <h1 className="text-white">Loading...</h1>;
  if (!user) return <p>User not found.</p>;

  return (
    <Card
      className={`${
        isEditing ? "border-4 border-white" : ""
      } md:w-2/5 w-5/6 p-4 shadow-md transition-all duration-2000`}
    >
      <CardHeader>
        <CardTitle>
          {isEditing ? (
            <div className="md:flex grid grid-cols-1 gap-2 items-center max-h-15">
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className="md:flex grid grid-cols-1 justify-between items-center md:max-h-15 max-h-15">
              <span>{user.name || "No Name"}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                Edit User Name
              </Button>
            </div>
          )}
        </CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Joined:</strong>{" "}
          {user.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : "Unknown"}
        </p>
      </CardContent>
      <CardFooter>
        <p>User ID: {user.user_id}</p>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
