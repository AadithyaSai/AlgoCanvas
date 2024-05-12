import { Algorithm } from "./base";
import { drawPixel } from "./draw";

export class DDALine extends Algorithm {
  drawColor: string = "black";

  constructor() {
    super(2); // 2 input
  }

  addInput(dataX: number, dataY: number, color: string): void {
    dataX = Math.floor(dataX / 10) * 10;
    dataY = Math.floor(dataY / 10) * 10;
    this.drawColor = color;
    super.addInput(dataX, dataY, color);
  }

  run() {
    this.dda();
  }

  draw(canvas: HTMLCanvasElement) {
    this.result.forEach((point) => {
      drawPixel(canvas, point.x, point.y, this.drawColor);
    });
  }

  // DDA algorithm
  dda() {
    const { x: x1, y: y1 } = this.inputBuffer[0];
    const { x: x2, y: y2 } = this.inputBuffer[1];
    let dx = x2 - x1;
    let dy = y2 - y1;
    let steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
    let xInc = dx / steps;
    let yInc = dy / steps;
    let x = x1;
    let y = y1;

    for (let i = 0; i <= steps; i++) {
      this.result.push({ x: Math.round(x), y: Math.round(y), color: "" });
      x += xInc;
      y += yInc;
    }
  }
}

export class BresenhamLine extends Algorithm {
  drawColor: string = "black";

  constructor() {
    super(2); // 2 input
  }

  addInput(dataX: number, dataY: number, color: string): void {
    dataX = Math.floor(dataX / 10) * 10;
    dataY = Math.floor(dataY / 10) * 10;
    this.drawColor = color;
    super.addInput(dataX, dataY, color);
  }

  run() {
    this.bresenham();
  }

  draw(canvas: HTMLCanvasElement) {
    this.result.forEach((point) => {
      drawPixel(canvas, point.x, point.y, this.drawColor);
    });
  }

  // Bresenham algorithm
  bresenham() {
    const { x: x1, y: y1 } = this.inputBuffer[0];
    const { x: x2, y: y2 } = this.inputBuffer[1];
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let p = 2 * dy - dx;
    let twoDy = 2 * dy;
    let twoDyMinusDx = 2 * (dy - dx);
    let x, y, xEnd;

    if (x1 > x2) {
      x = x2;
      y = y2;
      xEnd = x1;
    } else {
      x = x1;
      y = y1;
      xEnd = x2;
    }

    this.result.push({ x, y, color: "" });

    while (x < xEnd) {
      x++;
      if (p < 0) {
        p += twoDy;
      } else {
        y++;
        p += twoDyMinusDx;
      }
      this.result.push({ x, y, color: "" });
    }
  }
}
