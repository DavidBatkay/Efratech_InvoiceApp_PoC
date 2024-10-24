import Link from "next/link";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gradient-to-br from-slate-500 to-slate-700">
      <h1 className="text-red-900 p-5 text-3xl">Page Not Found!</h1>
      <p className="">{"Could not find requested resource :("}</p>
      <Link className="p-2 bg-black text-white rounded-md" href="/">
        Return Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
