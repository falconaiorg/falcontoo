"use client";
import { motion } from "framer-motion";
import { ButtonProps } from "@/components/ui/button";
import { vibrate as vibrateNow } from "@falcon/lib/vibrate";

type RoundButtonProps = {
  children: React.ReactNode;
} & ButtonProps;

export const RoundButton = ({ children, ...props }: RoundButtonProps) => {
  return (
    <button
      {...props}
      className="relative flex h-20 w-20 items-center justify-center"
      onClick={() => vibrateNow()}
    >
      {/* Outer Ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-300 p-1 shadow-lg">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-800">
          {/* Inner Button */}
          <motion.div
            whileTap={{
              scale: 0.95,
              translateY: 2,
              boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative flex h-full w-full items-center justify-center rounded-full bg-gray-800"
          >
            <div className="absolute inset-0 h-full w-full rounded-full bg-blue-500 opacity-20"></div>
            <div className="text-xs font-semibold text-white">{children}</div>
          </motion.div>
        </div>
      </div>
      {/* Inset Shadow */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-black opacity-30"></div>
    </button>
  );
};
