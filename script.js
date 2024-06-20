document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box");
    const playerText = document.getElementById("playerText");
    const restartBtn = document.getElementById("restartBtn");
    const O_TEXT = "O";
    const X_TEXT = "X";
    let currentPlayer = X_TEXT;
    let spaces = Array(9).fill(null);

    const startGame = () => {
        boxes.forEach(box => box.addEventListener("click", boxClicked));
    };

    function boxClicked(e) {
        const id = e.target.id;

        if (!spaces[id]) {
            spaces[id] = currentPlayer;
            e.target.innerText = currentPlayer;

            if (playerHasWon()) {
                playerText.innerText = `${currentPlayer} has won!`;
                highlightWinningBlocks();
                return;
            }

            currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
        }
    }

    const playerHasWon = () => {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const condition of winningCombos) {
            let [a, b, c] = condition;

            if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
                highlightWinningBlocks(condition);
                return true;
            }
        }

        return false;
    };

    const highlightWinningBlocks = (winningBlocks) => {
        winningBlocks.forEach(index => {
            boxes[index].style.backgroundColor = "var(--winning-blocks)";
        });
    };

    restartBtn.addEventListener("click", () => {
        spaces.fill(null);

        boxes.forEach(box => {
            box.innerText = "";
            box.style.backgroundColor = ""; // Reset background color
        });

        playerText.innerText = "Tic Tac Toe";

        currentPlayer = X_TEXT;
    });

    startGame();
});