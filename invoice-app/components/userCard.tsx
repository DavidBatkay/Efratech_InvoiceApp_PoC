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
import { useUserAPI } from "@/app/api/__calls__/useUserAPI";
type User = {
  user_id: number;
  email: string;
  name?: string;
  createdAt?: string;
};

const UserCard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { updateUser, fetchUser } = useUserAPI(); // Get the updateUser function from the hook

  useEffect(() => {
    const handleFetchUser = async () => {
      try {
        const data: User = await fetchUser();
        setUser(data);
        setNewName(data.name || ""); // Set initial name
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    handleFetchUser();
  }, [fetchUser]);

  const handleSave = async () => {
    if (!user) return;
    try {
      await updateUser(newName);
      setUser((prev) => (prev ? { ...prev, name: newName } : null));
      setIsEditing(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); // Set error message from API
        setNewName("");
      } else {
        setError("An unexpected error occurred.");
      }
      setTimeout(() => {
        setError(null);
      }, 2000);
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
                placeholder={error ? error : ""}
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
              <span className="my-2">{user.name || "No Name"}</span>
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
      <div className="flex justify-between">
        <CardContent>
          <p>
            <strong>Joined:</strong>{" "}
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "Unknown"}
          </p>
        </CardContent>
        <CardFooter>
          <p>User #{user.user_id}</p>
        </CardFooter>
      </div>
    </Card>
  );
};

export default UserCard;
