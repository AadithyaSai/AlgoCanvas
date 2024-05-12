import { Algorithm, pixelToColor, winX, winY } from "./base";
import { drawPixel } from "./draw";

export class FloodFill extends Algorithm {
  private imageData: ImageData;
  private fillColor: string;
  private startColor: string = "";

  constructor(fillColor: string, imageData: ImageData) {
    super(1); // 1 input
    this.fillColor = fillColor + "ff"; // add alpha channel. assume canvas does not support opacity
    this.imageData = imageData;
  }

  addInput(dataX: number, dataY: number): void {
    const idx = (dataY * this.imageData.width + dataX) * 4;
    this.startColor = pixelToColor(this.imageData.data.slice(idx, idx + 4));
    dataX = Math.floor(dataX / 10) * 10;
    dataY = Math.floor(dataY / 10) * 10;
    super.addInput(dataX, dataY, this.startColor);
  }

  run() {
    if (this.inputBuffer.length === 0) throw new Error("No input data");
    const { x, y } = this.inputBuffer[0];
    this.floodFill(x, y);
  }

  draw(canvas: HTMLCanvasElement) {
    this.result.forEach((point) => {
      drawPixel(canvas, point.x, point.y, this.fillColor);
    });
  }

  // iterative for performance in JS
  floodFill(x: number, y: number) {
    const stack = [{ x, y }];
    while (stack.length > 0) {
      const { x, y } = stack.pop()!;
      const index = (y * this.imageData.width + x) * 4;
      if (x < 0 || y < 0 || x >= winX || y >= winY) continue;
      if (
        pixelToColor(this.imageData.data.slice(index, index + 4)) ===
        this.startColor
      ) {
        this.result.push({ x, y, color: this.fillColor });
        this.imageData.data[index] = 1;
        this.imageData.data[index + 1] = 2;
        this.imageData.data[index + 2] = 0;
        [
          { x: x + 10, y },
          { x: x - 10, y },
          { x, y: y + 10 },
          { x, y: y - 10 },
        ].forEach((neighbour) => {
          stack.push(neighbour);
        });
      }
    }
  }
}
