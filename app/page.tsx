import Hero from "./components/home/Hero";
import BookFeature from "./components/home/BookFeature";
import NoorIntro from "./components/home/NoorIntro";
import Testimonials from "./components/home/Testimonials";

export default function Home() {
  return (
    <div>
      <Hero />
      <BookFeature />
      <NoorIntro />
      <Testimonials />
    </div>
  );
}
