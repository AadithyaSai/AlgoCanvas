import { useState } from "react";
import Canvas from "./Canvas";
import { OptionsBar } from "./OptionsBar";

export default function AlgoCanvas() {
  const [algo, setAlgo] = useState("dda");
  const [clear, setClear] = useState(false);
  const [mode, setMode] = useState("draw");
  const [color, setColor] = useState("#ffffff");

  return (
    <div className="p-3">
      <div className="w-fit p-3 pt-0 mx-auto bg-blue-950 rounded-lg">
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
