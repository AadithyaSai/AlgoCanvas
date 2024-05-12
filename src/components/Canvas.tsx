import { useEffect } from "react";
import { drawGrid, drawPixel, erasePixel } from "../utils/draw";
import { Algorithm } from "../utils/base";
import { FloodFill } from "../utils/fill";
import { BresenhamLine, DDALine } from "../utils/lines";

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
  let canvas = document.getElementById("main-canvas") as HTMLCanvasElement;
  let grid = document.getElementById("grid-canvas") as HTMLCanvasElement;
  let algorithm: Algorithm | null = null;

  if (clear) {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
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
        canvas,
        event.pageX - event.currentTarget.offsetLeft,
        event.pageY - event.currentTarget.offsetTop,
        color
      );
    } else if (mode === "erase") {
      erasePixel(
        canvas,
        event.pageX - event.currentTarget.offsetLeft,
        event.pageY - event.currentTarget.offsetTop
      );
    } else if (mode === "algorithm") {
      isDrawing = false;
      const imageData = canvas
        .getContext("2d")!
        .getImageData(0, 0, canvas.width, canvas.height);

      if (algorithm === null) {
        switch (algo) {
          case "dda":
            algorithm = new DDALine();
            break;
          case "bresenhamLine":
            algorithm = new BresenhamLine();
            break;
          case "floodFill":
            algorithm = new FloodFill(color, imageData);
            break;
          default:
            break;
        }
      }
      algorithm?.addInput(
        event.pageX - event.currentTarget.offsetLeft,
        event.pageY - event.currentTarget.offsetTop,
        color
      );
      if (algorithm?.readyToRun()) {
        algorithm?.run();
        algorithm?.draw(canvas);
        algorithm = null;
      }
    }
  };

  useEffect(() => {
    canvas = document.getElementById("main-canvas") as HTMLCanvasElement;
    grid = document.getElementById("grid-canvas") as HTMLCanvasElement;
    drawGrid(grid);
  }, []);

  return (
    <div className="grid">
      <canvas
        id="main-canvas"
        className="col-start-1 row-start-1 z-1 mx-1 p-1 bg-gray-300"
        width="800"
        height="600"
        onMouseMove={drawOnCanvas}
        onMouseDown={(event) => {
          isDrawing = true;
          drawOnCanvas(event);
        }}
        onMouseUp={() => (isDrawing = false)}
      />
      <canvas
        id="grid-canvas"
        className="col-start-1 row-start-1 z-0 mx-1 p-1 pointer-events-none"
        width="800"
        height="600"
      />
    </div>
  );
}
