"use client";

import Image from "next/image";
import imagePath from "../public/favicon.png";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

export default function Logo() {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);

  const handleHoverStart = async () => {
    setIsHovered(true);
    controls.start({
      rotate: [currentRotation, currentRotation + 360],
      transition: { repeat: Infinity, duration: 2, ease: "linear" },
    });
  };

  const handleHoverEnd = async () => {
    setIsHovered(false);
    const nextFullRotation = Math.ceil(currentRotation / 360) * 360 + 360;
    setCurrentRotation(nextFullRotation);
    await controls.start({
      rotate: nextFullRotation,
      transition: { duration: 0.8, ease: "easeOut" },
    });
  };

  return (
    <div className="flex">
      <Link href="/dashboard">
        <motion.div
          animate={controls}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          className="cursor-pointer"
        >
          <Image src={imagePath} alt="icon" width="80" height="80" priority />
        </motion.div>
      </Link>
    </div>
  );
}
