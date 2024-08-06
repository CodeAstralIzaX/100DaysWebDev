var fireworks = [];
var gravity;
function setup() {
  createCanvas(400, 600);
  gravity = createVector(0, 0.16);
  stroke(255);
  strokeWeight(4);
  fireworks.push(new Firework());
}
function draw() {
  background(0, 40);
  if (frameCount % 35 == 0) {
    fireworks.push(new Firework());
  }
  for (var i = fireworks.length - 1; i >= 0; i--) {
    if (fireworks[i].done) {
      fireworks.splice(i, 1);
    } else {
      fireworks[i].update();
      fireworks[i].show();
    }
  }
}
function Particle(x, y, firework) {
  this.pos = createVector(x, y);
  this.lifespan = 255;
  this.firework = firework;
  this.color = [random(70, 255), random(70, 255), random(70, 255)];
  if (firework) {
    this.vel = createVector(0, random(-14, -12));
  } else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(2, 12));
  }
  this.acc = createVector(0, 0);
  this.applyForce = function(force) {
    this.acc.add(force);
  };
  this.update = function() {
    if (!this.firework) {
      this.vel.mult(0.85);
      this.lifespan -= random(3,5);
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };
  this.show = function() {
    if (!this.firework) {
      stroke(this.color[0], this.color[1], this.color[2], this.lifespan);
      strokeWeight(2);
    } else {
      stroke(255);
      strokeWeight(4);
    }
    point(this.pos.x, this.pos.y);
  };
}
function Firework() {
  this.firework = new Particle(random(30, width), height, true);
  this.exploded = false;
  this.particles = [];
  this.done = false;
  this.color = this.update = function() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    } else {
      if (this.particles.length === 0) this.done = true;
      for (var i = this.particles.length - 1; i >= 0; i--) {
        if (this.particles[i].lifespan < 1) {
          this.particles.splice(i, 1);
        } else {
          this.particles[i].applyForce(gravity);
          this.particles[i].update();
        }
      }
    }
  };
  this.explode = function() {
    for (var i = 0; i < random(50,100); i++) {
      var p = new Particle(this.firework.pos.x, this.firework.pos.y);
      this.particles.push(p);
    }
  };
  this.show = function() {
    if (!this.exploded) {
      this.firework.show();
    } else {
      for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].show();
      }
    }
  };
}