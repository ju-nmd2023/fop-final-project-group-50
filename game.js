let character;
let myCharacter;
let moveSpeed = 5; // Speed of movement
let groundLevel; // Define ground level
let jumpForce = -15; // Upward force for the jump
let gravity = 0.8; // Gravity pulling the character down
let velocityY = 0; // Vertical velocity of the character
let isJumping = false; // To track if the character is in the air

// Define obstacle properties
let obstacle = {
  x: 1420, // Start from the right edge, off-screen
  y: 620, // Place at the same height as the character
  width: 50, // Width of the obstacle
  height: 50, // Height of the obstacle
  speed: 7, // Speed at which the obstacle moves left
};
function setup() {
  createCanvas(1420, 700);

  // Define the character object with x and y
  character = {
    x: 200,
    y: 370,
  };

  // Define the ground level as the canvas height minus the height of the ground
  groundLevel = height - 210;

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

  // Jump when the UP arrow is pressed and the character is not already jumping
  if (keyIsDown(UP_ARROW) && !isJumping) {
    velocityY = jumpForce; // Apply the jump force
    isJumping = true; // The character is now jumping
  }

  // Apply gravity
  velocityY += gravity;
  character.y += velocityY; // Update character's position based on vertical velocity

  // Ensure the character doesn't go through the ground
  if (character.y > groundLevel) {
    character.y = groundLevel;
    velocityY = 0; // Reset velocity when character is on the ground
    isJumping = false; // The character can jump again
  }

  // Draw the character
  myCharacter.draw();

  // Update and draw the obstacle
  updateObstacle();
  drawObstacle();
}

// Function to update obstacle's position
function updateObstacle() {
  obstacle.x -= obstacle.speed; // Move the obstacle left
  // Reset the obstacle's position when it goes off-screen
  if (obstacle.x + obstacle.width < 0) {
    obstacle.x = width; // Reset to the right side
  }
}

// Function to draw the obstacle
function drawObstacle() {
  fill(255, 0, 0); // Color of the obstacle (red)
  rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}
