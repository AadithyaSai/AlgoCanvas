import { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import OptionsBar from "./OptionsBar";

type AlgoCanvasProps = {
  focus: boolean;
  setFocus: (focus: boolean) => void;
};

export default function AlgoCanvas({ focus, setFocus }: AlgoCanvasProps) {
  const [algo, setAlgo] = useState("dda");
  const [clear, setClear] = useState(false);
  const [mode, setMode] = useState("draw");
  const [color, setColor] = useState("#ffffff");

  const AlgoCanvasRef = useRef<HTMLDivElement | null>(null);

  if (focus) {
    console.log("scrolling");
    AlgoCanvasRef.current!.scrollIntoView({
      behavior: "smooth",
    });
  }

  useEffect(() => {
    setFocus(false);
  }, [focus, setFocus]);

  return (
    <div className="p-3" ref={AlgoCanvasRef}>
      <div className="fade-on-view w-full lg:w-2/3 p-3 pt-0 mx-auto bg-blue-950 rounded-lg opacity-0">
        <OptionsBar
          mode={mode}
          algo={algo}
          color={color}
          onAlgoChange={setAlgo}
          onClear={setClear}
          onModeChange={setMode}
          onColorChange={setColor}
        />
        <Canvas
          algo={algo}
          mode={mode}
          clear={clear}
          color={color}
          setClear={setClear}
        />
      </div>
    </div>
  );
}
