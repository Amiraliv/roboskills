"use client";

import "./MobileNavbar.scss";
import { IoMdCloseCircle } from "react-icons/io";
import { AnimatedText } from "../.";

const MobileNavbar = ({ handleClose = () => {}, isOpen = false }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <nav className="mobileMenu__navbar">
      <div className="mobileMenu__navbar_main">
        <div className="mobileMenu__navbar_data">
          <button
            className="mobileMenu__navbar_close"
            onClick={() => {
              handleClose(false);
            }}
          >
            <IoMdCloseCircle />
          </button>
          <span>منوی روبوسکیلز</span>
        </div>
        <div className="mobileMenu__navbar_items">
          <ul className="mobileMenu__navbar_item_main">
            <li>
              <a href="/">
                <AnimatedText text={"صفحه اصلی"} />
              </a>
            </li>
            <li>
              <a href="/#leagues ">
                <AnimatedText text={"لیگ ها"} />
              </a>
            </li>
            <li>
              <a href="/#gallery">
                <AnimatedText text={"گالری فیلم و تصاویر"} />
              </a>
            </li>
            <li>
              <a href="/team">
                <AnimatedText text={"تیم برگزاری"} />
              </a>
            </li>
            <li>
              <a href="/#competition">
                <AnimatedText text={"اطلاعات مسابقه"} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavbar;
