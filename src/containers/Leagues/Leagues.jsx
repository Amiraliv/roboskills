"use client";
import "./Leagues.scss";

import {
  AnimatedText,
  LayoutData,
  LeaguesCard,
  AnimatedLink,
} from "./../../components";
import { useEffect, useState } from "react";

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
          <ul>
            {leagues.map((item) => (
              <li key={item.id}>
                <AnimatedLink href={`/leagues/${item.id}`}>
                  <LeaguesCard imgSrc={item.imgSrc} />
                  <span>
                    <AnimatedText text={item.title} />
                  </span>
                </AnimatedLink>
              </li>
            ))}
          </ul>
        </nav>
      </LayoutData>
    </section>
  );
};

export default Leagues;
