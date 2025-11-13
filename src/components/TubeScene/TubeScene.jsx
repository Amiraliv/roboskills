"use client";
import * as THREE from "three";
import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";

function Tube({ progress, config }) {
  const {
    numPoints = 300,
    radius = 0.12,
    tubularSegments = 400,
    gradientTop = "#FF4C4C", // قرمز روشن‌تر
    gradientBottom = "#8B0000", // قرمز جگری
    keyPoints = [
      new THREE.Vector3(-5, 0, 0),
      new THREE.Vector3(-3, 1, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(3, -1, 0),
      new THREE.Vector3(5, 0, 0),
    ],
  } = config;

  // ایجاد هندسه لوله بر اساس میزان اسکرول
  const geometry = useMemo(() => {
    if (progress <= 0) return null;

    const basePath = new THREE.CatmullRomCurve3(keyPoints);

    const visibleCount = Math.max(2, progress * numPoints);
    const points = [];
    for (let i = 0; i <= visibleCount; i++) {
      const t = i / numPoints;
      const p = basePath.getPointAt(t);
      points.push(p);
    }

    const dynamicPath = new THREE.CatmullRomCurve3(points);
    const tubeGeo = new THREE.TubeGeometry(
      dynamicPath,
      tubularSegments,
      radius,
      32,
      false
    );

    // گرادینت عمودی روی لوله
    const colorTop = new THREE.Color(gradientTop);
    const colorBottom = new THREE.Color(gradientBottom);
    const pos = tubeGeo.attributes.position;
    const colors = [];
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const t = (y + 1.5) / 3;
      const color = colorBottom.clone().lerp(colorTop, t);
      colors.push(color.r, color.g, color.b);
    }
    tubeGeo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    return tubeGeo;
  }, [
    progress,
    keyPoints,
    numPoints,
    tubularSegments,
    radius,
    gradientTop,
    gradientBottom,
  ]);

  if (!geometry) return null;

  return (
    <>
      {/* outer metallic tube */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          vertexColors
          emissive="#8B0000"
          emissiveIntensity={0.7}
          metalness={0.7}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* inner glowing core */}
      <mesh geometry={geometry} scale={[0.8, 0.8, 0.8]}>
        <meshBasicMaterial
          color="#FF4C4C"
          emissive="#FF6666"
          emissiveIntensity={1.5}
        />
      </mesh>
    </>
  );
}

export default function TubeBackgroundScene() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const smoothProgress = useRef(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // کنترل اسکرول صفحه
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // نرم‌کردن حرکت با انیمیشن
  useEffect(() => {
    let frame;
    const animate = () => {
      smoothProgress.current +=
        (scrollProgress - smoothProgress.current) * 0.05;
      setAnimatedProgress(smoothProgress.current);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [scrollProgress]);

  // مسیر لوله قابل تنظیم
  const tubeConfig = {
    radius: 0.15,
    tubularSegments: 400,
    numPoints: 300,
    gradientTop: "#FF4C4C", // قرمز روشن
    gradientBottom: "#8B0000", // قرمز جگری
    keyPoints: [
      new THREE.Vector3(-21, 8, 0),
      new THREE.Vector3(-8, 6, 0),
      new THREE.Vector3(-3, 1, 0),
      new THREE.Vector3(-6, 1, 5),
      new THREE.Vector3(-5, 5, 0),
      new THREE.Vector3(-5, 5, -3),
      new THREE.Vector3(-8, 1, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(3, -1, 0),
      new THREE.Vector3(21, 0, 0),
    ],
  };

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 100 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        background: "black",
      }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.3} />
      <Tube progress={animatedProgress} config={tubeConfig} />
    </Canvas>
  );
}
