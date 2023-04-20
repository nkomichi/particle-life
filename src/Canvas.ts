import { Vector } from "./Vector.js";

type CanvasSettings = {
  color: string;
  size: { x: number, y: number };
}

class Canvas {
  settings: CanvasSettings;
  element: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(id: string, settings: CanvasSettings) {
    this.settings = settings;
    const mainCanvas = document.querySelector<HTMLCanvasElement>(`#${id}`);
    if (mainCanvas === null) {
      throw new Error('Main canvas not found.');
    }
    const mainCanvasContext = mainCanvas.getContext('2d');
    if (mainCanvasContext === null) {
      throw new Error('Cannot get context.');
    }
    this.element = mainCanvas;
    this.context = mainCanvasContext;
    this.setSize();
    this.fill();
  }

  setSize(): void {
    this.element.width = this.settings.size.x;
    this.element.height = this.settings.size.y;
  }

  fill(): void {
    this.context.fillStyle = this.settings.color;
    this.context.fillRect(0, 0, this.settings.size.x, this.settings.size.y);
  }

  plot(color: string, coordinates: Vector): void {
    this.context.fillStyle = color;
    this.context.fillRect(coordinates.x - 5, coordinates.y - 5, coordinates.x + 5, coordinates.y + 5)
  }
}

export { Canvas, CanvasSettings };