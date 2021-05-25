/**
 * Took help from https://airbrake.io/blog/javascript/fourth-of-july-javascript-fireworks
 * I did write the code myself instead of copy pasting the code like a 🤡.
 * :)
 */

import * as UtilFunctions from "./UtilFunctions";

// #region CONFIG
// Base firework acceleration.
// 1.0 causes fireworks to travel at a constant speed.
// Higher number increases rate firework accelerates over time.
const FIREWORK_ACCELERATION = 1.05;
// Minimum firework brightness.
const FIREWORK_BRIGHTNESS_MIN = 30;
// Maximum firework brightness.
const FIREWORK_BRIGHTNESS_MAX = 50;
// Base speed of fireworks.
const FIREWORK_SPEED = 2;
// Base length of firework trails.
const FIREWORK_TRAIL_LENGTH = 3;
// Determine if target position indicator is enabled.
const FIREWORK_TARGET_INDICATOR_ENABLED = false;
// Radius of the firework target
const CLICK_TARGET_RADIUS = 2.5;

// Minimum particle brightness.
const PARTICLE_BRIGHTNESS_MIN = 30;
// Maximum particle brightness.
const PARTICLE_BRIGHTNESS_MAX = 60;
// Base particle count per firework.
const PARTICLE_COUNT = 80;
// Minimum particle decay rate.
const PARTICLE_DECAY_MIN = 0.015;
// Maximum particle decay rate.
const PARTICLE_DECAY_MAX = 0.03;
// Base particle friction.
// Slows the speed of particles over time.
const PARTICLE_FRICTION = 0.9;
// Base particle gravity.
// How quickly particles move toward a downward trajectory.
const PARTICLE_GRAVITY = 0.6;
// Variance in particle coloration.
const PARTICLE_HUE_VARIANCE = 30;
// Base particle transparency.
const PARTICLE_TRANSPARENCY = 1;
// Minimum particle speed.
const PARTICLE_SPEED_MIN = 5;
// Maximum particle speed.
const PARTICLE_SPEED_MAX = 15;
// Base length of explosion particle trails.
const PARTICLE_TRAIL_LENGTH = 10;

// Alpha level that canvas cleanup iteration removes existing trails.
// Lower value increases trail duration.
const CANVAS_CLEANUP_ALPHA = 0.3;
// Hue change per loop, used to rotate through different firework colors.
const HUE_STEP_INCREASE = 0.5;

// Minimum number of ticks per manual firework launch.
const TICKS_PER_FIREWORK_MIN = 5;
// Minimum number of ticks between each automatic firework launch.
const TICKS_PER_FIREWORK_AUTOMATED_MIN = 60;
// Maximum number of ticks between each automatic firework launch.
const TICKS_PER_FIREWORK_AUTOMATED_MAX = 100;
// #endregion CONFIG

class FireworkService {
  constructor(canvasElement, fireworkOnMouseClick) {
    if (
      !canvasElement ||
      !canvasElement.nodeName ||
      canvasElement.nodeName !== "CANVAS"
    ) {
      return;
    }

    this.canvasElement = canvasElement;
    this.init(canvasElement, fireworkOnMouseClick);

    // Set canvas dimensions.
    canvasElement.width = canvasElement.parentElement.clientWidth;
    canvasElement.height = canvasElement.parentElement.clientHeight;
    // Set the context, 2d in this case.
    this.context = canvasElement.getContext("2d");
    // Firework and particles collections.
    this.fireworks = [];
    this.particles = [];
    // Mouse coordinates.
    this.mouseX = undefined;
    this.mouseY = undefined;
    // Variable to check if mouse is down.
    this.isMouseDown = false;
    // Initial hue.
    this.hue = 120;
    // Track number of ticks since automated firework.
    this.ticksSinceFireworkAutomated = 0;
    // Track number of ticks since manual firework.
    this.ticksSinceFirework = 0;

    this.fireworkAnimationLoop = this.fireworkAnimationLoop.bind(this);
  }

  init(fireworkOnMouseClick) {
    // Adding polyfills
    addRequestAnimationFramePolyfill();

    if (fireworkOnMouseClick) {
      this.addMouseEventListeners();
    }
  }

