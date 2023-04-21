import { Canvas, CanvasSettings } from "./Canvas.js";
import { Species, Particle } from "./Particle.js";
import { Universe, tick } from "./Universe.js";

const canvasSettings: CanvasSettings = {
  color: "black",
  size: { x: 500, y: 500 },
}

const canvas = new Canvas('main-canvas', canvasSettings);

const red: Species = {
  name: 'red',
  color: '#ff0000',
  radius: 1,
  affinity: new Map<Species, number>(),
};

const blue: Species = {
  name: 'blue',
  color: '#0000ff',
  radius: 1,
  affinity: new Map<Species, number>(),
};

const species: Species[] = [
  red,
  blue,
];

red.affinity.set(red, 0);
red.affinity.set(blue, 1);
blue.affinity.set(red, -1);
blue.affinity.set(blue, 0.5);


const particles: Particle[] = [];
particles.push(
  {
    species: red,
    position: { x: 0.0, y: 0.0 },
    velocity: { x: 0.0, y: 0.0 },
  }
);
particles.push(
  {
    species: blue,
    position: { x: 1.0, y: 1.0 },
    velocity: { x: 0.0, y: 0.0 },
  }
);

const render = (canvas: Canvas, universe: Universe): void => {
  canvas.fill();
  for (const particle of universe.population) {
    canvas.plot(particle.species.color, particle.position);
  }
};


const mainLoop = (universe: Universe, canvas: Canvas) => {
  const maxTime = 1;
  for (let i = 0; i < maxTime; i++) {
    console.log(universe.population);
    universe = tick(universe);
    render(canvas, universe);
  }
}

const universe: Universe = {
  size: canvas.settings.size,
  species: species,
  population: particles,
  step: 0,
}


mainLoop(universe, canvas);
