"use client";

import "./Header.scss";

import { useState } from "react";
import {
  AnimatedText,
  HeaderProfileData,
  LayoutData,
  MobileNavbar,
} from "./../../components";
import { BiMenu } from "react-icons/bi";
import { BiMenuAltLeft } from "react-icons/bi";

import Image from "next/image";
import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  console.log(session);

  return (
    <header className="index__Header">
      <LayoutData>
        <nav className="index__Header_main">
          <div className="header__enter">
            <button className="navbarMobileShow" onClick={handleOpenMenu}>
              {mobileMenuOpen ? <BiMenu /> : <BiMenuAltLeft />}
            </button>
            <HeaderProfileData />
            <MobileNavbar
              isOpen={mobileMenuOpen}
              handleClose={setMobileMenuOpen}
            />
          </div>
          <div className="header__items">
            <ul>
              <li>
                <a href="/#competition">
                  <AnimatedText text={"اطلاعات مسابقه"} />
                </a>
              </li>
              <li>
                <a href="/team">
                  <AnimatedText text={"تیم برگزاری"} />
                </a>
              </li>
              <li>
                <a href="/#gallery">
                  <AnimatedText text={"گالری فیلم و تصاویر"} />
                </a>
              </li>
              <li>
                <a href="/#leagues ">
                  <AnimatedText text={"لیگ ها"} />
                </a>
              </li>
              <li>
                <a href="/">
                  <AnimatedText text={"صفحه اصلی"} />
                </a>
              </li>
            </ul>
          </div>
          <div className="header__data">
            <h1>
              <AnimatedText text={"RoboSkills"} />
            </h1>
            <Image
              src={"/assets/img/Logo-main.png"}
              alt="logo"
              width={100}
              height={70}
              priority
            />
          </div>
        </nav>
      </LayoutData>
    </header>
  );
};

export default Header;
