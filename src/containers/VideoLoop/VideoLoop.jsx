import { LayoutData } from "../../components";
import "./VideoLoop.scss";

export default function VideoLoop() {
  return (
    <div className="indexVideoLoop">
      <LayoutData>
        <video
          src={"/assets/video/m1.mp4"} // مسیر ویدیو در public
          autoPlay // به محض لود پخش شود
          loop // همیشه تکرار شود
          muted
          playsInline // برای موبایل
          style={{
            width: "100%",
            height: "100%",
            maxHeight: "1080px",
            margin: "auto",
            objectFit: "cover",
            overflow: "hidden",
          }} // fill container
        />
      </LayoutData>
    </div>
  );
}
