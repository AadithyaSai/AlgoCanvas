export let winX = 800;
export let winY = 600;
let scale = 10;

// Set the window bounds
export function setWindowBounds(w: number, h: number, pixSize: number = 10) {
  winX = w;
  winY = h;
  scale = pixSize;
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
  abstract draw(canvas: HTMLCanvasElement): void;
}
