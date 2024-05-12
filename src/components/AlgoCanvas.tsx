import { useState } from "react";
import Canvas from "./Canvas";
import { OptionsBar } from "./OptionsBar";

export default function AlgoCanvas() {
  const [algo, setAlgo] = useState("dda");
  const [clear, setClear] = useState(false);
  const [mode, setMode] = useState("draw");
  const [color, setColor] = useState("#000000");

  return (
    <div className="w-fit m-1 p-1 pt-0 bg-gray-600 rounded">
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
  );
}
