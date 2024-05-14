import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import AlgoCanvas from "../assets/img/AlgoCanvas.png";

type HeroSectionProps = {
  handleButtonClick: (focus: boolean) => void;
};

export default function HeroSection({ handleButtonClick }: HeroSectionProps) {
  return (
    <section className="bg-transparent mb-40  opacity-0 animate-fade-in-up-slow">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto sm:gap-8 xl:gap-0 sm:py-16 sm:grid-cols-12">
        <div className="flex justify-center col-span-full mx-0 animate-none mt-0 sm:col-span-5 sm:animate-bob sm:order-2">
          <img
            src={AlgoCanvas}
            alt="AlgoCanvas"
            className="object-contain w-2/3"
          />
        </div>
        <div className="mr-auto place-self-center sm:col-span-7 sm:order-1">
          <h1 className="flex justify-center max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none text-center sm:text-5xl xl:text-6xl text-white">
            {"AlgoCanvas".split("").map((char, index) => {
              if (index % 2 == 0) {
                return (
                  <div key={index} className="animate-down">
                    {char}
                  </div>
                );
              } else {
                return (
                  <div key={index} className="animate-up">
                    {char}
                  </div>
                );
              }
            })}
          </h1>
          <p className="max-w-2xl mb-6 font-light sm:mb-8 text-center sm:text-lg md:text-xl text-gray-400">
            Create the perfect pixel art while exploring classic Computer
            Graphics algorithms. Learn while having fun!
          </p>
          <div className="text-center">
            <button
              onClick={() => handleButtonClick(true)}
              className="inline-flex animate-shake items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-900"
            >
              Try It Out
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
