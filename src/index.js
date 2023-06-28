const player = (s) => {
  const sign = s;

  const getSign = () => sign;

  return {
    getSign,
  };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const setSignOnEmptySlot = (idx, s) => {
    if (board[idx] === "") {
      board[idx] = s;
    }
  };

  const hasEmptySlot = () => board.includes("");

  return {
    getBoard,
    setSignOnEmptySlot,
    hasEmptySlot,
  };
})();

const gameController = (() => {
  const playerX = player("X");
  const playerO = player("O");
  let winner;
  const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWin(s) {
    let foundWinner = false;

    for (let i = 0; i < winPattern.length; i++) {
      if (
        winPattern[i].every(
          (slot) => gameBoard.getBoard()[slot] === s.getSign()
        )
      ) {
        foundWinner = true;
        break;
      }
    }
    return foundWinner;
  }

  let currentPlayer = playerX;
  while (gameBoard.hasEmptySlot()) {
    // Player's turn
    console.log(`Player-${currentPlayer.getSign()}'s turn`);
    const idx = prompt("Enter the slot number(0-8):");
    if (idx === "") break;
    gameBoard.setSignOnEmptySlot(+idx, currentPlayer.getSign());
    // Check if got the winner
    if (checkWin(playerX)) {
      winner = playerX;
      break;
    }
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  }
  if (winner) {
    console.log(`Player-${winner.getSign()} wins`);
  } else {
    console.log(`It's a draw`);
  }
})();
