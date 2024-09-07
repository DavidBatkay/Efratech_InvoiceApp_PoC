import { AppProps } from "next/app";
import Link from "next/link";
import { DetailedHTMLProps, ReactNode } from "react";

const Item: React.FC<{
  children: ReactNode;
  description?: string;
  href: string;
}> = ({ description, href, children }) => {
  return (
    <Link
      href={href}
      className="relative flex h-full flex-col rounded-md border border-gray-200 bg-white p-2.5 hover:border-gray-400 sm:rounded-lg sm:p-5"
    >
      <span className="text-md mb-0 font-semibold text-gray-900 hover:text-black sm:mb-1.5 sm:text-xl">
        {children}
      </span>
      <span className="text-sm leading-normal text-gray-400 sm:block">
        {description}
      </span>
    </Link>
  );
};

export default Item;
