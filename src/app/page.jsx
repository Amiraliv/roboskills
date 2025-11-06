import { ParticlesBackground } from "./../components";
import {
  About,
  Banner,
  Gallery,
  Header,
  Leagues,
  VideoLoop,
} from "./../containers";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <ParticlesBackground />
      <Header />
      <VideoLoop />
      <Banner />
      <Leagues />
      {/* <Gallery /> */}
      <About />
    </main>
  );
}
