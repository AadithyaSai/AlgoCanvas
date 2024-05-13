import { useEffect, useRef, useState } from "react";
import { clearCanvas, drawGrid, drawPixel, erasePixel } from "../utils/draw";
import { Algorithm, setWindowBounds } from "../utils/base";
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
  let canvas = useRef<HTMLCanvasElement>(null);
  let grid = useRef<HTMLCanvasElement>(null);
  let preview = useRef<HTMLCanvasElement>(null);

  let [h, setH] = useState(600);
  let [w, setW] = useState(800);
  let algorithm: Algorithm | null = null;

  if (clear) {
    clearCanvas(canvas.current!);
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
        canvas.current!,
        event.pageX - event.currentTarget.offsetLeft,
        event.pageY - event.currentTarget.offsetTop,
        color
      );
    } else if (mode === "erase") {
      erasePixel(
        canvas.current!,
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
              .current!.getContext("2d")!
              .getImageData(
                0,
                0,
                canvas.current!.width,
                canvas.current!.height
              );
            algorithm = new FloodFill(color, imageData, false);
            break;
          case "floodFill8":
            imageData = canvas
              .current!.getContext("2d")!
              .getImageData(
                0,
                0,
                canvas.current!.width,
                canvas.current!.height
              );
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
        preview.current!,
        event.pageX - event.currentTarget.offsetLeft,
        event.pageY - event.currentTarget.offsetTop,
        color + "80"
      );
      if (algorithm?.readyToRun()) {
        algorithm?.run();
        algorithm?.draw(canvas.current!);
        clearCanvas(preview.current!);
        algorithm = null;
      }
    }
  };

  useEffect(() => {
    setWindowBounds(w, h);
    drawGrid(grid.current!, "#888");
  }, [w, h]);

  return (
    <div className="grid">
      <canvas
        ref={canvas}
        id="main-canvas"
        className="col-start-1 row-start-1 z-1 mx-1 p-1 bg-gray-700 rounded cursor-crosshair"
        width={w}
        height={h}
        onMouseMove={drawOnCanvas}
        onMouseDown={(event) => {
          isDrawing = true;
          drawOnCanvas(event);
        }}
        onMouseUp={() => (isDrawing = false)}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
        onClick={(e) => {
          if (e.ctrlKey) {
            setW(w - 100);
            setH(h - 100);
          } else if (e.shiftKey) {
            setW(w + 100);
            setH(h + 100);
          }
        }}
      />
      <canvas
        ref={grid}
        id="grid-canvas"
        className="col-start-1 row-start-1 z-0 mx-1 p-1 pointer-events-none"
        width={w}
        height={h}
      />
      <canvas
        ref={preview}
        id="preview-canvas"
        className="col-start-1 row-start-1 z-2 mx-1 p-1 pointer-events-none"
        width={w}
        height={h}
      />
    </div>
  );
}
