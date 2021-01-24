let width = 500;
let height = 72;
let count;
let digits = 7;

function preload() {
  count = loadStrings("count.txt");
}

function setup() {
  count = count[0].split("").map((x) => parseInt(x));
  while (count.length < digits) {
    let zero = 0;
    count.unshift(zero);
  }
  console.log(count);
  let canvas = createCanvas(width, height);
  //  background(255);
  drawDigits();
}
function drawDigits() {
  let x = 0;
  let y = 0;
  let w = width / digits - 5;
  textAlign(CENTER, CENTER);
  textSize(height);
  for (let i = 0; i < digits; i++) {
    fill(0);
    rect(x, y, w, height);
    fill(0, 255, 0);
    text(count[i], x + w / 2, height / 2);
    x += w + 5;
  }
}
