"use client";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WaveCard({ imageSrc, text }) {
  const containerRef = useRef(null);
  const mountRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const mount = mountRef.current;
    if (!container || !mount) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      0.1,
      1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(light);

    // ⚠️ متغیرها رو اینجا تعریف می‌کنیم
    let rafId;
    let geometry, material, mesh, texture;
    let initialPositions;
    let lastScrollY = window.scrollY;

    // ⚠️ handleScroll امن
    const handleScroll = () => {
      if (!geometry || !initialPositions) return;

      const delta = window.scrollY - lastScrollY;

      const positions = geometry.attributes.position.array;

      // تغییر موقتی
      for (let i = 0; i < initialPositions.length; i += 3) {
        const y0 = initialPositions[i + 1]; // موقعیت اولیه
        const factor = (y0 + height / 2) / height; // بالای کارت ثابت‌تر، پایین قابل حرکت
        positions[i + 1] = y0 + delta * (factor - 0.5) * 0.2; // کشیدگی کوچک
      }

      geometry.attributes.position.needsUpdate = true;

      // بعد از 100ms برگرد به حالت اولیه
      clearTimeout(container.scrollTimeout);
      container.scrollTimeout = setTimeout(() => {
        for (let i = 0; i < initialPositions.length; i += 3) {
          positions[i + 1] = initialPositions[i + 1];
        }
        geometry.attributes.position.needsUpdate = true;
      }, 100);

      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    const loader = new THREE.TextureLoader();
    loader.load(
      imageSrc,
      (tex) => {
        texture = tex;

        geometry = new THREE.PlaneGeometry(width, height, 32, 32);
        material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
        });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        initialPositions = Float32Array.from(
          geometry.attributes.position.array
        );

        // Animation loop
        const animate = () => {
          rafId = requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };
        animate();

        // GSAP initial animation
        gsap.set(container, { scale: 0.8, opacity: 0 });
        gsap.set(mesh.scale, { x: 1.3, y: 1.3 });

        ScrollTrigger.create({
          trigger: container,
          start: "top 80%",
          onEnter: () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.to(container, { scale: 1, opacity: 1, duration: 1.2 }).to(
              mesh.scale,
              { x: 1, y: 1, duration: 1.2 },
              "<"
            );
          },
        });
      },
      undefined,
      (err) => console.error("Texture load error:", err)
    );

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);

      geometry?.dispose();
      material?.dispose();
      texture?.dispose();
      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [imageSrc]);

  return (
    <a
      href="#"
      ref={containerRef}
      className="relative flex flex-col items-center justify-end mb-20 rounded-2xl shadow-2xl overflow-hidden bg-[#111]"
      style={{
        width: "400px",
        height: "280px",
        transformOrigin: "top center", // pivot بالا
      }}
    >
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          borderRadius: "24px",
          maskImage: "radial-gradient(white, white)",
          WebkitMaskImage: "radial-gradient(white, white)", // Safari
        }}
      />
      <div className="absolute bottom-0 w-full bg-black/60 py-4 text-center backdrop-blur-sm">
        <p className="text-white text-lg font-semibold">{text}</p>
      </div>
    </a>
  );
}
