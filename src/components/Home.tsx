import AlgoCanvas from "./AlgoCanvas";
import HeroSection from "./HeroSection";

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <HeroSection />
      <AlgoCanvas />
    </div>
  );
}
