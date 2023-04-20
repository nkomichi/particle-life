import { Canvas } from "./Canvas.js";
import { tick } from "./Universe.js";
const canvasSettings = {
    color: "black",
    size: { x: 500, y: 500 },
};
const canvas = new Canvas('main-canvas', canvasSettings);
const red = {
    name: 'red',
    color: '#ff0000',
    radius: 1,
    factors: [],
};
const blue = {
    name: 'blue',
    color: '#0000ff',
    radius: 1,
    factors: [],
};
const species = [
    red,
    blue,
];
red.factors = [0, 1];
blue.factors = [-1, 0.5];
const particles = [];
particles.push({
    species: red,
    position: { x: 0.0, y: 0.0 },
    velocity: { x: 0.0, y: 0.0 },
});
particles.push({
    species: blue,
    position: { x: 1.0, y: 1.0 },
    velocity: { x: 0.0, y: 0.0 },
});
const render = (canvas, universe) => {
    canvas.fill();
    for (const particle of universe.population) {
        canvas.plot(particle.species.color, particle.position);
    }
};
const mainLoop = (universe, canvas) => {
    const maxTime = 1;
    for (let i = 0; i < maxTime; i++) {
        console.log(universe.population);
        universe = tick(universe);
        render(canvas, universe);
    }
};
const universe = {
    size: canvas.settings.size,
    species: species,
    population: particles,
    step: 0,
};
mainLoop(universe, canvas);
