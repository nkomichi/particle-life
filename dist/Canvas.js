class Canvas {
    settings;
    element;
    context;
    constructor(id, settings) {
        this.settings = settings;
        const mainCanvas = document.querySelector(`#${id}`);
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
    setSize() {
        this.element.width = this.settings.size.x;
        this.element.height = this.settings.size.y;
    }
    fill() {
        this.context.fillStyle = this.settings.color;
        this.context.fillRect(0, 0, this.settings.size.x, this.settings.size.y);
    }
    plot(color, coordinates) {
        this.context.fillStyle = color;
        this.context.fillRect(coordinates.x - 2, coordinates.y - 2, 4, 4);
    }
}
export { Canvas };
