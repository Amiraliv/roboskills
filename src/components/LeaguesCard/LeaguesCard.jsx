"use client";

import "./LeaguesCard.scss";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LeaguesCard = ({ imgSrc }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // حالت اولیه — کج، کوچیک و عرض کم
    gsap.set(cardRef.current, {
      rotateX: 25,
      rotateY: 10,
      scale: 0.8,
      width: 400 * 0.6, // 60٪ عرض نهایی
      opacity: 0,
    });

    // وقتی اسکرول بهش رسید → صاف و کامل
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      width: "100%",
      opacity: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
        end: "top 60%",
        scrub: true,
      },
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="LeaguesCardItem"
      style={{
        transformOrigin: "center",
        perspective: 800,
        transition: "width 0.2s ease-out",
      }}
    >
      <Image src={imgSrc} alt="League" fill />
    </div>
  );
};

export default LeaguesCard;
