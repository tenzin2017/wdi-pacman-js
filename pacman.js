// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;


// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Shadow',
  edible: false
};

var ghosts = [inky, blinky, pinky, clyde]

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives);
  console.log('\n\nPower-Pellets: ' + powerPellets);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if(powerPellets > 0) {
  console.log('(p) Eat Power-Pellet');
  }
  if(inky.edible === true ) {
    console.log('(1) Eat Inky (edible)');
  } else {
    console.log('(1) Eat Inky (inedible)');
  }
  if(blinky.edible === true ) {
    console.log('(1) Eat Blinky (edible)');
  } else {
    console.log('(1) Eat Blinky (inedible)');
  }
  if(pinky.edible === true ) {
    console.log('(1) Eat Pinky (edible)');
  } else {
    console.log('(1) Eat Pinky (inedible)');
  }
  if(clyde.edible === true ) {
    console.log('(1) Eat clyde (edible)');
  } else {
    console.log('(1) Eat clyde (inedible)');
  }
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatGhost(ghost) {
  if(ghost.edible === false){
  console.log('\n' + ghost.name + ' ' + ghost.colour + ' ' + 'kills Pac-Man');
  lives--;
  }
  if(ghost.edible === true) {
    console.log('\n Pack-Man eats:  name:' + ghost.name + ', colour:' + ghost.colour + ',character:' + ghost.character);
    score += 200;
    ghost.edible = false;
  }
 if(lives === 0) {
   process.exit();
 }
}

function eatPowerPellet() {
  if(powerPellets === 0) {
    console.log("\n Invalid Command");

  } else {
    console.log('\nChomp!!!!!!');
    score += 50;
    inky.edible = true,
    blinky.edible = true,
    pinky.edible = true,
    clyde.edible = true,
    powerPellets--;
  }
}



// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;
    case 'p':
      eatPowerPellet();
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300 ); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
