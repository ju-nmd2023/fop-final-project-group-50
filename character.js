class Character {
  constructor(character) {
    this.character = character; // Store the character object
  }

  draw() {
    // Body
    fill(0, 0, 255); // Blue color for jumpsuit
    rect(this.character.x - 30, this.character.y, 60, 110); // Main body rectangle

    // Head
    fill(255, 204, 0); // Skin color
    ellipse(this.character.x, this.character.y - 30, 60, 60); // Head

    // Hat
    fill(0, 0, 255); // Blue color for hat
    rect(this.character.x - 30, this.character.y - 60, 60, 20); // Hat base
    fill(255); // White for text
    textSize(12);
    textAlign(CENTER, CENTER);
    text("JÖRGEN", this.character.x, this.character.y - 50); // Name on the hat

    // Eyes
    fill(0); // Black for eyes
    ellipse(this.character.x - 10, this.character.y - 30, 10, 10); // Left eye
    ellipse(this.character.x + 10, this.character.y - 30, 10, 10); // Right eye

    // Tool (Wrench)
    fill(192); // Gray color for wrench
    rect(this.character.x - 60, this.character.y + 70, 50, 7); // Wrench handle
    ellipse(this.character.x - 5, this.character.y + 73, 15, 15);

    // Arms
    fill(255, 204, 0); // Skin color
    rect(this.character.x - 50, this.character.y + 5, 20, 70); // Left arm
    rect(this.character.x + 30, this.character.y + 5, 20, 70); // Right arm

    // Hands
    ellipse(this.character.x - 40, this.character.y + 70, 25, 20); // Left hand (holding wrench)
    ellipse(this.character.x + 40, this.character.y + 70, 25, 20); // Right hand

    // Legs
    fill(0, 0, 255); // Blue color for pants
    rect(this.character.x - 30, this.character.y + 110, 25, 70); // Left leg
    rect(this.character.x + 5, this.character.y + 110, 25, 70); // Right leg

    // Shoes
    fill(255); // White color for shoes
    ellipse(this.character.x - 20, this.character.y + 180, 30, 15); // Left shoe
    ellipse(this.character.x + 20, this.character.y + 180, 30, 15); // Right shoe

    // Belt
    fill(0); // Black color for belt
    rect(this.character.x - 30, this.character.y + 90, 60, 10); // Belt

    // Details on suit
    fill(0); // Black color for patches
    rect(this.character.x - 15, this.character.y + 30, 10, 10); // Patch on left chest
    rect(this.character.x, this.character.y + 60, 5, 5); // Patch on lower right

    // Neck opening (V-shape)
    fill(255, 204, 0); // Skin color for neck
    triangle(
      this.character.x - 10,
      this.character.y,
      this.character.x + 10,
      this.character.y,
      this.character.x,
      this.character.y + 20
    );
  }
}
