let character;
let myCharacter;

function setup() {
  createCanvas(400, 400);

  // Define the character object with x and y
  character = {
    x: 200,
    y: 160,
  };

  // Create an instance of the Character class, passing the character object
  myCharacter = new Character(character);
}

function draw() {
  background(255);

  // Draw the character
  myCharacter.draw();
}
