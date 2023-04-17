type Coordinates = {
  x: number;
  y: number;
}

type Velocity = {
  x: number;
  y: number;
}

type Particle = {
  type: number;
  position: Coordinates;
  velocity: Velocity;
}
