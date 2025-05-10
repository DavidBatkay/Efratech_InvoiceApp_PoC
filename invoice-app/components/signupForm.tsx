"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useUserAPI } from "@/app/api/__calls__/useUserAPI";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { createUser } = useUserAPI();
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Check if there was an error
    if (confirmPassword !== password || !email.includes("@")) {
      setError("password and confirm password fields are not valid");
      console.error("Signup Error: ", error);
    } else {
      try {
        const encryptedPassword = await bcrypt.hash(password, 10);
        await createUser(email, encryptedPassword);
        //NOTE No error = Successful login

        setSuccess(true);

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } catch (error) {
        setError("Something went wrong!");
      }
    }
  };

  return (
    <div className="w-full max-w-xs">
      {success ? (
        <div className="bg-white shadow-md flex items-center justify-center rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-center">Account created successfully!</h1>
        </div>
      ) : (
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
          <div className="mb-4">
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
              value={confirmPassword} // Set value to state
              onChange={(e) => handleConfirmPasswordChange(e)}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit" // Change to submit button
              className="text-white bg-blue-400 dark:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-600 hover:dark:bg-blue-700"
            >
              Sign up
            </button>
            <Link className="opacity-55 hover:text-gray-600" href={"/login"}>
              {"Log in"} instead?
            </Link>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {/* Display error if any */}
        </form>
      )}
    </div>
  );
};

export default SignupForm;
