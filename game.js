let character;
let myCharacter;
let moveSpeed = 5; // Speed of movement
let groundLevel; // Define ground level
let jumpForce = -15; // Upward force for the jump
let gravity = 0.8; // Gravity pulling the character down
let velocityY = 0; // Vertical velocity of the character
let isJumping = false; // To track if the character is in the air
let gameOver = false; // To track if the game is over
let startScreen = true; // Game starts at the start screen

// Define arrays to store multiple obstacles
let obstaclesLow = [];
let obstaclesHigh = []; // New array for high obstacles

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
  background(255);

  // Display the start screen
  if (startScreen) {
    fill(0);
    textSize(50);
    textAlign(CENTER);
    text("Press Enter to Start", width / 2, height / 2);
    if (keyIsDown(ENTER)) {
      startScreen = false; // Exit the start screen when Enter is pressed
    }
    return; // Stop the draw loop until the game starts
  }

  if (gameOver) {
    fill(0);
    textSize(50);
    textAlign(CENTER);
    text("Game Over", width / 2, height / 2);
    noLoop(); // Stop the draw loop
    return; // Exit the function if the game is over
  }

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
    drawObstacle(obstaclesLow[i]);
    checkCollision(character, obstaclesLow[i]); // Check for collision with low obstacles
  }

  // Update and draw all high obstacles
  for (let i = 0; i < obstaclesHigh.length; i++) {
    updateObstacle(obstaclesHigh[i]);
    drawObstacle(obstaclesHigh[i]);
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

// Function to draw obstacles
function drawObstacle(obstacle) {
  fill(255, 0, 0); // Color of the obstacle (red)
  rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
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
