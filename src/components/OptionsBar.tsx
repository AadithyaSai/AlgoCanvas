import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import ModeBar from "./ModeBar";
import OptionButton from "./OptionButton";
import AlgorithmSelect from "./AlgorithmSelect";

interface OptionsBarProps {
  mode: string;
  algo: string;
  color: string;
  onAlgoChange: (algo: string) => void;
  onClear: (clear: boolean) => void;
  onModeChange: (mode: string) => void;
  onColorChange: (color: string) => void;
}

export function OptionsBar({
  mode,
  algo,
  color,
  onAlgoChange,
  onClear,
  onModeChange,
  onColorChange,
}: OptionsBarProps) {
  const clearIcon = <FontAwesomeIcon icon={faTrashCan} />;

  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex">
        <ModeBar mode={mode} onModeChange={onModeChange} />
        <OptionButton
          title="Clear"
          onClickHandler={onClear}
          icon={clearIcon}
          styleString="bg-red-600 hover:bg-red-700"
        />
        <label htmlFor="color">
          <div className="flex flex-col justify-center h-full text-white rounded px-1.5 py-1 mx-1 bg-blue-600 hover:bg-blue-700">
            <FontAwesomeIcon icon={faPalette} />
          </div>
          <input
            type="color"
            id="color"
            name="color"
            value={color}
            className="hidden"
            onChange={(e) => onColorChange(e.target.value)}
          />
        </label>
      </div>
      <div className={`me-1 ${mode === "algorithm" ? "block" : "hidden"}`}>
        <AlgorithmSelect algo={algo} onAlgoChange={onAlgoChange} />
      </div>
    </div>
  );
}