  addMouseEventListeners() {
    const canvasElement = this.canvasElement;
    // Track current mouse position within canvas.
    this.canvasElement.addEventListener("mousemove", (e) => {
      this.mouseX = e.pageX - canvasElement.offsetLeft;
      this.mouseY = e.pageY - canvasElement.offsetTop;
    });

    // Track when mouse is pressed.
    this.canvasElement.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this.isMouseDown = true;
    });

    // Track when mouse is released.
    this.canvasElement.addEventListener("mouseup", (e) => {
      e.preventDefault();
      this.isMouseDown = false;
    });
  }

  // #region Application helper functions
  // Cleans up the canvas by removing older trails.
  cleanCanvas() {
    const context = this.context;
    const canvasElement = this.canvasElement;
    // Set 'destination-out' composite mode, so additional fill doesn't remove non-overlapping content.
    context.globalCompositeOperation = "destination-out";
    // Set alpha level of content to remove.
    // Lower value means trails remain on screen longer.
    context.fillStyle = `rgba(0, 0, 0, ${CANVAS_CLEANUP_ALPHA})`;
    // Fill entire canvas.
    context.fillRect(0, 0, canvasElement.width, canvasElement.height);
    // Reset composite mode to 'lighter', so overlapping particles brighten each other.
    context.globalCompositeOperation = "lighter";
  }

  // Launch fireworks automatically.
  launchAutomatedFirework() {
    const fireworks = this.fireworks;
    const isMouseDown = this.isMouseDown;
    // let ticksSinceFireworkAutomated = this.ticksSinceFireworkAutomated;
    const canvasElement = this.canvasElement;
    // Determine if ticks since last automated launch is greater than random min/max values.
    if (
      this.ticksSinceFireworkAutomated >=
      UtilFunctions.getRandomNumberInclusiveWithinRange(
        TICKS_PER_FIREWORK_AUTOMATED_MIN,
        TICKS_PER_FIREWORK_AUTOMATED_MAX
      )
    ) {
      // Check if mouse is not currently clicked.
      if (!isMouseDown) {
        // Set start position to a random center-ish point on the bottom of the screen.
        const startX = UtilFunctions.getRandomNumberInclusiveWithinRange(
          canvasElement.width * 0.25,
          canvasElement.width * 0.75
        );
        const startY = canvasElement.height;
        // Set end position to random position, somewhere in the top half of screen with an offset.
        const endX = UtilFunctions.getRandomNumberInclusiveWithinRange(
          0,
          canvasElement.width
        );
        const endY = UtilFunctions.getRandomNumberInclusiveWithinRange(
          100,
          canvasElement.height / 2 + 100
        );
        // Create new firework and add to collection.
        fireworks.push(
          new Firework(
            startX,
            startY,
            endX,
            endY,
            this.context,
            this.fireworks,
            this.hue,
            this.particles
          )
        );
        // Reset tick counter.
        this.ticksSinceFireworkAutomated = 0;
      }
    } else {
      // Increment counter.
      this.ticksSinceFireworkAutomated++;
    }
  }

  // Launch fireworks manually, if mouse is pressed.
  launchManualFirework() {
    const fireworks = this.fireworks;
    const canvasElement = this.canvasElement;
    const mouseX = this.mouseX;
    const mouseY = this.mouseY;
    const isMouseDown = this.isMouseDown;
    // Check if ticks since last firework launch is less than minimum value.
    if (this.ticksSinceFirework >= TICKS_PER_FIREWORK_MIN) {
      // Check if mouse is down.
      if (isMouseDown) {
        // Set start position to a random center-ish point on the bottom of the screen.
        const startX = UtilFunctions.getRandomNumberInclusiveWithinRange(
          canvasElement.width * 0.25,
          canvasElement.width * 0.75
        );
        const startY = canvasElement.height;
        // Set end position to current mouse position.
        const endX = mouseX;
        const endY = mouseY;
        // Create new firework and add to collection.
        fireworks.push(
          new Firework(
            startX,
            startY,
            endX,
            endY,
            this.context,
            this.fireworks,
            this.hue,
            this.particles
          )
        );
        // Reset tick counter.
        this.ticksSinceFirework = 0;
      }
    } else {
      // Increment counter.
      this.ticksSinceFirework++;
    }
  }

  // Update all active fireworks.
  processFireworks() {
    const fireworks = this.fireworks;
    // Loop backwards through all fireworks, drawing and updating each.
    for (let i = fireworks.length - 1; i >= 0; --i) {
      fireworks[i].draw();
      fireworks[i].update(i);
    }
  }

  // Update all active particles.
  processParticles() {
    const particles = this.particles;
    // Loop backwards through all particles, drawing and updating each.
    for (let i = particles.length - 1; i >= 0; --i) {
      particles[i].draw();
      particles[i].update(i);
    }
  }

  // Primary loop.
  fireworkAnimationLoop() {
    // Smoothly request animation frame for each loop iteration.
    window.requestAnimFrame(this.fireworkAnimationLoop);

    // Adjusts coloration of fireworks over time.
    this.hue += HUE_STEP_INCREASE;

    // Clean the canvas.
    this.cleanCanvas();

    // Update fireworks.
    this.processFireworks();

    // Update particles.
    this.processParticles();

    // Launch automated fireworks.
    this.launchAutomatedFirework();

    // Launch manual fireworks.
    this.launchManualFirework();
  }
  // #endregion Application helper functions
}

