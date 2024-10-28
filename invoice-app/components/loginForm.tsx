"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const LoginForm: React.FC<{ type?: string }> = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Call the signIn function with credentials
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    console.log(result);
    // Check if there was an error
    if (result?.error) {
      setError("Invalid email or password");
      console.error("Login Error: ", result.error);
    } else {
      // Successful login
      console.log("Login successful!", result);
      // Optionally, redirect to another page
    }
  };
  const isSignup = type && type === "signup";
  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
          />
        </div>
        {isSignup && (
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
            />
          </div>
        )}
        <div className="flex items-center justify-between">
          <Link href={isSignup ? "/login" : "/dashboard"}>
            <button
              type="button"
              className="text-white bg-blue-400 dark:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-600 hover:dark:bg-blue-700"
            >
              {isSignup ? "Sign up" : "Log In"}
            </button>
          </Link>

          <Link
            className="opacity-55 hover:text-gray-600"
            href={isSignup ? "/login" : "/signup"}
          >
            {isSignup ? "Log in" : "Sign up"} instead?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
