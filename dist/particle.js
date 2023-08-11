import { addVector, subVector, mulVector, divVector, distanceOfVector } from "./Vector.js";
function affinity(subject, object, factor) {
    const cutoff = 250;
    const distance = distanceOfVector(subject, object);
    if (distance > cutoff) {
        return { x: 0.0, y: 0.0 };
    }
    return mulVector(subVector(object, subject), factor / (distance ** 2));
}
function collision(subject, object, radius) {
    const distance = distanceOfVector(subject, object);
    if (distance > radius) {
        return { x: 0.0, y: 0.0 };
    }
    const unit = divVector(subVector(subject, object), distance);
    const force = (distance - radius) - 1;
    return mulVector(unit, force / distance);
}
function moveParticle(particle) {
    const acceleration = divVector(particle.force, particle.species.mass);
    particle.force = { x: 0.0, y: 0.0 };
    particle.velocity = addVector(particle.velocity, acceleration);
    particle.position = addVector(particle.position, particle.velocity);
}
export { moveParticle, affinity, collision };
