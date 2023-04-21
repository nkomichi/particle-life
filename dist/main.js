import { Canvas } from "./Canvas.js";
import { Universe } from "./Universe.js";
const canvasSettings = {
    color: "black",
    size: { x: 500, y: 500 },
};
const canvas = new Canvas('main-canvas', canvasSettings);
const red = {
    name: 'red',
    color: '#ff0000',
    mass: 10,
    radius: 10,
    affinity: new Map(),
};
const blue = {
    name: 'blue',
    color: '#0000ff',
    mass: 5,
    radius: 1,
    affinity: new Map(),
};
const species = [
    red,
    blue,
];
red.affinity.set(red, 10);
red.affinity.set(blue, 0);
blue.affinity.set(red, 0);
blue.affinity.set(blue, 1);
const particles = [];
for (let i = 0; i < 100; i++) {
    particles.push({
        species: red,
        position: { x: Math.random() * 500, y: Math.random() * 500 },
        velocity: { x: 0.0, y: 0.0 },
        force: { x: 0.0, y: 0.0 },
    });
    particles.push({
        species: blue,
        position: { x: Math.random() * 500, y: Math.random() * 500 },
        velocity: { x: 0.0, y: 0.0 },
        force: { x: 0.0, y: 0.0 },
    });
}
const render = (canvas, universe) => {
    canvas.fill();
    for (const particle of universe.population) {
        canvas.plot(particle.species.color, particle.position);
    }
};
const mainLoop = (universe, canvas, maxTime) => {
    setInterval(() => {
        universe.tick();
        render(canvas, universe);
    }, 100);
};
const universe = new Universe(canvas.settings.size, species, particles);
mainLoop(universe, canvas, 100);
