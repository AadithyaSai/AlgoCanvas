import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEraser,
  faPen,
  faSquareRootVariable,
} from "@fortawesome/free-solid-svg-icons";

import ModeButton from "./ModeButton";

interface ModeBarProps {
  mode: string;
  onModeChange: (mode: string) => void;
}

export default function ModeBar({ mode, onModeChange }: ModeBarProps) {
  const drawIcon = <FontAwesomeIcon icon={faPen} />;

  const eraseIcon = <FontAwesomeIcon icon={faEraser} />;

  const algoIcon = <FontAwesomeIcon icon={faSquareRootVariable} />;

  return (
    <div className="flex gap-x-1 bg-gray-700 mx-1 px-1.5 py-1 rounded">
      <ModeButton
        mode="draw"
        globalMode={mode}
        onGlobalModeChange={onModeChange}
        icon={drawIcon}
      />
      <ModeButton
        mode="erase"
        globalMode={mode}
        onGlobalModeChange={onModeChange}
        icon={eraseIcon}
      />
      <ModeButton
        mode="algorithm"
        globalMode={mode}
        onGlobalModeChange={onModeChange}
        icon={algoIcon}
      />
    </div>
  );
}
