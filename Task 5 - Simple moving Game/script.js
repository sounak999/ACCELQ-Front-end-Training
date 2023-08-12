// Get canvas and its 2D context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player object
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0
};

// Event listeners for key presses
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

// Handle key down events
function handleKeyDown(event) {
    if (event.key === 'ArrowRight') {
        player.dx = player.speed;
    } else if (event.key === 'ArrowLeft') {
        player.dx = -player.speed;
    } else if (event.key === 'ArrowDown') {
        player.dy = player.speed;
    } else if (event.key === 'ArrowUp') {
        player.dy = -player.speed;
    }
}

// Handle key up events
function handleKeyUp(event) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        player.dx = 0;
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        player.dy = 0;
    }
}

// Game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update player position
    player.x += player.dx;
    player.y += player.dy;

    // Draw player
    ctx.fillStyle = '#ffff00';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Call the game loop again
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();