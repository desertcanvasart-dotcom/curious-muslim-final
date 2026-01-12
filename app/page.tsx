import Hero from "./components/home/Hero";
import CharactersPreview from "./components/home/CharactersPreview";
import StoriesPreview from "./components/home/StoriesPreview";
import BookFeature from "./components/home/BookFeature";
import NoorIntro from "./components/home/NoorIntro";
import Testimonials from "./components/home/Testimonials";
import FinalCTA from "./components/home/FinalCTA";

export default function Home() {
  return (
    <div>
      <Hero />
      <CharactersPreview />
      <StoriesPreview />
      <BookFeature />
      <NoorIntro />
      <Testimonials />
      <FinalCTA />
    </div>
  );
}
