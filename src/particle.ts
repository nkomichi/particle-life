import { Vector, addVector, subVector, mulVector, distanceOfVector } from "./Vector.js";

type Particle = {
  species: Species;
  position: Coordinates;
  velocity: Velocity;
}

type Species = {
  name: string;
  color: string;
  radius: number;
  affinity: Map<Species, number>;
}

type Coordinates = Vector
type Velocity = Vector
type Force = Vector

function affinity(subject: Coordinates, object: Coordinates, factor: number): Force {
  const distance = distanceOfVector(subject, object);
  return mulVector(subVector(object, subject), factor / distance);
}

function moveParticle(particle: Particle, worldSize: Vector): Particle {
  const tempPosition = addVector(particle.position, particle.velocity);
  if (tempPosition.x < 0) { tempPosition.x += worldSize.x }
  if (tempPosition.x >= worldSize.x) { tempPosition.x -= worldSize.y }
  if (tempPosition.y < 0) { tempPosition.y += worldSize.y }
  if (tempPosition.y >= worldSize.y) { tempPosition.y -= worldSize.y }
  return {
    species: particle.species,
    position: tempPosition,
    velocity: particle.velocity,
  }
}

export { Species, Particle, moveParticle, affinity };
