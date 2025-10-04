const game = new Game2048();
const boardDiv = document.getElementById('board');
const scoreDiv = document.getElementById('score');
const gameOverDiv = document.getElementById('game-over');

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
    scoreDiv.textContent = `Score: ${game.score}`;
    if (game.isGameOver()) {
        gameOverDiv.style.display = 'block';
    } else {
        gameOverDiv.style.display = 'none';
    }
}

document.addEventListener('keydown', (e) => {
    let moved = false;
    if (e.key === 'ArrowUp') moved = game.move('up');
    else if (e.key === 'ArrowDown') moved = game.move('down');
    else if (e.key === 'ArrowLeft') moved = game.move('left');
    else if (e.key === 'ArrowRight') moved = game.move('right');
    if (moved) render();
});

render();