
type World = {
  particleTypes: ParticleType[];
  particles: Particle[];
  settings: CanvasSettings;
  ctx: CanvasRenderingContext2D;
}

type CanvasSettings = {
  canvasColor: string;
  canvasSize: { x: number, y: number };
}

const settings: CanvasSettings = {
  canvasColor: "black",
  canvasSize: { x: 500, y: 500 },
}

const createWorld = (
  canvas: HTMLCanvasElement,
  settings: CanvasSettings,
): World => {
  const ctx = mainCanvas.getContext("2d");
  if (!ctx) { throw Error; }
  mainCanvas.width = settings.canvasSize.x;
  mainCanvas.height = settings.canvasSize.y;
  ctx.fillStyle = settings.canvasColor;
  ctx.fillRect(0, 0, settings.canvasSize.x, settings.canvasSize.y);
  const particleType = [
    {
      color: "red"
    },
    {
      color: "blue"
    },
  ];
  const particles: Particle[] = [];
  particles.push(
    {
      type: 0,
      position: { x: 0.0, y: 0.0 },
      velocity: { x: 0.0, y: 0.0 },
    }
  );
  particles.push(
    {
      type: 1,
      position: { x: 1.0, y: 1.0 },
      velocity: { x: 0.0, y: 0.0 },
    }
  );
  return {
    particleTypes: particleType,
    particles: particles,
    settings: settings,
    ctx: ctx,
  }
}

type ParticleType = {
  color: string;
}

const particleTypes: ParticleType[] = [
  {color: 'black'},
  {color: 'red'},
]

const renderParticles = (world: World): void => {
  world.ctx.fillStyle = world.settings.canvasColor;
  world.ctx.fillRect(0, 0, world.settings.canvasSize.x, world.settings.canvasSize.x);
  for (const particle of world.particles) {
    world.ctx.fillStyle = particleTypes[particle.type].color;
    world.ctx.fillRect(particle.position.x, particle.position.y, 5, 5);
  }
};

const moveParticles = (particles: Particle[], settings: CanvasSettings): Particle[] => {
  return particles.map((particle) => {
    const newParticle = { ...particle };
    newParticle.position.x += 10;
    newParticle.position.y += 10;
    if (newParticle.position.x < 0) {
      newParticle.position.x += settings.canvasSize.x;
    }
    if (newParticle.position.x > settings.canvasSize.x) {
      newParticle.position.x -= settings.canvasSize.x;
    }
    if (newParticle.position.y < 0) {
      newParticle.position.y += settings.canvasSize.y;
    }
    if (newParticle.position.y > settings.canvasSize.y) {
      newParticle.position.y -= settings.canvasSize.y;
    }

    return newParticle;
  });
}

const mainCanvas = document.getElementById('main-canvas') as HTMLCanvasElement;
const world = createWorld(mainCanvas, settings);

const step = (): void => {
  world.particles = moveParticles(world.particles, world.settings);
  renderParticles(world);
};

setInterval(step, 200)

