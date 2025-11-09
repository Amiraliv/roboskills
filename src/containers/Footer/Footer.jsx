import "./Footer.scss";
import {
  FaInstagram,
  FaTelegramPlane,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* معرفی برند */}
        <div className="footer__brand">
          <h2>RoboSkills</h2>
          <p>
            مسابقه <strong>RoboSkills کرمان</strong> بزرگ‌ترین حوزه فناوری و
            نوآوری استان کرمان می‌باشد. این رویداد توسط{" "}
            <strong>خانه خلاق و نوآوری فرامهارت</strong> برگزار می‌گردد.
          </p>
        </div>

        {/* لینک‌های مفید */}
        <div className="footer__links">
          <div>
            <h3>دپارتمان ما</h3>
            <ul>
              <li>
                <a href="/#leagues">درباره مسابقات</a>
              </li>
              <li>
                <a href="tel:09103846305">ثبت نام در کادر اجرایی</a>
              </li>
              <li>
                <a href="tel:09103846305">درخواست اسپانسری</a>
              </li>
            </ul>
          </div>

          <div>
            <h3>پشتیبانی</h3>
            <ul>
              <li>
                <a href="tel:09103846305">درخواست پشتیبانی</a>
              </li>
              <li>
                <a href="tel:09103846305">سوالات متداول</a>
              </li>
            </ul>
          </div>

          <div>
            <h3>جامعه ما</h3>
            <ul className="footer__socials">
              <li>
                <a href="#">
                  <FaInstagram /> Instagram
                </a>
              </li>
              <li>
                <a href="#">
                  <FaTelegramPlane /> Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* تماس با ما */}
        <div className="footer__contact">
          <h3>تماس با ما</h3>
          <ul>
            <li>
              <FaPhoneAlt /> <span>+98-9103846305</span>
            </li>
            <li>
              <FaMapMarkerAlt /> <span>کرمان – بلوار جمهوری کوچه شماره 7</span>
            </li>
            <li>
              <FaEnvelope /> <span>RoboSkills.iran@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          © {new Date().getFullYear()} RoboSkills | طراحی و توسعه توسط خانه خلاق
          و نوآوری فرامهارت
        </p>
      </div>
    </footer>
  );
};

export default Footer;
