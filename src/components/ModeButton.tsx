interface ModeButtonProps {
  mode: string;
  globalMode: string;
  onGlobalModeChange: (mode: string) => void;
  icon: JSX.Element;
}

export default function ModeButton({
  mode,
  globalMode,
  onGlobalModeChange,
  icon,
}: ModeButtonProps) {
  return (
    <button
      className={`text-white rounded px-1.5 py-1 ${
        globalMode === mode
          ? "bg-green-700  hover:bg-green-600"
          : "bg-transparent border border-gray-500 hover:bg-gray-800"
      }`}
      title={mode.charAt(0).toUpperCase() + mode.slice(1)}
      onClick={() => onGlobalModeChange(mode)}
    >
      {icon}
    </button>
  );
}
