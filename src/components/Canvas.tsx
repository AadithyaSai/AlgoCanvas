import { useEffect } from "react";
import { clearCanvas, drawGrid, drawPixel, erasePixel } from "../utils/draw";
import { Algorithm } from "../utils/base";
import { FloodFill } from "../utils/fill";
import { BresenhamLine, DDALine } from "../utils/lines";
import { MidPointCircle } from "../utils/circles";

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
  let preview = document.getElementById("preview-canvas") as HTMLCanvasElement;

  let algorithm: Algorithm | null = null;

  if (clear) {
    clearCanvas(canvas);
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

      let imageData: ImageData;
      if (algorithm === null) {
        switch (algo) {
          case "dda":
            algorithm = new DDALine();
            break;
          case "bresenhamLine":
            algorithm = new BresenhamLine();
            break;
          case "midPointCircle":
            algorithm = new MidPointCircle();
            break;
          case "floodFill4":
            imageData = canvas
              .getContext("2d")!
              .getImageData(0, 0, canvas.width, canvas.height);
            algorithm = new FloodFill(color, imageData, false);
            break;
          case "floodFill8":
            imageData = canvas
              .getContext("2d")!
              .getImageData(0, 0, canvas.width, canvas.height);
            algorithm = new FloodFill(color, imageData, true);
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
      drawPixel(
        preview,
        event.pageX - event.currentTarget.offsetLeft,
        event.pageY - event.currentTarget.offsetTop,
        color + "80"
      );
      if (algorithm?.readyToRun()) {
        algorithm?.run();
        algorithm?.draw(canvas);
        clearCanvas(preview);
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
      <canvas
        id="preview-canvas"
        className="col-start-1 row-start-1 z-2 mx-1 p-1 pointer-events-none"
        width="800"
        height="600"
      />
    </div>
  );
}
