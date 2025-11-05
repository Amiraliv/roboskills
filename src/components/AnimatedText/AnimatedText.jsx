"use client";
import { motion } from "framer-motion";

export default function AnimatedText({ text, delay = 0 }) {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: [0.2, 0.65, 0.3, 0.9] },
    },
  };

  return (
    <motion.span
      style={{ display: "inline", flexWrap: "wrap", overflow: "hidden" }}
      variants={container}
      initial="hidden"
      whileInView="visible" // 👈 مهم: وقتی وارد viewport شد انیمیت شود
      viewport={{ once: true, amount: 0.5 }} // 👈 once: فقط یک بار، amount: چه مقدار از عنصر دیده شود
    >
      {letters.map((char, index) => (
        <motion.span key={index} variants={child}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
