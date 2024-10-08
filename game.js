let character;
let myCharacter;
let moveSpeed = 5; // Speed of movement

function setup() {
  createCanvas(1400, 600);

  // Define the character object with x and y
  character = {
    x: 200,
    y: 370,
  };

  // Create an instance of the Character class, passing the character object
  myCharacter = new Character(character);
}

function draw() {
  background(255);

  // Draw the ground at the bottom of the screen
  fill(128, 128, 128); // Ground color
  rect(0, height - 50, width, 50); // Ground is a rectangle spanning the width of the canvas

  // Update character position based on key presses
  if (keyIsDown(LEFT_ARROW)) {
    character.x -= moveSpeed; // Move left
  }
  if (keyIsDown(RIGHT_ARROW)) {
    character.x += moveSpeed; // Move right
  }

  // Draw the character
  myCharacter.draw();
}
