// Draw a pixel on canvas
export function drawPixel(
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  color: string = "black",
  pixSize: number = 10
) {
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.fillStyle = color;
    let pixX = Math.floor(x / 10) * 10;
    let pixY = Math.floor(y / 10) * 10;
    ctx.fillRect(pixX, pixY, pixSize, pixSize);
  }
}

// Erase a pixel on canvas
export function erasePixel(
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  pixSize: number = 10
) {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx;
    ctx.clearRect(
      Math.floor(x / pixSize) * pixSize,
      Math.floor(y / pixSize) * pixSize,
      pixSize,
      pixSize
    );
  }
}

// Draw a grid on canvas
export function drawGrid(
  canvas: HTMLCanvasElement,
  color: string = "#999",
  pixSize: number = 10
) {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.strokeStyle = color;

    ctx.moveTo(1, 0);
    ctx.lineTo(0, canvas.height);
    ctx.stroke();

    for (let i = pixSize; i <= canvas.width; i += pixSize) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }

    ctx.moveTo(0, 1);
    ctx.lineTo(canvas.width, 0);
    ctx.stroke();

    for (let i = pixSize; i <= canvas.height; i += pixSize) {
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
  }
}
