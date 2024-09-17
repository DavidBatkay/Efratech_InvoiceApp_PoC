"use client";

import Link from "next/link";

const LoginForm: React.FC<{ type?: string }> = ({ type }) => {
  const onSubmit = () => {
    console.log("form submitted!");
  };
  const isSignup = type && type === "signup";
  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
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
