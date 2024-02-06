const zinc = "#EEEBEB";
const paynes = "#29313E";
const cobaltTeal = "#38B0C1";

const weeklyColors = [
cobaltTeal,
"#FFBE98"];

const dailyColors = [
"#23182A",
"#A06379",
"#E3C3CE",
"#1664C0"];


let colors = weeklyColors.concat(dailyColors);
colors = colors.map(color => tinycolor(color).toHsl());
colors = colors.filter(color => {
  return color.h > 0 && color.s > 0.07;
});
colors = colors.sort((a, b) => {
  return b.l - a.l;
});
colors = colors.map(color => tinycolor(color).toHslString());

const modulateColor = (baseColor, hRange = 8, sRange = 8, lRange = 8) => {
  const random = (min, max) => Math.random() * (max - min) + min;
  baseColor = tinycolor(baseColor).toHsl();

  const h = Math.floor(baseColor.h + random(-hRange, hRange));
  const s = Math.floor(baseColor.s * 100 + random(-sRange, sRange));
  const l = Math.floor(baseColor.l * 100 + random(-lRange, lRange));

  return `hsl(${h}, ${s}%, ${l}%)`;
};

P5Capture.setDefaultOptions({
  disableUi: true,
  duration: 300,
  format: "gif",
  framerate: 60 });


let scaleOutput = 1;
let dimensions = {
  x: 800,
  y: 800 };

let frame;
let output, canvas;
let seed;

const phi = 1.618;
const fibb = [3, 5, 8, 13, 21];

function setup() {
  // print or save size
  output = createGraphics(dimensions.x, dimensions.y);
  canvas = createCanvas(dimensions.x, dimensions.y);
  colorMode(HSB, 360, 100, 100, 1);
  rectMode(CENTER);
  pixelDensity(1);
  noLoop();
  frame = 72 / 2;

  resetSketch();

  let div = createDiv('');
  div.class('ui');
  let resetButton = createButton("Reset");
  resetButton.parent(div);
  resetButton.mousePressed(resetSketch);

  // scale canvas to fit on screen
  const canvasElement = document.querySelector(".p5Canvas");
  const canvasRatio = canvasElement.height / canvasElement.width;
  const windowRatio = window.innerHeight / window.innerWidth;
  let cssHeight;
  let cssWidth;

  if (windowRatio < canvasRatio) {
    cssHeight = window.innerHeight;
    cssWidth = cssHeight / canvasRatio;
  } else {
    cssWidth = window.innerWidth;
    cssHeight = cssWidth * canvasRatio;
  }

  canvasElement.style.width = `${cssWidth * 0.85}px`;
  canvasElement.style.height = `${cssHeight * 0.85}px`;
}

const createTriangle = (x, y, radius) => {
  const length = radius / 2;
  push();
  translate(x, y);
  rotate(HALF_PI * floor(random(4)));
  triangle(-length, -length, -length, length, length, 0);
  pop();
};

const createLines = (x, y, radius, color) => {
  const numLines = floor(random(21, 34));
  const step = TWO_PI / numLines;
  const offset = radius * (noise(seed) * (phi - 1));

  noFill();
  stroke(color);
  strokeWeight(2);

  push();
  translate(x, y);

  for (let i = 0; i < TWO_PI; i += step) {
    const length = radius * random(0.3, 0.45);
    rotate(step);
    line(0, offset, length, offset);
  }

  pop();

  circle(x, y, offset * 2);

  noStroke();
  fill(color);
};

const makeTile = (size, x, y, color) => {
  let bgColor, fgColor;
  const radius = size / phi;

  if (tinycolor(color).isDark()) {
    bgColor = color;
    fgColor = tinycolor(color).lighten(floor(random(20, 40))).toHslString();
  } else {
    bgColor = tinycolor(color).darken(floor(random(60, 80))).toHslString();
    fgColor = color;
  }

  // background
  noStroke();
  fill(bgColor);
  rect(x, y, size);

  // foreground
  const choice = random(4);
  fill(fgColor);
  if (choice < 1) {
    rect(x, y, radius);
  } else if (choice < 2) {
    circle(x, y, radius);
  } else if (choice < 3) {
    createTriangle(x, y, radius);
  } else {
    createLines(x, y, radius, fgColor);
  }

};

const resetSketch = () => {
  background(zinc);

  seed = floor(random(99999));
  randomSeed(seed);
  console.log(seed);

  const count = random(fibb);
  const size = floor((width - frame * 2) / count);
  const calcFrame = (width - count * size) / 2;

  for (let x = calcFrame + size / 2; x < width - calcFrame; x += size) {
    for (let y = calcFrame + size / 2; y < height - calcFrame; y += size) {
      const color = modulateColor(random(colors));

      makeTile(size, x, y, color);
    }
  }
};

function draw() {
  output.clear();

  output.push();
  output.scale(scaleOutput);

  output.pop();

  image(output, 0, 0);
}

function keyPressed() {
  if (key === 's') {
    const capture = P5Capture.getInstance();
    capture.start();
  }
}