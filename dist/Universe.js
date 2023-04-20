import { addVector } from "./Vector.js";
import { moveParticle, affinity } from "./Particle.js";
function tick(universe) {
    return {
        size: universe.size,
        species: universe.species,
        population: moveParticles(universe),
        step: universe.step + 1,
    };
}
function interact(subject, object, species) {
    const factor = subject.species.factors[species.indexOf(object.species)];
    const force = affinity(subject.position, object.position, factor);
    return {
        species: subject.species,
        position: subject.position,
        velocity: addVector(subject.velocity, force),
    };
}
function moveParticles(universe) {
    return universe.population.map((particle) => {
        const newParticle = universe.population.reduce((previousValue, currentValue) => {
            if (currentValue === particle) {
                return previousValue;
            }
            else {
                return interact(previousValue, currentValue, universe.species);
            }
        }, particle);
        return moveParticle(newParticle, universe.size);
    });
}
export { tick };
