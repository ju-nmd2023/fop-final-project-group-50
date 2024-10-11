let player;
let ground;
let gameObstacles = []; 
let gameSpeed = 7; // Initial game speed
let gameOver = false; // Track the game over state
let speedIncreaseInterval = 900; // Time in milliseconds for speed increase
let lastSpeedIncreaseTime = 0; // Time when the speed was last increased
let score = 0; // Initialize the score variable

function setup() {
  createCanvas(1400, 820); 
  player = new Player();   // Create a new player instance
  ground = new Ground();    // Create a new ground instance
  setupBall(); // start rolling the ball

  // Initialize the first set of obstacles
  for (let i = 0; i < 3; i++) {
    generateNewObstacle();
  }
}

function draw() {
  background(backgroundImage); //bg
  ground.show(); // Display the ground
  player.update(); // Update player position
  player.show(); // Show the player on the canvas

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
  if (player.character.y > height + 50) {
      gameOver = true;
  }

  // Display game over message if the game is over
  if (gameOver) {
    fill(255);
    rect(width / 2 - 100, height / 2 - 50, 200, 120); // box draw
    textSize(32);
    fill(0); // text color
    textAlign(CENTER);
    text('GAME OVER', width / 2, height / 2 - 10); // display game over text
    textSize(24);
    text(`Score: ${Math.floor(score)}`, width / 2, height / 2 + 20); // display score
    textSize(20);
    text('Press R to Restart', width / 2, height / 2 + 50); // display restart instruction
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
  score += gameSpeed * 0.01; // ddjust game speed increase. Higher = more difficult

  // Display the score
  textSize(32);
  fill(255); // score txt
  textAlign(LEFT);
  text(`Score: ${Math.floor(score)}`, 10, 30); // Display the score
  drawBall(); // Draw the spinning ball, has to be here in order to make it more fluent with the obstacles
}


function displayGameOverScreen() {
  fill(255); // background for game over messagfe
  rect(width / 4, height / 3, width / 2, height / 3);

  fill(0); // Black color for text
  textSize(50);
  textAlign(CENTER);
  text('GAME OVER', width / 2, height / 2 - 20); // "GAME OVER" txt

  textSize(32);
  text(`Score: ${Math.floor(score)}`, width / 2, height / 2 + 30); // Display score on game over
}

function resetGame() {
  gameObstacles = [];
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
  if (gameObstacles.length < 4) {
    type = random(['high', 'low']); // First obstacle cant be hanging object (arrow)
  } else {
    type = random(['high', 'low', 'hanging']); //include hanging objecs later
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
    this.character = new character(200, height - 240); 
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
    const hitboxWidth = 30; // hitbox width of chracter
    const hitboxHeight = this.isDucking ? 40 : 110; // Height while sliding/ducking

    // Define the triangle's bounding box for collision detection
    const triangleLeft = obstacle.x + 60; // Left x-coordinate
    const triangleRight = obstacle.x + 90; // Right x-coordinate
    const triangleBottom = obstacle.y + obstacle.h; // height
    const triangleTop = obstacle.y; 

    // Check for collision using the bounding box
    return collideRectRect(
      this.character.x + 200 - hitboxWidth / 2, 
      this.character.y + (this.isDucking ? 1 : 25),
      hitboxWidth,
      hitboxHeight,
      triangleLeft,
      triangleTop,
      triangleRight - triangleLeft, 
      triangleBottom - triangleTop 
    );
}
}

class Ground {
  constructor() {
    this.x = 0;
    this.y = height - 240; 
    this.w = width;
    this.h = 40; // Height of the ground
  }

  show() {
    fill(100);
    rect(this.x, this.y, this.w, this.h); // Draw the ground at this.y

    
    fill(139, 69, 19); // Brown color for the ground below
    rect(0, this.y + this.h, width, height - (this.y + this.h)); 
  }
}

// Obstacle class definition
class Obstacle {
  constructor(type) {
      this.x = width; // Start at the right edge of the canvas
      this.w = 20; // Obstacle width
      this.speed = gameSpeed; // Speed of obstale

      // Set obstacle height based on its type
      if (type === 'high') {
          this.y = height - 280; 
          this.h = 70; // Height of high obstacle
      } else if (type === 'low') {
          this.y = height - 280; 
          this.h = 50; // Height of low obstacle
      }
  }

  move() {
    this.x -= this.speed; // Move obstacle left
  }

  show() {
    fill(128, 128, 128);
    noStroke(); 

    if (this.h === 70) { 
      triangle(this.x + 60, this.y + this.h, this.x + 90, this.y + this.h, this.x + 75, this.y);
    } 
    else if (this.h === 50) { 
      triangle(this.x + 60, this.y + this.h, this.x + 90, this.y + this.h, this.x + 75, this.y);
    }
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
    this.w = 140; // Width of the hanging obstacle (total width of graphics)
    this.h = 100; 
    this.y = height - 450; // Position of the hanging obstacle graphics
    this.hitboxY = height - 20;
    this.speed = gameSpeed; // Speed of the hanging obstacle
  }

  move() {
    this.x -= this.speed; // Move obstacle left
  }

  show() {
    noStroke();

    // Draw multiple arrows stacked on top of each other
    for (let i = 0; i < 3; i++) { // Draw 3 arrows
      const offsetY = i * 25; 
      this.drawArrow(this.x, this.y + offsetY); 
    }
  }

  // Helper function to draw an arrow at a given position
  drawArrow(x, y) {
    // Arrowhead
    fill(70, 70, 70); // Dark gray for the arrowhead
    triangle(x + 30, y + 50, x + 50, y + 40, x + 50, y + 60); // Pointing to the left
    
    fill(139, 69, 19); // Brown color for the shaft
    rect(x + 50, y + 46, 100, 8); // Long shaft rectangle
    
    fill(139, 69, 19); // Brown color for the tail
    triangle(x + 140, y + 50, x + 160, y + 40, x + 160, y + 60); // arrow end
  }

  // Update collision detection
  collides(player) {
    if (player.x + player.w > this.x && 
        player.x < this.x + this.w && 
        player.y + player.h > this.hitboxY && // Check against the hitbox position
        player.y < this.hitboxY + this.h) { // Check against the hitbox height
      return true; // Collision detected
    }
    return false; // No collision
  }

  offScreen() {
    // Check if the obstacle is off-screen
    return this.x + this.w < -0;
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