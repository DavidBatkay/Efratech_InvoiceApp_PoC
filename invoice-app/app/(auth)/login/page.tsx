import LoginForm from "@/components/loginForm";
import Link from "next/link";

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-slate-500">
      <LoginForm>
        <Link href="/dashboard">
          <button
            type="button"
            className="text-white bg-blue-400 dark:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-600 hover:dark:bg-blue-700"
          >
            Log In
          </button>
        </Link>

        <Link className="opacity-55 hover:text-gray-600" href="/signup">
          Sign up instead?
        </Link>
      </LoginForm>
    </div>
  );
};

export default LoginPage;
