import { drawPixel } from "./draw";

let winX = 800;
let winY = 600;

// Set the window bounds
export function setWindowBounds(w: number, h: number) {
  winX = w;
  winY = h;
}

// Get the window bounds
export function getWindowBounds() {
  return { x: winX, y: winY };
}

// Convert imagedata pixel into a hex color string
export function pixelToColor(pixel: Uint8ClampedArray) {
  const r = pixel[0].toString(16).padStart(2, "0");
  const g = pixel[1].toString(16).padStart(2, "0");
  const b = pixel[2].toString(16).padStart(2, "0");
  const a = pixel[3].toString(16).padStart(2, "0");

  return `#${r}${g}${b}${a}`;
}

type Point = { x: number; y: number; color: string };

// algorithm base class
export abstract class Algorithm {
  inputBuffer: Point[];
  expectedInput: number;
  result: Point[];
  constructor(expectedInput: number) {
    this.inputBuffer = [];
    this.result = [];
    this.expectedInput = expectedInput;
  }
  // add to input buffer
  addInput(dataX: number, dataY: number, color: string) {
    this.inputBuffer.push({ x: dataX, y: dataY, color: color });
  }

  readyToRun() {
    return this.inputBuffer.length === this.expectedInput;
  }

  // run the algorithm
  abstract run(): void;

  // draw the results
  draw(canvas: HTMLCanvasElement) {
    this.result.forEach((point) => {
      drawPixel(canvas, point.x, point.y, point.color);
    });
  }
}
