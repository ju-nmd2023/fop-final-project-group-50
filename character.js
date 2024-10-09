class Character {
  constructor(x, y) {
    this.x = x; // Horizontal position
    this.y = y; // Vertical position
  }

  show() {
    // Draw the character using the specified design

    // Body
    fill(0, 0, 255); // Blue color for jumpsuit
    rect(this.x - 30, this.y, 60, 110); // Main body rectangle

    // Head
    fill(255, 204, 0); // Skin color
    ellipse(this.x, this.y - 30, 60, 60); // Head

    // Hat
    fill(0, 0, 255); // Blue color for hat
    rect(this.x - 30, this.y - 60, 60, 20); // Hat base
    fill(255); // White for text
    textSize(12);
    textAlign(CENTER, CENTER);
    text("JÖRGEN", this.x, this.y - 50); // Name on the hat

    // Eyes
    fill(0); // Black for eyes
    ellipse(this.x - 10, this.y - 30, 10, 10); // Left eye
    ellipse(this.x + 10, this.y - 30, 10, 10); // Right eye

    // Tool (Wrench)
    fill(192); // Gray color for wrench
    rect(this.x - 60, this.y + 70, 50, 7); // Wrench handle
    ellipse(this.x - 5, this.y + 73, 15, 15);

    // Arms
    fill(255, 204, 0); // Skin color
    rect(this.x - 50, this.y + 5, 20, 70); // Left arm
    rect(this.x + 30, this.y + 5, 20, 70); // Right arm

    // Hands
    ellipse(this.x - 40, this.y + 70, 25, 20); // Left hand (holding wrench)
    ellipse(this.x + 40, this.y + 70, 25, 20); // Right hand

    // Legs
    fill(0, 0, 255); // Blue color for pants
    rect(this.x - 30, this.y + 110, 25, 70); // Left leg
    rect(this.x + 5, this.y + 110, 25, 70); // Right leg

    // Shoes
    fill(255); // White color for shoes
    ellipse(this.x - 20, this.y + 180, 30, 15); // Left shoe
    ellipse(this.x + 20, this.y + 180, 30, 15); // Right shoe

    // Belt
    fill(0); // Black color for belt
    rect(this.x - 30, this.y + 90, 60, 10); // Belt

    // Details on suit
    fill(0); // Black color for patches
    rect(this.x - 15, this.y + 30, 10, 10); // Patch on left chest
    rect(this.x, this.y + 60, 5, 5); // Patch on lower right

    // Neck opening (V-shape)
    fill(255, 204, 0); // Skin color for neck
    triangle(
      this.x - 10,
      this.y,
      this.x + 10,
      this.y,
      this.x,
      this.y + 20
    );
  }
}