// #region Helper functions
function addRequestAnimationFramePolyfill() {
  // Use requestAnimationFrame to maintain smooth animation loops.
  // Fall back on setTimeout() if browser support isn't available.
  window.requestAnimFrame = (() => {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
}

// Calculate the distance between two points.
function calculateDistance(aX, aY, bX, bY) {
  let xDistance = aX - bX;
  let yDistance = aY - bY;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
// #endregion Helper functions

class Firework {
  constructor(startX, startY, endX, endY, context, fireworks, hue, particles) {
    // Current coordinates
    this.x = startX;
    this.y = startY;

    // Starting point coordinates
    this.startX = startX;
    this.startY = startY;

    // Ending point coordinates
    this.endX = endX;
    this.endY = endY;

    this.distanceToEnd = calculateDistance(startX, startY, endX, endY);
    this.distanceTravelled = 0;

    // Array to calculate the trail of partices for each firework
    this.trail = [];

    // trailLength determines how many trailing particles are active at once
    this.trailLength = FIREWORK_TRAIL_LENGTH;

    // While the trail length remains, add current point to trail list
    while (this.trailLength--) {
      this.trail.push([this.x, this.y]);
    }

    // Calculate the angle to travel from starting point to ending point
    this.angle = Math.atan2(endY - startY, endX - startX);
    // Set the speed.
    this.speed = FIREWORK_SPEED;
    // Set the acceleration.
    this.acceleration = FIREWORK_ACCELERATION;
    // Set the hue
    this.hue = hue;
    // Set the brightness.
    this.brightness = UtilFunctions.getRandomNumberInclusiveWithinRange(
      FIREWORK_BRIGHTNESS_MIN,
      FIREWORK_BRIGHTNESS_MAX
    );
    // Set the radius of click-target location.
    this.targetRadius = CLICK_TARGET_RADIUS;

    // Additional vars from parent
    this.context = context;
    this.fireworks = fireworks;
    this.particles = particles;
  }

  // fireworkIndex is the firework's index in the fireworks array
  update(fireworkIndex) {
    const fireworks = this.fireworks;
    // Remove the oldest trail particle
    this.trail.pop();
    // Add the current position to the start of trail
    this.trail.unshift([this.x, this.y]);

    // Animate the target radius indicator.
    if (FIREWORK_TARGET_INDICATOR_ENABLED) {
      if (this.targetRadius < 8) {
        this.targetRadius += 0.3;
      } else {
        this.targetRadius = 1;
      }
    }

    // Increase speed based on acceleration rate
    this.speed *= this.acceleration;

    // Calculate current velocities for both x and y axes
    let xVelocity = Math.cos(this.angle) * this.speed;
    let yVelocity = Math.sin(this.angle) * this.speed;

    // Calculate the current distance travelled
    this.distanceTravelled = calculateDistance(
      this.startX,
      this.startY,
      this.x + xVelocity,
      this.y + yVelocity
    );

    // Check if the endPoint has been reached or crossed
    if (this.distanceTravelled >= this.distanceToEnd) {
      // Destroy firework by removing it from collection.
      fireworks.splice(fireworkIndex, 1);

      // Create particle explosion at end point. Important not to use this.x and this.y,
      // since that position is always one animation loop behind.
      this.createParticles(this.endX, this.endY);
    } else {
      // endPoint hasn't been reached yet, so continue along current trajectory by updating the current coordinates
      this.x += xVelocity;
      this.y += yVelocity;
    }
  }

  // This methods draws the firework after the update hook has run
  // Use CanvasRenderingContext2D methods to create strokes as firework paths.
  draw() {
    const context = this.context;
    // Begin a new path for firework trail
    context.beginPath();
    // Get the coordinates for the oldest trail position
    let trailLength = this.trail.length;
    let [trailEndX, trailEndY] = this.trail[trailLength - 1];
    // Create a trail stroke from trail end position to current firework position
    context.moveTo(trailEndX, trailEndY);
    context.lineTo(this.x, this.y);
    // Set stroke coloration and style
    // Use hue, saturation, and light values instead of RGB
    context.strokeStyle = `hsl(${this.hue}, 100%, ${this.brightness}%)`;
    // Draw stroke
    context.stroke();

    if (FIREWORK_TARGET_INDICATOR_ENABLED) {
      // Begin a new path for end position animation
      context.beginPath();
      // Create an pulsing circle at the end point with targetRadius
      context.arc(this.endX, this.endY, this.targetRadius, 0, Math.PI * 2);
      // Draw stroke
      context.stroke();
    }
  }

  // Create particle explosion at 'x' and 'y' coordinates.
  createParticles(x, y) {
    // Set particle count.
    // Higher numbers ~may~ does reduce performance.
    let particleCount = PARTICLE_COUNT;
    while (particleCount--) {
      // Create a new particle and add it to particles collection.
      this.particles.push(
        new Particle(x, y, this.context, this.particles, this.hue)
      );
    }
  }
}

// Creates a new particle at provided 'x' and 'y' coordinates.
class Particle {
  constructor(x, y, context, particles, hue) {
    // Set current position.
    this.x = x;
    this.y = y;
    // To better simulate a firework, set the angle of travel to random value in any direction.
    this.angle = UtilFunctions.getRandomNumberInclusiveWithinRange(
      0,
      Math.PI * 2
    );
    // Set friction.
    this.friction = PARTICLE_FRICTION;
    // Set gravity.
    this.gravity = PARTICLE_GRAVITY;
    // Set the hue to somewhat randomized number.
    // This gives the particles within a firework explosion an appealing variance.
    this.hue = UtilFunctions.getRandomNumberInclusiveWithinRange(
      hue - PARTICLE_HUE_VARIANCE,
      hue + PARTICLE_HUE_VARIANCE
    );
    // Set brightness.
    this.brightness = UtilFunctions.getRandomNumberInclusiveWithinRange(
      PARTICLE_BRIGHTNESS_MIN,
      PARTICLE_BRIGHTNESS_MAX
    );
    // Set decay.
    this.decay = UtilFunctions.getRandomNumberInclusiveWithinRange(
      PARTICLE_DECAY_MIN,
      PARTICLE_DECAY_MAX
    );
    // Set speed.
    this.speed = UtilFunctions.getRandomNumberInclusiveWithinRange(
      PARTICLE_SPEED_MIN,
      PARTICLE_SPEED_MAX
    );
    // Create an array to track current trail particles.
    this.trail = [];
    // Trail length determines how many trailing particles are active at once.
    this.trailLength = PARTICLE_TRAIL_LENGTH;
    // While the trail length remains, add current point to trail list.
    while (this.trailLength--) {
      this.trail.push([this.x, this.y]);
    }
    // Set transparency.
    this.transparency = PARTICLE_TRANSPARENCY;

    // Parent vars
    this.context = context;
    this.particles = particles;
  }

  // Update a particle prototype.
  // 'particleIndex' parameter is index in 'particles' array to remove, if journey is complete.
  update(particleIndex) {
    // Remove the oldest trail particle.
    this.trail.pop();
    // Add the current position to the start of trail.
    this.trail.unshift([this.x, this.y]);
    // Decrease speed based on friction rate.
    this.speed *= this.friction;
    // Calculate current position based on angle, speed, and gravity (for y-axis only).
    // The gravity is what pulls the partices downwards
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;

    // Apply transparency based on decay.
    this.transparency -= this.decay;
    // Use decay rate to determine if particle should be destroyed.
    if (this.transparency <= this.decay) {
      // Destroy particle once transparency level is below decay.
      this.particles.splice(particleIndex, 1);
    }
  }

  // Draw a particle.
  // Use CanvasRenderingContext2D methods to create strokes as particle paths.
  draw() {
    const context = this.context;
    // Begin a new path for particle trail.
    context.beginPath();
    // Get the coordinates for the oldest trail position.
    const trailLength = this.trail.length;
    let [trailEndX, trailEndY] = this.trail[trailLength - 1];
    // Create a trail stroke from trail end position to current particle position.
    context.moveTo(trailEndX, trailEndY);
    context.lineTo(this.x, this.y);
    // Set stroke coloration and style.
    // Use hue, brightness, and transparency instead of RGBA.
    context.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.transparency})`;
    context.stroke();
  }
}

export default FireworkService;
