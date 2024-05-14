import { Algorithm } from "./base";

export class DDALine extends Algorithm {
  drawColor: string = "black";

  constructor() {
    super(2); // 2 input
  }

  addInput(dataX: number, dataY: number, color: string): void {
    dataX = Math.floor(dataX / 10);
    dataY = Math.floor(dataY / 10);
    this.drawColor = color;
    super.addInput(dataX, dataY, color);
  }

  run() {
    this.dda();
  }

  // DDA algorithm
  dda() {
    const { x: x1, y: y1 } = this.inputBuffer[0];
    const { x: x2, y: y2 } = this.inputBuffer[1];
    const dx = x2 - x1;
    const dy = y2 - y1;
    const steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
    const xInc = dx / steps;
    const yInc = dy / steps;
    let x = x1;
    let y = y1;

    for (let i = 0; i <= steps; i++) {
      this.result.push({
        x: Math.round(x) * 10,
        y: Math.round(y) * 10,
        color: this.drawColor,
      });
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

  // Bresenham algorithm. Source: Wikipedia
  bresenham() {
    const { x: x1, y: y1 } = this.inputBuffer[0];
    const { x: x2, y: y2 } = this.inputBuffer[1];

    if (Math.abs(y2 - y1) < Math.abs(x2 - x1)) {
      if (x1 > x2) {
        this.bresenhamLow(x2, y2, x1, y1);
      } else {
        this.bresenhamLow(x1, y1, x2, y2);
      }
    } else {
      if (y1 > y2) {
        this.bresenhamHigh(x2, y2, x1, y1);
      } else {
        this.bresenhamHigh(x1, y1, x2, y2);
      }
    }
  }

  bresenhamLow(x1: number, y1: number, x2: number, y2: number) {
    const dx = x2 - x1;
    let dy = y2 - y1;
    let yIncr = 10;

    if (dy < 0) {
      yIncr = -yIncr;
      dy = -dy;
    }

    let p = 2 * dy - dx;
    const twoDy = 2 * dy;
    const twoDyMinusDx = 2 * (dy - dx);
    let y = y1;

    for (let x = x1; x <= x2; x += 10) {
      this.result.push({ x, y, color: this.drawColor });
      if (p < 0) {
        p += twoDy;
      } else {
        y += yIncr;
        p += twoDyMinusDx;
      }
    }
  }

  bresenhamHigh(x1: number, y1: number, x2: number, y2: number) {
    let dx = x2 - x1;
    const dy = y2 - y1;
    let xIncr = 10;

    if (dx < 0) {
      xIncr = -xIncr;
      dx = -dx;
    }

    let p = 2 * dx - dy;
    const twoDx = 2 * dx;
    const twoDxMinusDy = 2 * (dx - dy);
    let x = x1;

    for (let y = y1; y <= y2; y += 10) {
      this.result.push({ x, y, color: this.drawColor });
      if (p < 0) {
        p += twoDx;
      } else {
        x += xIncr;
        p += twoDxMinusDy;
      }
    }
  }
}
