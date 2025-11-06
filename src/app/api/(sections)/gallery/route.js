"use server";

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    "/assets/img/123818-1-400x250-1.jpg",
    "/assets/img/ClawBundle_ipadClose-1.jpg",
    "/assets/img/download-2-1.jpg",
    "/assets/img/Starting-a-Career-in-Robotics-1024x576.png",
    "/assets/img/Logo-main.png",
    "/assets/img/download-3.jpg",
    "/assets/img/download-4.jpg",
    "/assets/img/poster-RoboSkills.jpg",
    "/assets/img/Rocket.jpg",
    "/assets/img/unnamed.jpg",
  ]);
}
