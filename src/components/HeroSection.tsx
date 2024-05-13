import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function HeroSection() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            AlgoCanvas
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Create the perfect pixel art while exploring classic Computer
            Graphics algorithms. Learn while having fun!
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Try It Out
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </a>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex animate-bob">
          <img src="src/assets/img/AlgoCanvas.png" alt="AlgoCanvas" />
        </div>
      </div>
    </section>
  );
}
