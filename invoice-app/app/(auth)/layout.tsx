import { ReactNode } from "react";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-slate-500">
      {children}
    </div>
  );
};

export default Layout;
