function setup() {
  createCanvas(150, 150);
  drawSnake();
}

function drawSnake() {
  background(255);

  // Head
  fill(0, 255, 0); // Green for the head
  rect(16, 10, 18, 6); // Head rectangle
  rect(18, 6, 14, 6); // Upper head rectangle

  // Body using rectangles
  fill(0, 255, 0); // Green for the body
  rect(14, 26, 22, 6); // Upper body
  rect(12, 30, 26, 6); // Middle body
  rect(10, 34, 30, 6); // Bottom body

  // Tail
  fill(0, 255, 0); // Green for the tail
  rect(30, 40, 6, 6); // Tail

  // Neck
  fill(0, 255, 0); // Green for the neck
  rect(20, 16, 10, 10); // Left neck border

  // Eyes
  fill(0); // Black eyes
  rect(18, 6, 4, 4); // Left eye
  rect(28, 6, 4, 4); // Right eye

  // Mouth
  fill(0); // Black mouth
  rect(24, 14, 2, 2); // Mouth rectangle

  // Tongue
  fill(255, 0, 0); // Red tongue
  rect(24, 16, 2, 4); // Tongue hanging down
}
