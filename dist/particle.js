import { addVector, subVector, mulVector, distanceOfVector } from "./Vector.js";
function affinity(subject, object, factor) {
    const distance = distanceOfVector(subject, object);
    return mulVector(subVector(object, subject), factor / distance);
}
function moveParticle(particle, worldSize) {
    const tempPosition = addVector(particle.position, particle.velocity);
    if (tempPosition.x < 0) {
        tempPosition.x += worldSize.x;
    }
    if (tempPosition.x >= worldSize.x) {
        tempPosition.x -= worldSize.y;
    }
    if (tempPosition.y < 0) {
        tempPosition.y += worldSize.y;
    }
    if (tempPosition.y >= worldSize.y) {
        tempPosition.y -= worldSize.y;
    }
    return {
        species: particle.species,
        position: tempPosition,
        velocity: particle.velocity,
    };
}
export { moveParticle, affinity };
