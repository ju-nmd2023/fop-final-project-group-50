let player;
let ground;
let gameObstacles = []; // Renamed obstacles to gameObstacles to avoid conflicts
let gameSpeed = 5; // Initial game speed
let gameOver = false; // Track the game over state
let speedIncreaseInterval = 900; // Time in milliseconds for speed increase
let lastSpeedIncreaseTime = 0; // Time when the speed was last increased
let score = 0; // Initialize the score variable

function setup() {
  createCanvas(1400, 820); // Keep the larger canvas size
  player = new Player();   // Create a new player instance
  ground = new Ground();    // Create a new ground instance
  setupBall(); // Initialize the ball

  // Initialize the first set of obstacles
  for (let i = 0; i < 3; i++) {
    generateNewObstacle();
  }
}

function draw() {
  background(255); // Clear the background to white
  ground.show(); // Display the ground
  player.update(); // Update player position
  player.show(); // Show the player on the canvas
  drawBall(); // Draw the spinning ball

  // Display and manage obstacles
  for (let i = gameObstacles.length - 1; i >= 0; i--) {
      gameObstacles[i].move(); // Move the obstacle
      gameObstacles[i].show(); // Display the obstacle

      // Check for collisions
      if (player.hits(gameObstacles[i])) {
          console.log('Game Over');
          gameOver = true; // Set game over state
          noLoop(); // Stop the game if hit by an obstacle
      }

      // Remove off-screen obstacles
      if (gameObstacles[i].offScreen()) {
          gameObstacles.splice(i, 1);
      }
  }

  // Check if the player falls below the ground level
  if (player.character.y > height + 50) { // Game over if the player falls below ground + 50
      gameOver = true;
  }

  // Display game over message if the game is over
  if (gameOver) {
    fill(255); // White color for the box
    rect(width / 2 - 100, height / 2 - 50, 200, 120); // Draw the box
    textSize(32);
    fill(0); // Black color for text
    textAlign(CENTER);
    text('GAME OVER', width / 2, height / 2 - 10); // Display game over text
    textSize(24);
    text(`Score: ${Math.floor(score)}`, width / 2, height / 2 + 20); // Display score
    textSize(20);
    text('Press R to Restart', width / 2, height / 2 + 50); // Display restart instruction
    return; // Skip the rest of the draw function
}
  // Generate new obstacles based on game speed
  // As the game speed increases, more obstacles will spawn more frequently
  if (frameCount % Math.floor(400 / gameSpeed) === 0) {
      generateNewObstacle();
  }

  // Increase game speed over time
  if (millis() - lastSpeedIncreaseTime > speedIncreaseInterval) {
      gameSpeed += 0.1; // Increase speed
      lastSpeedIncreaseTime = millis(); // Reset the timer
  }

  // Increase score based on game speed
  score += gameSpeed * 0.01; // Increase score based on speed (scale down for reasonable values)

  // Display the score
  textSize(32);
  fill(0); // Black color for score text
  textAlign(LEFT);
  text(`Score: ${Math.floor(score)}`, 10, 30); // Display the score
}


function displayGameOverScreen() {
  fill(255); // White background for the game over box
  rect(width / 4, height / 3, width / 2, height / 3); // Draw a white box

  fill(0); // Black color for text
  textSize(50);
  textAlign(CENTER);
  text('GAME OVER', width / 2, height / 2 - 20); // Display "GAME OVER"

  textSize(32);
  text(`Score: ${Math.floor(score)}`, width / 2, height / 2 + 30); // Display the score below
}

function resetGame() {
  gameObstacles = []; // Reset obstacles
  gameSpeed = 5; // Reset game speed
  gameOver = false; // Reset game over state
  score = 0; // Reset score
  player = new Player(); // Create a new player instance
  ground = new Ground(); // Create a new ground instance
  setupBall(); // Reinitialize the ball

  // Initialize the first set of obstacles
  for (let i = 0; i < 3; i++) {
      generateNewObstacle();
  }

  loop(); // Restart the game loop
}

