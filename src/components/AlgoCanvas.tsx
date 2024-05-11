import { useState } from "react";
import Canvas from "./Canvas";
import { OptionsBar } from "./OptionsBar";

export default function AlgoCanvas() {
  const [algo, setAlgo] = useState("");
  const [clear, setClear] = useState(false);
  const [mode, setMode] = useState("draw");

  return (
    <div className="w-fit m-1 bg-gray-600 rounded">
      <OptionsBar
        mode={mode}
        onAlgoChange={setAlgo}
        onClear={setClear}
        onModeChange={setMode}
      />
      <Canvas algo={algo} mode={mode} clear={clear} setClear={setClear} />
    </div>
  );
}
