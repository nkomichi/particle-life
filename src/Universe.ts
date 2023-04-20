import { Vector, addVector } from "./Vector.js";
import { Species, Particle, moveParticle, affinity } from "./Particle.js";

type Universe = {
  size: Vector;
  species: Species[];
  population: Particle[];
  step: number;
}

function tick(universe: Universe): Universe {
  return {
    size: universe.size,
    species: universe.species,
    population: moveParticles(universe),
    step: universe.step + 1,
  }
}

function interact(subject: Particle, object: Particle, species: Species[]): Particle {
  const factor = subject.species.factors[species.indexOf(object.species)];
  const force = affinity(subject.position, object.position, factor);
  return {
    species: subject.species,
    position: subject.position,
    velocity: addVector(subject.velocity, force),
  }
}

function moveParticles(universe: Universe): Particle[] {
  return universe.population.map((particle) => {
    const newParticle = universe.population.reduce((previousValue, currentValue) => {
      if (currentValue === particle) {
        return previousValue;
      } else {
        return interact(previousValue, currentValue, universe.species);
      }
    }, particle)
    return moveParticle(newParticle, universe.size);
  });
}

export { Universe, tick };