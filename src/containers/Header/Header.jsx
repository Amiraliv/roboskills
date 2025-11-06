"use client";

import "./Header.scss";

import { useState } from "react";
import { AnimatedText, LayoutData, MobileNavbar } from "./../../components";
import { BiMenu } from "react-icons/bi";
import { BiMenuAltLeft } from "react-icons/bi";

import Image from "next/image";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="index__Header">
      <LayoutData>
        <nav className="index__Header_main">
          <div className="header__enter">
            <button className="navbarMobileShow" onClick={handleOpenMenu}>
              {mobileMenuOpen ? <BiMenu /> : <BiMenuAltLeft />}
            </button>
            <a href="/login">
              <AnimatedText text={"ثبت نام / ورود"} />
            </a>
            <MobileNavbar
              isOpen={mobileMenuOpen}
              handleClose={setMobileMenuOpen}
            />
          </div>
          <div className="header__items">
            <ul>
              <li>
                <a href="/competition-data">
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
