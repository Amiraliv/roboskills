import {
  GalaxyBackground,
  ParticlesBackground,
  TubeScene,
} from "./../components";
import {
  About,
  Banner,
  Footer,
  Gallery,
  Header,
  Leagues,
  VideoLoop,
} from "./../containers";

export default function Home() {
  return (
    <main className="bg-black text-white">
      {/* <ParticlesBackground /> */}
      {/* <GalaxyBackground /> */}
      <TubeScene />
      <Header />
      <VideoLoop />
      <Banner />
      <Leagues />
      {/* <Gallery /> */}
      <About />
      <Footer />
    </main>
  );
}
