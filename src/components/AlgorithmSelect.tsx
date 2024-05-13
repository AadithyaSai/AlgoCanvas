interface AlgorithmSelectProps {
  algo: string;
  onAlgoChange: (algo: string) => void;
}

export default function AlgorithmSelect({
  algo,
  onAlgoChange,
}: AlgorithmSelectProps) {
  return (
    <div>
      <label htmlFor="algo" className="sr-only">
        Choose an algorithm
      </label>
      <select
        id="algo"
        name="algo"
        value={algo}
        className="block py-2.5 px-1.5 w-full text-sm text-white rounded border-0 border-gray-200 bg-gray-800 focus:ring-0 focus:border-gray-300 focus:bg-gray-900 hover:bg-gray-900"
        onChange={(e) => onAlgoChange(e.target.value)}
      >
        <optgroup label="Line Drawing Algorithms">
          <option value="dda">DDA Line</option>
          <option value="bresenhamLine">Bresenham's Line</option>
        </optgroup>
        <optgroup label="Circle Drawing Algorithms">
          <option value="midPointCircle">Midpoint Circle Drawing</option>
        </optgroup>
        <optgroup label="Fill Algorithms">
          <option value="floodFill4">4 Point Flood Fill</option>
          <option value="floodFill8">8 Point Flood Fill</option>
        </optgroup>
      </select>
    </div>
  );
}
