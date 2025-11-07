"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { modules } from "./modules";

const Menu: React.FC = () => {
  const path = usePathname();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
      {modules.map((mod) => {
        const Icon = mod.icon;
        return (
          <Link key={mod.name} href={`${path}/${mod.href}`}>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center justify-center gap-3 p-6 bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-600/50 rounded-2xl shadow-lg text-center transition-all duration-200 hover:from-blue-700 hover:to-blue-600 hover:shadow-blue-500/30"
            >
              <Icon className="w-10 h-10 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">{mod.name}</h3>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};

export default Menu;
