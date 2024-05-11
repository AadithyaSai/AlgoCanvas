import { useState } from "react";

interface OptionsBarProps {
  mode: string;
  onAlgoChange: (algo: string) => void;
  onClear: (clear: boolean) => void;
  onModeChange: (mode: string) => void;
}

export function OptionsBar({
  mode,
  onAlgoChange,
  onClear,
  onModeChange,
}: OptionsBarProps) {
  const [algo, setAlgo] = useState("");

  return (
    <div className="flex items-center justify-between">
      <div className="flex">
        <div className="flex bg-gray-700 m-1 rounded">
          <button
            className={`text-white rounded px-1.5 py-1 m-1 ${
              mode === "draw"
                ? "bg-green-700  hover:bg-green-600"
                : "bg-transparent border border-gray-500 hover:bg-gray-800"
            }`}
            title="Draw"
            onClick={() => onModeChange("draw")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
            </svg>
          </button>
          <button
            className={`text-white rounded px-1.5 py-1 m-1 focus:outline-none ${
              mode === "erase"
                ? "bg-green-700  hover:bg-green-600"
                : "bg-transparent border border-gray-500 hover:bg-gray-800"
            }`}
            title="Erase"
            onClick={() => onModeChange("erase")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h5"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            className={`text-white rounded px-1.5 py-1 m-1 focus:outline-none ${
              mode === "algo"
                ? "bg-green-700  hover:bg-green-600"
                : "bg-transparent border border-gray-500 hover:bg-gray-800"
            }`}
            title="Algorithm"
            onClick={() => onModeChange("algo")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm14.25 6a.75.75 0 0 1-.22.53l-2.25 2.25a.75.75 0 1 1-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 1 1 1.06-1.06l2.25 2.25c.141.14.22.331.22.53Zm-10.28-.53a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06L8.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-2.25 2.25Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <button
          className="text-white bg-red-600 hover:bg-red-500 rounded px-2 py-1.5 m-1"
          title="Clear"
          onClick={() => onClear(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className={`me-1 mt-1 ${mode === "algo" ? "block" : "hidden"}`}>
        <label htmlFor="algo" className="sr-only">
          Choose an algorithm
        </label>
        <select
          id="algo"
          name="algo"
          value={algo}
          className="block py-2.5 px-1.5 w-full text-sm text-gray-600 rounded border-0 border-b-2 border-gray-200"
          onChange={(e) => setAlgo(e.target.value)}
        >
          <optgroup label="Line Drawing Algorithms">
            <option value="dda">DDA Line</option>
            <option value="bresenhamLine">Bresenham's Line</option>
          </optgroup>
          <optgroup label="Circle Drawing Algorithms">
            <option value="midPointCircle">Midpoint Circle Drawing</option>
          </optgroup>
          <optgroup label="Fill Algorithms">
            <option value="floodFill">Flood Fill</option>
            <option value="boundaryFill">Boundary Fill</option>
          </optgroup>
        </select>
      </div>
    </div>
  );
}
