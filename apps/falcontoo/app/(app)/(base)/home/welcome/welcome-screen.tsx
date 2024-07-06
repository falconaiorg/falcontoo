"use client";
import React from "react";
import { getFirstName } from "@falcon/lib/utils";
import { fonts } from "@falcon/lib/fonts";
const { crimsonPro, lora } = fonts.serif;
import { cn } from "@/lib/utils";
import Image from "next/image";
import useUserAgent from "../use-user-agent";
import { motion } from "framer-motion";
import { SaveArticles } from "./save-articles";

export const WelcomeScreen = ({
  fullName,
}: {
  fullName: string | null | undefined;
}) => {
  const firstName = !fullName ? null : getFirstName(fullName);
  const noFirstName = !firstName || firstName === "";
  const { isChrome, userAgentInfo } = useUserAgent();

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

  return (
    <motion.section
      className="flex min-h-screen flex-col space-y-8 overflow-y-auto p-6 pb-32 text-slate-300"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className={cn("mt-8 text-4xl font-bold text-cyan-400", crimsonPro)}
        variants={itemVariants}
      >
        {noFirstName ? `Welcome to Lex Reader!` : `Welcome, ${firstName}!`}
      </motion.h1>
      <motion.div className={cn("space-y-8", lora)} variants={itemVariants}>
        <motion.section
          className="rounded-lg bg-slate-900 p-6 shadow-lg"
          variants={itemVariants}
        >
          <h2
            className={cn(
              "mb-4 text-2xl font-semibold text-cyan-400",
              crimsonPro,
            )}
          >
            Install the App (Chrome)
          </h2>
          <motion.ol
            className="list-inside list-decimal space-y-6"
            variants={containerVariants}
          >
            {!isChrome && (
              <motion.li
                variants={itemVariants}
              >{`Open this link in Chrome. (Currently using ${userAgentInfo?.browser.name})`}</motion.li>
            )}
            <motion.li variants={itemVariants}>
              <p className="mb-2">{`Click the top right "3 dots"`}</p>
              <Image
                src="/welcome/3dots.webp"
                width={250}
                height={250}
                alt="Chrome menu"
                className="rounded-lg border border-cyan-600 shadow-md"
              />
            </motion.li>
            <motion.li variants={itemVariants}>
              <p className="mb-2">{`Click on "Add to Home screen"`}</p>
              <Image
                src="/welcome/add-app.webp"
                width={250}
                height={250}
                alt="Add to Home screen option"
                className="rounded-lg border border-cyan-600 shadow-md"
              />
            </motion.li>
            <motion.li variants={itemVariants}>Click Install App</motion.li>
          </motion.ol>
        </motion.section>
        <SaveArticles />
      </motion.div>
    </motion.section>
  );
};
