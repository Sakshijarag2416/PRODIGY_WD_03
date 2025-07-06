const board = document.getElementById('game-board');
const statusText = document.getElementById('status');
let cells = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

function drawBoard() {
  board.innerHTML = '';
  cells.forEach((cell, index) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.dataset.index = index;
    div.textContent = cell;
    div.addEventListener('click', handleClick);
    board.appendChild(div);
  });
}
function showCelebration(player) {
  const celebration = document.getElementById('celebration');
  const image = document.getElementById('celebration-img');
  const message = document.getElementById('congrats-text');

  if (player === 'X') {
    image.src = "https://media.giphy.com/media/111ebonMs90YLu/giphy.gif"; // dancing man
    message.textContent = "Congratulations Player X 🎉";
  } else {
    image.src = "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif"; // dancing minions
    message.textContent = "Congratulations Player O 🎊";
  }

  celebration.style.display = "block";
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (cells[index] !== '' || !gameActive) return;
  cells[index] = currentPlayer;
  drawBoard();
  if (checkWin(currentPlayer)) {
    statusText.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }
  if (cells.every(cell => cell !== '')) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (currentPlayer === 'O') aiMove();
}

function aiMove() {
  let emptyIndices = cells.map((val, idx) => val === '' ? idx : null).filter(v => v !== null);
  if (emptyIndices.length === 0) return;
  let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  setTimeout(() => {
    cells[randomIndex] = 'O';
    drawBoard();
    if (checkWin('O')) {
      statusText.textContent = `O wins!`;
      gameActive = false;
    } else if (cells.every(cell => cell !== '')) {
      statusText.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = 'X';
    }
  }, 500);
}

function checkWin(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(index => cells[index] === player)
  );
}

function restartGame() {
  cells = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = '';
  drawBoard();
  document.getElementById('celebration').style.display = 'none';
}

drawBoard();
