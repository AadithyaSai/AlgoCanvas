import { useEffect, useRef } from "react";
import {
  clearCanvas,
  drawGrid,
  drawPixel,
  erasePixel,
  resizeCanvas,
} from "../utils/draw";
import { Algorithm, getMousePos, setWindowBounds } from "../utils/base";
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
  const canvas = useRef<HTMLCanvasElement>(null);
  const grid = useRef<HTMLCanvasElement>(null);
  const preview = useRef<HTMLCanvasElement>(null);

  let algorithm: Algorithm | null = null;
  let isDrawing = false;

  if (clear) {
    clearCanvas(canvas.current!);
  }

  const drawOnCanvas = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }
    const { x: xPos, y: yPos } = getMousePos(canvas.current!, event);
    if (mode === "draw") {
      drawPixel(canvas.current!, xPos, yPos, color);
    } else if (mode === "erase") {
      erasePixel(canvas.current!, xPos, yPos);
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
      algorithm?.addInput(xPos, yPos, color);
      drawPixel(preview.current!, xPos, yPos, color + "80");
      if (algorithm?.readyToRun()) {
        algorithm?.run();
        algorithm?.draw(canvas.current!);
        clearCanvas(preview.current!);
        algorithm = null;
      }
    }
  };

  useEffect(() => {
    setClear(false);
  }, [clear, setClear]);

  useEffect(() => {
    canvas.current!.addEventListener("touchmove", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const touch = event.touches[0];
      canvas.current!.dispatchEvent(
        new MouseEvent("mousemove", {
          bubbles: true,
          clientX: touch.clientX,
          clientY: touch.clientY,
        })
      );
    });

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = Math.floor(entry.contentRect.width / 100) * 100;
        if (entry.contentRect.width !== width) {
          const height = width;
          setWindowBounds(width, height);
          resizeCanvas(canvas.current!, width, height, true);
          resizeCanvas(grid.current!, width, height);
          resizeCanvas(preview.current!, width, height);
          drawGrid(grid.current!, "#888");
        }
      }
    });
    resizeObserver.observe(canvas.current!.parentElement!);
    drawGrid(grid.current!, "#888");

    () => {
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <div className="grid w-full">
      <canvas
        ref={canvas}
        id="main-canvas"
        className="col-start-1 row-start-1 z-1 mx-1 p-1 bg-gray-700 rounded cursor-crosshair w-full"
        onMouseMove={drawOnCanvas}
        onMouseDown={(event) => {
          isDrawing = true;
          drawOnCanvas(event);
        }}
        onMouseUp={() => (isDrawing = false)}
        onTouchStart={() => (isDrawing = true)}
        onTouchEnd={() => (isDrawing = false)}
      />
      <canvas
        ref={grid}
        id="grid-canvas"
        className="col-start-1 row-start-1 z-0 mx-1 p-1 pointer-events-none w-full"
      />
      <canvas
        ref={preview}
        id="preview-canvas"
        className="col-start-1 row-start-1 z-2 mx-1 p-1 pointer-events-none w-full"
      />
    </div>
  );
}
