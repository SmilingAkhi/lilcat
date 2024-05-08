const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
let score = 0;
let isAlive = null;
let gameStarted = false; // Flag to track if the game has started
let cactusMoving = false; // Flag to track if the cactus should start moving

function jump() {
  if (!gameStarted) {
    // Start the game if it hasn't started yet
    startGame();
    gameStarted = true;
  }
  if (dino.classList != "jump") {
    dino.classList.add("jump");
    setTimeout(function () {
      dino.classList.remove("jump");
    }, 300);
  }
  // Display score
  context.fillStyle="black";
  context.font="20px courier";
  context.fillText(score, 5, 20);
}

function startGame() {
  isAlive = setInterval(function () {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
      clearInterval(isAlive);
      alert("Game Over! Press spacebar key to restart.");
      document.addEventListener("keydown", restartGame);
    } else if (cactusMoving && cactusLeft < 50 && cactusLeft > 0 && dinoTop < 140) {
      score += 10;
    }
  }, 10);
}

function restartGame(event) {
  if (event.keyCode !== 32) return; // Check if the pressed key is spacebar
  score = 0;
  startGame();
  document.removeEventListener("keydown", restartGame);
}

startGame(); // Start the game initially

document.addEventListener("keydown", function (event) {
  jump();
});

// Add touch screen functionality
document.addEventListener("touchstart", function (event) {
  jump();
});

// Start moving the cactus when the game starts
setTimeout(function() {
  cactusMoving = true;
}, 500); // Adjust the delay as needed

