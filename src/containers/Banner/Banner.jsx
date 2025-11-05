import "./Banner.scss";

import Image from "next/image";
import { AnimatedText, LayoutData } from "../../components";

const Banner = () => {
  return (
    <section className="index__About">
      <LayoutData>
        <h2>
          <AnimatedText text={"بزرگترین رویداد فناوری"} /> و{" "}
          <AnimatedText text={"نوآوری جنوب شرق کشور"} />
        </h2>
        <nav className="index__About_main">
          <div className="index__About_data">
            <h3>
              <AnimatedText text={"RoboSkills مسابقات"} />
            </h3>
            <p>
              <AnimatedText
                text={"این رویداد در قالب ده لیگ تخصصی در محورهایی چون :"}
              />
            </p>
            <p>
              هوش مصنوعی، اینترنت اشیاء (IoT)، رباتیک ، صنعت‌یار ، خودروهای
              خودران، واقعیت ترکیبی MR ، نوروسانیس و راکت مدل سبک وزن , اختراعات
              و ابتکارات طراحی شده است.
            </p>
            <br />
            <br />
            <a href="/#leagues">
              <AnimatedText
                text={"ثبت نام در مسابقه ( تاریخ ثبت نام دی 1404)"}
              />
            </a>
          </div>
          <div className="index__About_banner">
            <Image
              src={"/assets/img/poster-RoboSkills.jpg"}
              width={500}
              height={500}
              alt="RoboSkills Poster"
              priority
            />
          </div>
        </nav>
      </LayoutData>
    </section>
  );
};

export default Banner;
