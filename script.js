console.clear();
let dots = [];
const amount = 6;
function setup () {
  createCanvas(windowWidth, windowHeight);
  init();
} 

function init () {
  dots = [];
  strokeWeight(4);
  colorMode(HSB);
  stroke(0, 0, 0);
  circle(width / 2, height / 2, height * 0.1);
  noFill();
  for (let i = 0; i < amount; i++) {
    const angle = (i / amount) * TWO_PI;
    const x = sin(angle) * height * 0.05 + (width / 2);
    const y = cos(angle) * height * 0.05 + (height / 2);
    dots.push(new Dot(angle, x, y, 0));
  }
}

class Dot {
  constructor (angle, x, y, split) {
    this.angle = angle;
    this.x = x;
    this.y = y;
    this.split = split;
    this.stop = false;
    this.v = createVector(sin(this.angle) * 0.5, cos(this.angle) * 0.5);
    this.prev = createVector(this.x, this.y);
  }
  
  update () {
    if (random() > (0.996 - (this.split * 0.002))) {
      if (this.split < 6) {
        this.split++;
        dots.push(new Dot(this.angle - (HALF_PI * 0.5), this.x, this.y, this.split));
        this.angle += HALF_PI * 0.5;
        this.v.x = sin(this.angle);
        this.v.y = cos(this.angle);
      } else if (this.split === 6) {
        this.stop = true;
      }
    }
    this.prev.x = this.x;
    this.prev.y = this.y;
    this.x += this.v.x;
    this.y += this.v.y;
  }
  isOut () {
    if (dist(this.x, this.y, width/2, height/2) < height * 0.05) return true;
    if (this.x < 0 || this.x > width) return true;
    if (this.y < 0 || this.y > height) return true;
    return false;
  }
  draw () {
    strokeWeight((1 - this.split / 7) * 4);
    stroke(0, 0, 0, 1 - this.split / 7);
    line(this.prev.x, this.prev.y, this.x, this.y);
  }
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
  clear();
  init();
}

function draw () {
  for (let i = dots.length - 1; i > -1; i--) {
    const dot = dots[i];
    dot.update();
    dot.draw();
    if (dot.stop || dot.isOut()) {
      dots.splice(i, 1);
    }
  }
}