function setup() {
    createCanvas(400, 400);
  }
  
  function draw() {
    background(220);
    
    // Draw the spear with the y value adjusted further down
    drawSpear(200, 300, 200, 5); // Adjust y value and other parameters as needed
  }
  
  function drawSpear(x, y, length, width) {
    // Draw the shaft of the spear (thin brown)
    fill(139, 69, 19); // Brown color for the shaft
    rect(x - width / 2, y - length, width, length); // Shaft
    
    // Draw the spearhead (dark grey) pointing to the left
    fill(50); // Dark grey color for the spearhead
    triangle(x, y - length, x - 20, y - length - 10, x - 20, y - length + 10); // Spearhead
  }
  
  // To run this code, you can copy and paste it into the p5.js web editor at https://editor.p5js.org/
  