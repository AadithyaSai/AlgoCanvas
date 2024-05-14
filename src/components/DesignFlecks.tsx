import { useEffect, useRef } from "react";

export default function DesignFlecks() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    [...ref.current!.children].forEach((child) => {
      child.classList.remove("transform-none");
      child.classList.add("transition-all");
      child.classList.add("duration-1000");
    });
  }, []);

  return (
    <div ref={ref} className="animate-fade">
      <div className="load-anim hidden sm:block absolute top-12 left-32 w-40 h-40 transform-none -rotate-45 -translate-y-40 bg-teal-500"></div>
      <div className="load-anim hidden md:block absolute top-3 left-3/4 w-32 h-32 transform-none -rotate-[65deg] -translate-y-16 bg-teal-400"></div>
      <div className="load-anim hidden sm:block absolute top-4 left-96 w-40 h-20 transform-none rotate-[67deg] -translate-y-16 bg-teal-600"></div>
      <div className="load-anim hidden md:block absolute top-4 left-1/2 w-40 h-20 transform-none -rotate-[44deg] -translate-y-16 bg-teal-500"></div>
      <div className="load-anim hidden md:block absolute top-96 left-32 w-80 h-32 transform-none rotate-[54deg] skew-x-12 -translate-y-2 bg-teal-500"></div>
      <div className="load-anim hidden sm:block absolute top-96 left-3/4 w-64 h-12 transform-none -rotate-[22deg] skew-x-12 -translate-y-1 bg-teal-400"></div>
    </div>
  );
}
