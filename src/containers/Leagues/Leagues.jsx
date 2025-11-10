"use client";
import "./Leagues.scss";

import {
  AnimatedText,
  LayoutData,
  LeaguesCard,
  AnimatedLink,
  BounceImage,
} from "./../../components";
import { useEffect, useState } from "react";
import WaveCard from "../../components/WaveCard/WaveCard";

const Leagues = () => {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await fetch("/api/leagues");
        const data = await response.json();
        setLeagues(data);
      } catch (error) {
        console.error("Error fetching leagues:", error);
      }
    };

    fetchLeagues();
  }, []);

  return (
    <section id="leagues">
      <LayoutData>
        <h2>
          <AnimatedText text={"RoboSkills لیگ های"} />
        </h2>
        <nav className="index__Leagues_main">
          <ul className="flex flex-wrap justify-center gap-6">
            {leagues.map((item) => (
              <li key={item.id}>
                {/* <AnimatedLink href={`/leagues/${item.id}`}>
                  <LeaguesCard imgSrc={item.imgSrc} />
                  <span>
                    <AnimatedText text={item.title} />
                  </span>
                </AnimatedLink> */}
                {/* <WaveCard imageSrc={item.imgSrc} text={item.title} /> */}
                <BounceImage src={item.imgSrc} />
              </li>
            ))}
          </ul>
        </nav>
      </LayoutData>
    </section>
  );
};

export default Leagues;
