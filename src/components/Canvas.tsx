import { useEffect } from "react";
import { drawGrid, drawPixel, erasePixel } from "../utils/draw";

interface CanvasProps {
  algo: string;
  clear: boolean;
  mode: string;
  color: string;
  setClear: (clear: boolean) => void;
}

export default function Canvas({
  algo,
  clear,
  mode,
  color,
  setClear,
}: CanvasProps) {
  if (clear) {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    drawGrid(canvas);
  }

  useEffect(() => {
    setClear(false);
  }, [clear, setClear]);

  let isDrawing = false;
  const drawOnCanvas = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }

    if (mode === "draw") {
      drawPixel(
        event.target as HTMLCanvasElement,
        event.clientX + window.scrollX,
        event.clientY + window.scrollY,
        color
      );
    } else if (mode === "erase") {
      erasePixel(
        event.target as HTMLCanvasElement,
        event.clientX + window.scrollX,
        event.clientY + window.scrollY
      );
    }
  };

  useEffect(() => {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;

    drawGrid(canvas);
  }, []);

  return (
    <canvas
      className="bg-gray-200 m-1 p-1"
      width="800"
      height="600"
      onMouseMove={drawOnCanvas}
      onMouseDown={(event) => {
        isDrawing = true;
        drawOnCanvas(event);
      }}
      onMouseUp={() => (isDrawing = false)}
    />
  );
}
