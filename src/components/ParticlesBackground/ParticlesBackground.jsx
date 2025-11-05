"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = {
    fullScreen: {
      enable: true,
      zIndex: -9999, // 👈 مهم! همیشه زیر همه
    },
    background: { color: { value: "#000000" } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 200, links: { opacity: 0.6 } },
        push: { quantity: 2 },
      },
    },
    particles: {
      color: { value: "#c90000ff" },
      links: {
        enable: true,
        distance: 150,
        color: "#ff9b9bff",
        opacity: 0.5,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        outModes: { default: "out" },
      },
      number: {
        value: 80,
        density: { enable: true, area: 800 },
      },
      opacity: { value: 0.6 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      style={{
        position: "fixed", // 👈 همیشه ثابت
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -9999, // 👈 پایین‌تر از همه
      }}
    />
  );
}
