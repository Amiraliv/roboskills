"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

function CornerVertexStretch({ src, containerRef }) {
  const mesh = useRef();
  let scrollTimeout = null;
  const texture = useLoader(TextureLoader, src);

  const [size, setSize] = useState({ width: 3, height: 2 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setSize({ width: rect.width / 100, height: rect.height / 100 });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [containerRef]);

  useEffect(() => {
    const moveVertex = (delta) => {
      if (!mesh.current) return;
      const geometry = mesh.current.geometry;
      const pos = geometry.attributes.position.array;

      let targetX = pos[0] + delta * 0.002;
      let targetY = pos[1] + delta * 0.002;

      targetX = Math.min(targetX, -size.width / 2);
      targetY = Math.max(targetY, size.height / 2);

      gsap.to(pos, {
        0: targetX,
        1: targetY,
        duration: 0.4,
        ease: "power1.out",
        onUpdate: () => {
          geometry.attributes.position.needsUpdate = true;
        },
      });

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        gsap.to(pos, {
          0: -size.width / 2,
          1: size.height / 2,
          duration: 0.5,
          ease: "power1.out",
          onUpdate: () => {
            geometry.attributes.position.needsUpdate = true;
          },
        });
      }, 150);
    };

    const handleScroll = (e) =>
      moveVertex(e.deltaY || e.detail || e.wheelDelta);

    let lastTouchY = 0;
    const handleTouchStart = (e) => {
      lastTouchY = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      const delta = lastTouchY - touchY;
      lastTouchY = touchY;
      moveVertex(delta);
    };

    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [size]);

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[size.width, size.height, 1, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

export default function BounceImage({
  src,
  width = "400px",
  height = "300px",
  borderRadius = "20px",
}) {
  const containerRef = useRef();
  return (
    <div
      ref={containerRef}
      style={{
        width,
        height,
        borderRadius, // گوشه‌های گرد
        overflow: "hidden", // برای Clip کردن PlaneGeometry
      }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1.2} />
        <CornerVertexStretch src={src} containerRef={containerRef} />
      </Canvas>
    </div>
  );
}
