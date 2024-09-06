import LoginForm from "@/components/loginForm";
import Link from "next/link";

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <LoginForm />
      <Link href="/dashboard">
        <button
          type="button"
          className="text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          disabled
        >
          Log In
        </button>
      </Link>
    </div>
  );
};

export default LoginPage;
