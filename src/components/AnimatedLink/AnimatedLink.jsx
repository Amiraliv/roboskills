"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

export default function AnimatedLink({ href, children }) {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const linkRef = useRef(null);
  const [position, setPosition] = useState(null);

  const handleClick = () => {
    if (clicked) return;

    const rect = linkRef.current.getBoundingClientRect();
    setPosition({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });

    setClicked(true);

    // overlay سیاه بعد از شروع انیمیشن ظاهر میشه
    setTimeout(() => {
      setOverlay(true);
    }, 300);

    // بعد از fade صفحه بعد لود میشه
    setTimeout(() => {
      router.push(href);
    }, 1400);
  };

  return (
    <>
      {/* لینک عکس */}
      <motion.a
        ref={linkRef}
        onClick={handleClick}
        initial={{ scale: 1, opacity: 1 }}
        animate={
          clicked && position
            ? [
                {
                  position: "fixed",
                  top: position.top,
                  left: position.left,
                  width: position.width,
                  height: position.height,
                  zIndex: 9999,
                  scale: 5,
                  opacity: 1,
                  transition: { duration: 0.8, ease: [0.83, 0, 0.17, 1] },
                },
                {
                  opacity: 0,
                  transition: { duration: 0.6, delay: 0.8, ease: "easeInOut" },
                },
              ]
            : { scale: 1, opacity: 1 }
        }
        style={{
          display: "inline-block",
          cursor: "pointer",
          transformOrigin: "center center",
        }}
      >
        {children}
      </motion.a>

      {/* overlay سیاه */}
      {overlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "black",
            zIndex: 9998,
          }}
        />
      )}
    </>
  );
}
