let backgroundImage; // Variable to hold the background image

function preload() {
  // Load the background image
  backgroundImage = loadImage('images/bg.jpg'); // Replace with the path to your image
}

function setup() {
  createCanvas(1200, 800); // Adjust height if needed
}

function draw() {
  image(backgroundImage, 0, 0, 1600, 800); // bg image
  
  // Call the character drawing function here
  let player = new character(100, height); // Create a character instance
  player.show(false); // Call show function to draw the character

  // Optionally, call the drawBall function if needed
  drawBall();
}

function drawTexturedBall(x, y, radius) {
  fill(150); // Set the color to grey
  noStroke(); // No outline for the ball
  ellipse(x, y, radius * 2, radius * 2); // Draw the main ball

  // Draw the pre-generated darker spots
  fill(100); // Set the spot color to a darker grey
  for (let i = 0; i < spotPositions.length; i++) {
      let spot = spotPositions[i];
      ellipse(spot.x, spot.y, spotSizes[i], spotSizes[i]); // Draw each spot
  }
}

// Character class remains unchanged
class character {
  constructor(x, groundY) {
    this.x = x; // Horizontal position
    this.y = groundY - 110; 
  }

  show(isDucking) {
    push();

    // Translate to a position even further to the right
    translate(this.x + 200, this.y);

    if (isDucking) {
      rotate(4.7);
    }

    // Body
    fill(0, 0, 255); // Blue color for jumpsuit
    rect(-30, 0, 60, 110); // Main body rectangle

    // Head
    fill(255, 204, 0); // Skin color
    ellipse(0, -30, 60, 60); // Head

    // Hat
    fill(0, 0, 255); // Blue color for hat
    rect(-30, -60, 60, 20); // Hat base
    fill(255); // White for text
    textSize(12);
    textAlign(CENTER, CENTER);
    text("JÖRGEN", 0, -50); // Name on the hat

    // Eyes
    fill(0); // Black for eyes
    ellipse(-10, -30, 10, 10); // Left eye
    ellipse(10, -30, 10, 10); // Right eye

    // Tool (Wrench)
    fill(192); // Gray color for wrench
    rect(-60, 70, 50, 7); // Wrench handle
    ellipse(-5, 73, 15, 15);

    // Arms
    fill(255, 204, 0); // Skin color
    rect(-50, 5, 20, 70); // Left arm
    rect(30, 5, 20, 70); // Right arm

    // Hands
    ellipse(-40, 70, 25, 20); // Left hand (holding wrench)
    ellipse(40, 70, 25, 20); // Right hand

    // Legs
    fill(0, 0, 255); // Blue color for pants
    rect(-30, 110, 25, 70); // Left leg
    rect(5, 110, 25, 70); // Right leg

    // Shoes
    fill(255); // White color for shoes
    ellipse(-20, 180, 30, 15); // Left shoe
    ellipse(20, 180, 30, 15); // Right shoe

    // Belt
    fill(0); // Black color for belt
    rect(-30, 90, 60, 10); // Belt

    // Details on suit
    fill(0); // Black color for patches
    rect(-15, 30, 10, 10); // Patch on left chest
    rect(0, 60, 5, 5); // Patch on lower right

    // Neck opening (V-shape)
    fill(255, 204, 0); // Skin color for neck
    triangle(-10, 0, 10, 0, 0, 20);

    pop(); // Restore to the previous state
  }
}

//BALL MADE WITH CHAT GPT TO SAVE TIME

let spotPositions = [];
let spotSizes = []; 
let angle = 0; 

function setupBall() {
    generateSpots(10); // Generate spots for the ball
}

function drawBall() {
    push(); // Save the current drawing state
    translate(width / 10, height / 2 + 100); // Position the ball behind the player
    rotate(angle); // Rotate by the current angle

    drawTexturedBall(0, 0, 130); // Draw ball at center with radius 100
    angle += 0.15; // Increment the rotation angle
    pop(); // Restore the previous drawing state
}

function generateSpots(numSpots) {
    for (let i = 0; i < numSpots; i++) {
        let spotX = random(-100, 100); // Random x position within the ball
        let spotY = random(-100, 100); // Random y position within the ball
        let distance = dist(0, 0, spotX, spotY); // Calculate distance from the center

        // Only save the spot if it's within the radius of the ball
        if (distance < 100) {
            spotPositions.push(createVector(spotX, spotY)); // Store position as a vector
            spotSizes.push(random(10, 20)); // Store random size for the spot
        }
    }
}
