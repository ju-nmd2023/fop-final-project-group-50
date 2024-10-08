function setup() {
  createCanvas(400, 400);
  background(255);

  // Body
  fill(0, 0, 255); // Blue color for jumpsuit
  rect(170, 160, 60, 110); // Main body rectangle

  // Head
  fill(255, 204, 0); // Skin color
  ellipse(200, 130, 60, 60); // Head

  // Hat
  fill(0, 0, 255); // Blue color for hat
  rect(170, 100, 60, 20); // Hat base
  fill(255); // White for text
  textSize(12);
  textAlign(CENTER, CENTER);
  text("JÖRGEN", 200, 110); // Name on the hat

  // Eyes
  fill(0); // Black for eyes
  ellipse(190, 130, 10, 10); // Left eye
  ellipse(210, 130, 10, 10); // Right eye

  // Tool
  fill(192); // Gray color for wrench
  rect(140, 230, 50, 7); // Wrench handle
  ellipse(195, 233, 15, 15);

  // Arms
  fill(255, 204, 0); // Skin color
  rect(150, 165, 20, 70); // Left arm
  rect(230, 165, 20, 70); // Right arm

  // Hands
  ellipse(160, 230, 25, 20); // Left hand (holding wrench)
  ellipse(240, 230, 25, 20); // Right hand

  // Legs
  fill(0, 0, 255); // Blue color for pants
  rect(170, 270, 25, 70); // Left leg
  rect(205, 270, 25, 70); // Right leg

  // Shoes
  fill(255); // White color for shoes
  ellipse(180, 340, 30, 15); // Left shoe
  ellipse(220, 340, 30, 15); // Right shoe

  // Belt
  fill(0); // Black color for belt
  rect(170, 250, 60, 10); // Belt

  // Details on suit
  fill(0); // Black color for patches
  rect(185, 190, 10, 10); // Patch on left chest
  rect(200, 220, 5, 5); // Patch on lower right

  // Neck opening (V-shape)
  fill(255, 204, 0); // Skin color for neck
  triangle(190, 160, 210, 160, 200, 180); // V-shape for neck
}
