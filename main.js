let game;
let currentUser = null;
const boardDiv = document.getElementById('board');
const scoreDiv = document.getElementById('score');
const gameOverDiv = document.getElementById('game-over');
const usernameInput = document.getElementById('username');
const startBtn = document.getElementById('start-btn');

function getHighScore(username) {
    return localStorage.getItem(`2048_highscore_${username}`) || 0;
}

function setHighScore(username, score) {
    localStorage.setItem(`2048_highscore_${username}`, score);
}

function render() {
    boardDiv.innerHTML = '';
    for (let i = 0; i < game.size; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        for (let j = 0; j < game.size; j++) {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'cell';
            cellDiv.setAttribute('data-value', game.board[i][j]);
            cellDiv.textContent = game.board[i][j] !== 0 ? game.board[i][j] : '';
            rowDiv.appendChild(cellDiv);
        }
        boardDiv.appendChild(rowDiv);
    }
    scoreDiv.textContent = `Score: ${game.score} | High Score: ${getHighScore(currentUser)}`;
    if (game.isGameOver()) {
        gameOverDiv.style.display = 'block';
        // Update high score if needed
        if (game.score > getHighScore(currentUser)) {
            setHighScore(currentUser, game.score);
            alert('New High Score!');
        }
    } else {
        gameOverDiv.style.display = 'none';
    }
}

document.addEventListener('keydown', (e) => {
    if (!currentUser) return;
    let moved = false;
    if (e.key === 'ArrowUp') moved = game.move('up');
    else if (e.key === 'ArrowDown') moved = game.move('down');
    else if (e.key === 'ArrowLeft') moved = game.move('left');
    else if (e.key === 'ArrowRight') moved = game.move('right');
    if (moved) render();
});

startBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (!username) {
        alert('Please enter a username!');
        return;
    }
    currentUser = username;
    game = new Game2048();
    render();
});

// Touch controls for mobile
let touchStartX = 0;
let touchStartY = 0;

boardDiv.addEventListener('touchstart', function(e) {
    if (!currentUser) return;
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
});

boardDiv.addEventListener('touchend', function(e) {
    if (!currentUser) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;
    let moved = false;
    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 30) moved = game.move('right');
        else if (dx < -30) moved = game.move('left');
    } else {
        if (dy > 30) moved = game.move('down');
        else if (dy < -30) moved = game.move('up');
    }
    if (moved) render();
});