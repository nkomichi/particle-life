import { Vector, addVector, subVector, mulVector, divVector, distanceOfVector } from "./Vector.js";

type Particle = {
  species: Species;
  position: Coordinates;
  velocity: Velocity;
  force: Force;
}

type Species = {
  name: string;
  color: string;
  mass: number;
  radius: number;
  affinity: Map<Species, number>;
}

type Coordinates = Vector
type Velocity = Vector
type Force = Vector

function affinity(subject: Coordinates, object: Coordinates, factor: number): Force {
  const cutoff = 250;
  const distance = distanceOfVector(subject, object);
  if (distance > cutoff) {
    return {x: 0.0, y: 0.0};
  }
  return mulVector(subVector(object, subject), factor / (distance ** 2));
}

function collision(subject: Coordinates, object: Coordinates, radius: number): Force {
  const distance = distanceOfVector(subject, object);
  if (distance > radius) {
    return { x: 0.0, y: 0.0 };
  }
  const unit = divVector(subVector(subject, object), distance);
  return mulVector(unit, (radius - distance));
}

function moveParticle(particle: Particle): void {
  const acceleration = divVector(particle.force, particle.species.mass);
  particle.force = { x: 0.0, y: 0.0 };
  particle.velocity = addVector(particle.velocity, acceleration)
  particle.position = addVector(particle.position, particle.velocity);
}

export { Species, Particle, moveParticle, affinity, collision };
