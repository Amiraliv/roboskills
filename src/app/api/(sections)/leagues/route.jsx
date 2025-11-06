"use server";

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: "kajshdkjahsdijhaksjdnh",
      imgSrc: "/assets/img/ClawBundle_ipadClose-1.jpg",
      title: "نوروساینس ",
    },
    {
      id: "gyasdasgasdasgasdasdgasd",
      imgSrc: "/assets/img/download-3.jpg",
      title: "نبرد ربات ها ",
    },
    {
      id: "daiushdjhasduyjhakjsnduy",
      imgSrc: "/assets/img/download-2-1.jpg",
      title: "برنامه‌نویسی وهوش مصنوعی کاربردی",
    },
    {
      id: "asijdhkasjdiahsiduhasdjas",
      imgSrc: "/assets/img/123818-1-400x250-1.jpg",
      title: "خودرو های خودران",
    },
    {
      id: "kjahsdijaoisiudoaijsd",
      imgSrc: "/assets/img/Rocket.jpg",
      title: "راکت مدل سبک وزن",
    },
    {
      id: "pojasoidhiasjdokjasdpalksd",
      imgSrc: "/assets/img/download-4.jpg",
      title: "اینترنت اشیا (IOT)",
    },
    {
      id: "diaushdkajsdjoaksjdjkaspdkj",
      imgSrc: "/assets/img/unnamed.jpg",
      title: "مهارت دانش آموزی",
    },
    {
      id: "iouhdlkasjdojasoid",
      imgSrc: "/assets/img/Starting-a-Career-in-Robotics-1024x576.png",
      title: "صنعت یار",
    },
    {
      id: "aosihdlkajsdiuyasidioas",
      imgSrc: "/assets/img/3507.jpg",
      title: "اختراعات و ابتکارات",
    },
  ]);
}
