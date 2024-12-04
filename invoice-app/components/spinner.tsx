"use client";

import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <motion.div
        className="border-t-4 border-white w-16 h-16 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      ></motion.div>
    </div>
  );
};

export default Spinner;
