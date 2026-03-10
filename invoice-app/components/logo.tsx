"use client";

import Image from "next/image";
import imagePath from "../public/favicon.png";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

export default function Logo() {
  const controls = useAnimation();
  const [currentRotation, setCurrentRotation] = useState(0);

  const handleHoverStart = async () => {
    controls.start({
      rotate: [currentRotation, currentRotation + 360],
      transition: { repeat: Infinity, duration: 2, ease: "linear" },
    });
  };

  const handleHoverEnd = async () => {
    const nextFullRotation = Math.ceil(currentRotation / 360) * 360 + 360;
    setCurrentRotation(nextFullRotation);

    await controls.start({
      rotate: nextFullRotation,
      transition: { duration: 0.8, ease: "easeOut" },
    });
  };

  return (
    <div className="flex items-center justify-center">
      <Link href="/dashboard" className="flex items-center">
        <motion.div
          animate={controls}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          className="cursor-pointer flex items-center justify-center"
          style={{ transformOrigin: "center center" }}
        >
          <Image
            src={imagePath}
            alt="ModuFlow Logo"
            width={60}
            height={60}
            className="block"
            priority
          />
        </motion.div>
      </Link>
    </div>
  );
}
