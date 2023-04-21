import { Vector, addVector } from "./Vector.js";
import { Species, Particle, moveParticle, affinity, collision } from "./Particle.js";

class Universe {
  size: Vector;
  species: Species[];
  population: Particle[];
  step: number;
  constructor(size: Vector, species: Species[], population: Particle[]) {
    this.size = size;
    this.species = species;
    this.population = population;
    this.step = 0;
  }

  tick(): void {
    calculateForces(this.population, this.size);
    moveParticles(this.population);
    fixPosition(this.population, this.size);
    this.step++;
  }
}

function interact(subject: Particle, object: Particle): Vector {
  const factor = subject.species.affinity.get(object.species) || 0;
  const force1 = affinity(subject.position, object.position, factor);
  const force2 = collision(subject.position, object.position, subject.species.radius + object.species.radius);
  return addVector(force1, force2);
}

function calculateForces(particles: Particle[], worldSize: Vector): void {
  for (const subject of particles) {
    for (const object of particles) {
      if (subject === object) {
        continue;
      }
      const mirrorObject = getMirrorObject(subject, object, worldSize);
      const force = interact(subject, mirrorObject);
      subject.force = addVector(subject.force, force);
    }
  }
}

function getMirrorObject(subject: Particle, object: Particle, worldSize: Vector): Particle {
  const mirrorPosition: Vector = {x: object.position.x, y: object.position.y};
  if (object.position.x - subject.position.x > worldSize.x / 2) {
    mirrorPosition.x = object.position.x - worldSize.x;
  } else if (subject.position.x - object.position.x > worldSize.x / 2) {
    mirrorPosition.x = object.position.x + worldSize.x;
  }
  if (object.position.y - subject.position.y > worldSize.y / 2) {
    mirrorPosition.y = object.position.y - worldSize.y;
  } else if (subject.position.y - object.position.y > worldSize.y / 2) {
    mirrorPosition.y = object.position.y + worldSize.y;
  }
  return {
    species: object.species,
    position: mirrorPosition,
    force: object.position,
    velocity: object.velocity,
  };
}

function moveParticles(particles: Particle[]): void {
  for (const particle of particles) {
    moveParticle(particle);
  }
}

function fixPosition(particles: Particle[], worldSize: Vector): void {
  for (const particle of particles) {
    if (particle.position.x < 0) { particle.position.x += worldSize.x }
    if (particle.position.x >= worldSize.x) { particle.position.x -= worldSize.y }
    if (particle.position.y < 0) { particle.position.y += worldSize.y }
    if (particle.position.y >= worldSize.y) { particle.position.y -= worldSize.y }
  }
}

export { Universe };
