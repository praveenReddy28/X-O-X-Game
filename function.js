document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("board");
  const cells = document.querySelectorAll(".cell");
  const restartBtn = document.getElementById("restart-btn");
  const gameStatus = document.getElementById("game-status");

  let currentPlayer = "X";
  let gameActive = true;
  let gameState = ["", "", "", "", "", "", "", "", ""];

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Event listener for each cell
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });

  // Event listener for restart button
  restartBtn.addEventListener("click", restartGame);

  function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
      clickedCell.getAttribute("data-cell-index")
    );

    // If cell already has a value or game is not active, do nothing
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
      return;
    }

    // Update cell and game state
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Check for win or draw
    if (checkWin()) {
      gameActive = false;

      // Announce the winner

      gameStatus.textContent = `Player ${currentPlayer} wins! 🎉`;
      statusElement.classList.add("winning-blast");

      // Reset winning blast effect after 1 second
      setTimeout(() => {
        statusElement.classList.remove("winning-blast");
      }, 1000);

      // Add your "winning blast" feature here, e.g., play a sound, display fireworks, etc.
      // Example: Playing a sound
      // const winningSound = new Audio('winning-sound.mp3');
      // winningSound.play();

      return;
    }

    if (!gameState.includes("")) {
      gameActive = false;
      gameStatus.textContent = "It's a draw! 🤝";
      return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameStatus.textContent = `${currentPlayer}'s turn`;
  }

  function checkWin() {
    return winningConditions.some((condition) => {
      return condition.every((index) => {
        return gameState[index] === currentPlayer;
      });
    });
  }

  function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameStatus.textContent = `${currentPlayer}'s turn`;

    cells.forEach((cell) => {
      cell.textContent = "";
    });
  }
});

// blast
