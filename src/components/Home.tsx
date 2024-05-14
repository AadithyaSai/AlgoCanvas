import { useEffect, useState } from "react";
import AlgoCanvas from "./AlgoCanvas";
import HeroSection from "./HeroSection";
import DesignFlecks from "./DesignFlecks";

export default function Home() {
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            scrollObserver.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.5 }
    );
    const elements = document.querySelectorAll(".fade-on-view");
    elements.forEach((element) => scrollObserver.observe(element));
  }, []);

  return (
    <div className="bg-gray-900 flex flex-col justify-between min-h-svh">
      <DesignFlecks />
      <HeroSection handleButtonClick={setFocus} />
      <AlgoCanvas focus={focus} setFocus={setFocus} />
    </div>
  );
}
