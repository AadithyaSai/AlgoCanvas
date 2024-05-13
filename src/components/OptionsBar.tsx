import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

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
    <div className="flex items-center justify-center lg:justify-between p-2">
      <div className="flex">
        <ModeBar mode={mode} onModeChange={onModeChange} />
        <input
          type="color"
          id="color"
          name="color"
          value={color}
          className="my-auto h-10 w-10 rounded-md border-none bg-blue-600 hover:bg-blue-700 cursor-pointer"
          onChange={(e) => onColorChange(e.target.value)}
        />
        <OptionButton
          title="Clear"
          onClickHandler={onClear}
          icon={clearIcon}
          styleString="bg-red-600 hover:bg-red-700"
        />
      </div>
      <div className="me-1">
        <AlgorithmSelect
          algo={algo}
          onAlgoChange={onAlgoChange}
          isDisabled={mode !== "algorithm"}
        />
      </div>
    </div>
  );
}
