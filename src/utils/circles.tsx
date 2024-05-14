import { Algorithm } from "./base";

export class MidPointCircle extends Algorithm {
  drawColor: string = "black";

  constructor() {
    super(2); // 2 input. center and second for radius
  }

  addInput(dataX: number, dataY: number, color: string): void {
    dataX = Math.floor(dataX / 10) * 10;
    dataY = Math.floor(dataY / 10) * 10;
    this.drawColor = color;
    super.addInput(dataX, dataY, color);
  }

  run() {
    this.midPointCircle();
  }

  // Midpoint Circle algorithm
  midPointCircle() {
    const { x: x1, y: y1 } = this.inputBuffer[0];
    const { x: x2, y: y2 } = this.inputBuffer[1];
    const r = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    let x = 0;
    let y = r;
    let p = 1 - r;

    while (x < y) {
      if (p < 0) {
        p += 2 * x + 1;
      } else {
        y--;
        p += 2 * (x - y) + 1;
      }
      [
        [x, y],
        [x, -y],
        [-x, y],
        [-x, -y],
        [y, x],
        [-y, x],
        [y, -x],
        [-y, -x],
      ].forEach(([x, y]) => {
        this.result.push({ x: x1 + x, y: y1 + y, color: this.drawColor });
      });
      x++;
    }
  }
}
