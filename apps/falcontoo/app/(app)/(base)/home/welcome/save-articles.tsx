"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { fonts } from "@falcon/lib/fonts";
import { useUserAgent } from "../use-user-agent";
const { crimsonPro, lora } = fonts.serif;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const SaveArticles = () => {
  const { isIOS } = useUserAgent();

  if (isIOS) {
    return null;
  }

  return (
    <motion.section
      className="rounded-lg bg-slate-900 p-6 shadow-lg"
      variants={itemVariants}
    >
      <h2
        className={cn("mb-4 text-2xl font-semibold text-cyan-400", crimsonPro)}
      >
        Save your first article
      </h2>
      <motion.ol
        className="list-inside list-decimal space-y-6"
        variants={containerVariants}
      >
        <motion.li variants={itemVariants}>
          Open article in any browser
        </motion.li>
        <motion.li variants={itemVariants}>Click on the share button</motion.li>
        <motion.li variants={itemVariants}>
          <p className="mb-2">{`Select "Lex" from the list of apps`}</p>

          <Image
            src="/welcome/share.webp"
            width={250}
            height={250}
            alt="Share menu"
            className="rounded-lg border border-cyan-600 shadow-md"
          />
          <div className="mt-4 max-w-64 font-serif text-sm text-primary/50">
            Sharing is enabled once the app is installed from Chrome.
          </div>
        </motion.li>
      </motion.ol>
    </motion.section>
  );
};
