function setup() {
  createCanvas(150, 150);
  drawCactus();
}

function drawCactus() {
  background(255);

  // Main body
  noStroke();
  fill(0, 130, 0); // Green color for cactus
  rect(50, 10, 20, 100); // Main body

  // Left arm
  rect(40, 40, 10, 10); // Left arm lower
  rect(35, 30, 10, 20); // Left arm upper

  // Right arm
  rect(70, 55, 10, 10); // Right arm lower
  rect(75, 45, 10, 20); // Right arm upper

  // Spikes on cactus
  fill(0); // Black color for spikes
  rect(55, 20, 2, 4);
  rect(65, 25, 2, 4);
  rect(55, 55, 2, 4);
  rect(65, 70, 2, 4);
  rect(50, 90, 2, 4);
  rect(60, 100, 2, 4);
  rect(35, 35, 2, 4);
  rect(40, 45, 2, 4);
  rect(65, 40, 2, 4);
  rect(82, 55, 2, 4);
}
