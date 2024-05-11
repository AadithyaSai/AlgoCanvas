// Draw a pixel on canvas
export function drawPixel(
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  pixSize: number = 10,
  color: string = "black"
) {
  const ctx = canvas.getContext("2d");
  console.log(canvas.offsetLeft, canvas.offsetTop);
  if (ctx) {
    ctx.fillStyle = color;
    let pixX = Math.floor((x - canvas.offsetLeft) / 10) * 10;
    let pixY = Math.floor((y - canvas.offsetTop) / 10) * 10;
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
      Math.floor((x - canvas.offsetLeft) / pixSize) * pixSize,
      Math.floor((y - canvas.offsetTop) / pixSize) * pixSize,
      pixSize,
      pixSize
    );

    ctx.strokeRect(
      Math.floor((x - canvas.offsetLeft) / pixSize) * pixSize,
      Math.floor((y - canvas.offsetTop) / pixSize) * pixSize,
      pixSize,
      pixSize
    );
  }
}

// Draw a grid on canvas
export function drawGrid(
  canvas: HTMLCanvasElement,
  pixSize: number = 10,
  color: string = "#999"
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
