// script.js
const board = document.getElementById('game-board');
const statusText = document.getElementById('status');
const celebrationDiv = document.getElementById('celebration');
const celebrationImg = document.getElementById('celebration-img');
const congratsText = document.getElementById('congrats-text');

let cells = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function drawBoard() {
    board.innerHTML = '';
    cells.forEach((cellContent, index) => {
        const div = document.createElement('div');
        div.classList.add('cell');
        // Add class for X or O for specific styling
        if (cellContent === 'X') {
            div.classList.add('x');
        } else if (cellContent === 'O') {
            div.classList.add('o');
        }
        div.dataset.index = index;
        div.textContent = cellContent;
        div.addEventListener('click', handleClick);
        board.appendChild(div);
    });
}

function showCelebration(player) {
    if (player === 'X') {
        celebrationImg.src = "https://media.giphy.com/media/111ebonMs90YLu/giphy.gif"; // dancing man
        congratsText.textContent = "Congratulations Player X 🎉";
    } else {
        celebrationImg.src = "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif"; // dancing minions
        congratsText.textContent = "Congratulations Player O 🎊";
    }
    celebrationDiv.style.display = "block";
}

function hideCelebration() {
    celebrationDiv.style.display = 'none';
    celebrationImg.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="; // Reset to transparent GIF
    congratsText.textContent = "";
}

function checkWin(player) {
    return winPatterns.some(pattern =>
        pattern.every(index => cells[index] === player)
    );
}

function handleClick(e) {
    const index = parseInt(e.target.dataset.index); // Parse index to integer
    if (cells[index] !== '' || !gameActive) return;

    cells[index] = currentPlayer;
    drawBoard(); // Redraw board immediately after player move

    if (checkWin(currentPlayer)) {
        statusText.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        showCelebration(currentPlayer); // Show celebration for the winner
        return;
    }

    if (cells.every(cell => cell !== '')) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        hideCelebration(); // Hide celebration on draw
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`; // Update status for next player
    if (currentPlayer === 'O') {
        setTimeout(aiMove, 700); // AI moves after a slight delay
    }
}

function aiMove() {
    if (!gameActive) return;

    let emptyIndices = cells.map((val, idx) => val === '' ? idx : null).filter(v => v !== null);

    if (emptyIndices.length === 0) return; // Should already be handled as a draw

    // Simple AI: Picks a random empty spot
    let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

    cells[randomIndex] = 'O';
    drawBoard();

    if (checkWin('O')) {
        statusText.textContent = `O wins!`;
        gameActive = false;
        showCelebration('O'); // Show celebration for AI winner
    } else if (cells.every(cell => cell !== '')) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        hideCelebration(); // Hide celebration on draw
    } else {
        currentPlayer = 'X';
        statusText.textContent = `Player ${currentPlayer}'s Turn`; // Update status for Player X
    }
}

function restartGame() {
    cells = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = "Player X's Turn"; // Reset status
    drawBoard();
    hideCelebration(); // Ensure celebration is hidden
}

// Initial board setup when the page loads
document.addEventListener('DOMContentLoaded', () => {
    drawBoard();
    statusText.textContent = "Player X's Turn";
});