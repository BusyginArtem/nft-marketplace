"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const modalVariants = {
  hidden: {
    opacity: 0,
    translateY: 50,
  },
  visible: {
    opacity: 1,
    translateY: 0,
    transition: {
      opacity: { duration: 0.3, ease: "easeOut", delay: 0.2 },
      translateY: { duration: 0.5, ease: "easeInOut" },
    },
  },
  exit: {
    opacity: 0,
    translateY: 50,
    transition: {
      opacity: { duration: 0.2, delay: 0.2 },
      translateY: { duration: 0.3 },
    },
  },
};

export default function WalletModalBackdrop({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleClose = () => {
    setTimeout(() => {
      router.back();
    }, 200);
  };

  return (
    <motion.div
      variants={modalVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      onClick={handleClose}
      className='fixed inset-0 bg-card/95 flex justify-center items-center z-10'
    >
      <div
        className='relative bg-background border border-card-foreground/35 rounded-lg shadow-sm shadow-white/55 my-24 mx-8'
        onClick={(e) => e.stopPropagation()}
      >
        <X
          onClick={handleClose}
          className='absolute top-6 right-6 text-x2l text-white cursor-pointer hover:scale-125 active:scale-100 transition-transform'
        />
        {children}
      </div>
    </motion.div>
  );
}
