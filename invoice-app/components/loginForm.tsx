"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    console.log("Email:", e.target.value); // Log email change
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log("Password:", e.target.value); // Log password change
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(email, password);
    // Call the signIn function with credentials
    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    console.log("SignIn result:", result); // Log the result to check response

    // Check if there was an error
    if (result?.error) {
      setError("Invalid email or password");
      console.error("Login Error: ", result.error);
    } else {
      // Successful login
      console.log("Login successful!", result);
      // Optionally, redirect to another page
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={(e) => handleSubmit(e)}
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
            type="email"
            value={email} // Set value to state
            onChange={(e) => handleEmailChange(e)}
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
            value={password} // Set value to state
            onChange={(e) => handlePasswordChange(e)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit" // Change to submit button
            className="text-white bg-blue-400 dark:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-600 hover:dark:bg-blue-700"
          >
            {"Log In"}
          </button>
          <Link className="opacity-55 hover:text-gray-600" href={"/signup"}>
            {"Sign up"} instead?
          </Link>
        </div>
      </form>
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Display error if any */}
    </div>
  );
};

export default LoginForm;
