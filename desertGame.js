let character;
let myCharacter;
let moveSpeed = 5; // Speed of movement
let groundLevel; // Define ground level
let jumpForce = -15; // Upward force for the jump
let gravity = 0.8; // Gravity pulling the character down
let velocityY = 0; // Vertical velocity of the character
let isJumping = false; // To track if the character is in the air
let gameOver = false; // To track if the game is over
let score = 0; // Starting score

// Define arrays to store multiple obstacles
let obstaclesLow = [];
let obstaclesHigh = []; // New array for high obstacles
let bgImage; // Declare a variable for the background image

function preload() {
  // Load the background image before the setup function
  bgImage = loadImage('images/desertSurvivor.jpg'); // Replace with your image path
}

function setup() {
  createCanvas(1420, 700);

  // Define the character object with x and y
  character = {
    x: 200,
    y: 370,
    width: 50, // Width of the character
    height: 160, // Height of the character
  };

  // Define the ground level as the canvas height minus the height of the ground
  groundLevel = height - 210;

  // Create an instance of the Character class, passing the character object
  myCharacter = new Character(character);

  // Spawn multiple low obstacles with different positions and speeds
  for (let i = 0; i < 2; i++) {
    obstaclesLow.push({
      x: 1420, // Start each obstacle off the screen
      y: 620, // Place at the same height as the character
      width: 50, // Width of the obstacle
      height: 50, // Height of the obstacle
      speed: random(5, 10, 15), // Random speed for each obstacle
    });
  }

  // Spawn multiple high obstacles with different positions and speeds
  for (let i = 0; i < 2; i++) {
    obstaclesHigh.push({
      x: 1420, // Start each obstacle off the screen
      y: 570, // Higher position for these obstacles
      width: 30, // Width of the obstacle
      height: 100, // Height of the obstacle
      speed: random(5, 10), // Random speed for each obstacle
    });
  }
}

function draw() {
  image(bgImage, 0, 0, 1420, 820);

  if (gameOver) {
    fill(255);
    textSize(50);
    textAlign(CENTER);
    text("Game Over", width / 2, height / 2);
    // Display the final score
    textSize(28);
    text("Final Score: " + int(score), width / 2, height / 2 + 60);
    text("Press 'R' to Restart", width / 2, height / 2 + 100); // Display restart message

    // Check if 'r' is pressed to restart the game
    if (keyIsPressed && key === 'r') {
      resetGame(); // Call resetGame to restart the game
    }

    noLoop(); // Stop the draw loop
    return; // Exit the function if the game is over
  }

  // Increase score over time
  if (frameRate() > 0) {
    score += 8 / frameRate(); // Only add to the score if frame rate is positive
  }

  // Display the score
  fill(0);
  textSize(32);
  text("Score: " + int(score), 100, 50);

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

  // Update and draw all low obstacles
  for (let i = 0; i < obstaclesLow.length; i++) {
    updateObstacle(obstaclesLow[i]);
    drawSnake(obstaclesLow[i]); // Use the function to draw the snake
    checkCollision(character, obstaclesLow[i]); // Check for collision with low obstacles
  }

  // Update and draw all high obstacles
  for (let i = 0; i < obstaclesHigh.length; i++) {
    updateObstacle(obstaclesHigh[i]);
    drawCactus(obstaclesHigh[i]); // Use the function to draw the cactus
    checkCollision(character, obstaclesHigh[i]); // Check for collision with high obstacles
  }
}

// Function to update obstacles position
function updateObstacle(obstacle) {
  obstacle.x -= obstacle.speed; // Move the obstacle left
  // Reset the obstacle's position when it goes off-screen
  if (obstacle.x + obstacle.width < 0) {
    obstacle.x = width; // Reset to the right side
  }
}

// Function to draw a snake as a low obstacle
function drawSnake(obstacle) {
  push(); // Save drawing state
  translate(obstacle.x, obstacle.y); // Move snake as low obstacle

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

  pop(); // Restore drawing state
}

// Function to draw high obstacles
function drawCactus(obstacle) {
  push(); // Save drawing state
  translate(obstacle.x, obstacle.y); // Move cactus as high obstacle

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

  pop(); // Restore drawing state
}

// Function to check for collisions
function checkCollision(character, obstacle) {
  if (
    character.x < obstacle.x + obstacle.width &&
    character.x + character.width > obstacle.x &&
    character.y < obstacle.y + obstacle.height &&
    character.y + character.height > obstacle.y
  ) {
    gameOver = true; // Set gameOver to true if a collision is detected
  }
}

function resetGame() {
  gameOver = false;
  score = 0; // Reset score to 0

  // Reset character position
  character.x = 200;
  character.y = 370;

  // Reset obstacles' positions
  for (let i = 0; i < obstaclesLow.length; i++) {
    obstaclesLow[i].x = 1420; // Move obstacles back to the right
  }
  for (let i = 0; i < obstaclesHigh.length; i++) {
    obstaclesHigh[i].x = 1420; // Move high obstacles back to the right
  }

  loop(); // Restart the draw loop
}

// Use keyPressed function to detect 'r' key press
function keyPressed() {
  if (gameOver && key === 'r') {
    resetGame(); // Call resetGame to restart the game if 'r' is pressed
  }
}
