import "./About.scss";
import Image from "next/image";
import { LayoutData } from "../../components";

const About = () => {
  return (
    <section id="competition">
      <LayoutData>
        <h2 className="competition__title">
          <span>درباره مسابقات</span>
          <strong>RoboSkills</strong>
        </h2>

        <nav className="competitionIndexData">
          <div className="competition__banner">
            <Image
              src={"/assets/img/Logo-main.png"}
              width={340}
              height={250}
              alt="roboskills logo"
              priority
            />
          </div>

          <div className="competition__data">
            <p>
              رویداد <strong>RoboSkills</strong> به‌عنوان بزرگ‌ترین رویداد
              فناوری جنوب شرق کشور، با هدف توسعه مهارت‌های فناورانه، ترویج
              خلاقیت و ایجاد پیوند میان دانشگاه، صنعت و آموزش در شهر کرمان
              برگزار خواهد شد. این رویداد فرصتی است برای شکوفایی استعدادهای
              جوان، ارتقای مهارت‌های آینده و خلق راه‌حل‌های نوآورانه برای
              چالش‌های واقعی جامعه.
            </p>
          </div>

          <div className="competition__timeline">
            <div className="competition__timeline_header">
              <h3>⏰ زمان‌بندی برگزاری مسابقات</h3>
            </div>
            <div className="competition__timeline_data">
              <ul>
                <li>
                  <span>بهمن 1404</span>
                  <span>مرحله مقدماتی</span>
                </li>
                <li>
                  <span>اردیبهشت 1405</span>
                  <span>مرحله نهایی</span>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </LayoutData>
    </section>
  );
};

export default About;