// Function to generate a new obstacle
function generateNewObstacle() {
  let type;

  // Ensure the first obstacle is not a hanging obstacle
  if (gameObstacles.length < 3) {
    type = random(['high', 'low']); // First obstacle must be either high or low
  } else {
    type = random(['high', 'low', 'hanging']); // Subsequent obstacles can include hanging
  }

  let obstacle;

  // Create new obstacle based on type
  if (type === 'hanging') {
    obstacle = new HangingObstacle(); // Create a new hanging obstacle
  } else {
    obstacle = new Obstacle(type); // Create a regular obstacle
  }

  gameObstacles.push(obstacle); // Add the obstacle to the array
}

class Player {
  constructor() {
    this.character = new character(200, height - 240); // Moved the player 100 points to the right (x = 150)
    this.gravity = 0.8;
    this.lift = -15;
    this.velocity = 0;
    this.isDucking = false;
  }

  update() {
    this.velocity += this.gravity;
    this.character.y += this.velocity;

    if (this.character.y >= height - 400) {
      this.character.y = height - 400;
      this.velocity = 0;
    }

    if (this.isDucking) {
      this.character.y += 150;
    }
  }

  show() {
    this.character.show(this.isDucking);
  }

  jump() {
    if (this.character.y === height - 400) {
      this.velocity = this.lift;
    }
  }

  duck() {
    this.isDucking = true;
  }

  standUp() {
    this.isDucking = false;
  }

  hits(obstacle) {
    const hitboxWidth = 60;
    const hitboxHeight = this.isDucking ? 40 : 110;

    return collideRectRect(
      this.character.x + 200 - hitboxWidth / 2, // Adjusted the x position to center the hitbox
      this.character.y + (this.isDucking ? 1 : 25),
      hitboxWidth,
      hitboxHeight,
      obstacle.x,
      obstacle.y,
      obstacle.w,
      obstacle.h
    );
  }
}

class Ground {
  constructor() {
    this.x = 0;
    this.y = height - 240; // Move the ground back up by 200 points
    this.w = width;
    this.h = 40; // Height of the ground
  }

  show() {
    fill(100); // Ground color
    rect(this.x, this.y, this.w, this.h); // Draw the ground at this.y

    // Draw the brown area below the ground
    fill(139, 69, 19); // Brown color for the ground below
    rect(0, this.y + this.h, width, height - (this.y + this.h)); // Draw the brown graphic
  }
}

// Obstacle class definition
class Obstacle {
  constructor(type) {
      this.x = width; // Start at the right edge of the canvas
      this.w = 20; // Obstacle width
      this.speed = gameSpeed; // Speed of the obstacle

      // Set obstacle height based on its type
      if (type === 'high') {
          this.y = height - 280; // Move obstacle up by 200 points
          this.h = 70; // Height of high obstacle
      } else if (type === 'low') {
          this.y = height - 280; // Move obstacle up by 200 points
          this.h = 50; // Increase height of low obstacle by 50 points
      } else if (type === 'hole') {
          this.h = 80; // Height of the hole
          this.y = height - 280; // Move hole up by 200 points
      }
  }

  move() {
    this.x -= this.speed; // Move obstacle left
  }

  show() {
    fill(150); // Brown color for regular obstacles
    rect(this.x, this.y, this.w, this.h); // Draw the obstacle
  }

  offScreen() {
    // Check if the obstacle is off-screen
    return this.x + this.w < 0;
  }
}

// Create the HangingObstacle class
class HangingObstacle {
  constructor() {
    this.x = width; // Start at the right edge of the canvas
    this.w = 20; // Obstacle width
    this.h = 60; // Height of the hanging obstacle
    this.y = height - 410; // Spawn 140 points above the ground (height - 240 - 120)
    this.speed = gameSpeed; // Speed of the hanging obstacle
  }

  move() {
    this.x -= this.speed; // Move obstacle left
  }

  show() {
    fill(0, 150, 0); // Green color for hanging obstacles
    rect(this.x, this.y, this.w, this.h); // Draw the obstacle
  }

  offScreen() {
    // Check if the obstacle is off-screen
    return this.x + this.w < 0;
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
      player.jump(); // Jump when the up arrow is pressed
  }

  if (keyCode === DOWN_ARROW) {
      player.duck(); // Duck when the down arrow is pressed
  }

  if (key === 'r' || key === 'R') { // Check for 'R' key to restart the game
      resetGame(); // Call the reset function
  }
}

// Handle key releases
function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    player.standUp(); // Stop ducking when the down arrow is released
  }
}