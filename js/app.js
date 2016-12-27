// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
    this.x = -100;
    // Array has all possible y postions (elements 1-3)
    this.yArray = [0, 48, 131, 214];
    this.speed = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    this.checkCollisions();
    // Reset the enemy back to X position 0
    // and assign random Y path
    // after enemy crosses the screen
    if (this.x > 500) {
        this.x = -100;
        this.y = this.yArray[this.randomNumber()];
    }
    // If enemy is at starting position, assign new speed
    if (this.x <= -100) {
        this.speed = this.newSpeed();
    }

    // Update x coordinate for enemy
    this.x = this.x + (this.speed * dt);
};

// Generate random number between 1 and 3
// Used to assign new enemy speed and Y coordinate
// Required: Changed randomNumber to Enemy.prototype.randomNumber
Enemy.prototype.randomNumber = function() {
    min = Math.ceil(1);
    max = Math.floor(3);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function that calculates new speed for enemy
// Required: Changed newSpeed to Enemy.prototype.newSpeed
Enemy.prototype.newSpeed = function() {
    return 200 * this.randomNumber();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.spriteArray = ["images/char-boy.png",
        "images/char-cat-girl.png",
        "images/char-horn-girl.png",
        "images/char-pink-girl.png",
        "images/char-princess-girl.png"];
    // Start with first sprite
    this.sprite = this.spriteArray[0];
    this.x = 200;
    this.y = 380;
    this.X_MOVE = 101;
    this.Y_MOVE = 83;
    this.X_START = 200;
    this.Y_START = 380;
};

//Enemy.prototype.update = function() {
//   checkCollisions();
//

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(e) {
    // Move Up
    if (e === "up" && this.y > 0) {
        this.y = this.y - this.Y_MOVE;
    }
    // Move Down
    if (e === "down" && this.y < 350) {
        this.y = this.y + this.Y_MOVE;
    }
    // Move Left
    if (e === "left" && this.x > 0) {
        this.x = this.x - this.X_MOVE;
    }
    // Move Right
    if (e === "right" && this.x < 400) {
        this.x = this.x + this.X_MOVE;
    }

    // Reset player to start position upon reaching water
    if (this.y < 0) {
        this.y = this.Y_START;
        this.x = this.X_START;
    }
};

//Player.prototype.update = function() {
//};

Enemy.prototype.checkCollisions = function() {

    if (this.y === player.y) {
        if ((this.x - player.x) < 60 && (this.x - player.x) > -60) {
            player.y = player.Y_START;
            player.x = player.X_START;

            // Move last sprite to first element in array and assign as new sprite
            player.spriteArray.unshift(player.spriteArray.pop());
            player.sprite = player.spriteArray[0];
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

// Create three enemies in allEnemies array
// assign increasing starting y coordinate to each enemy
var allEnemies = [];
for (i = 0; i <= 2; i++) {
    allEnemies[i] = new Enemy();
    allEnemies[i].y = allEnemies[i].yArray[i + 1];
}

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
