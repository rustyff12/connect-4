const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {
    constructor() {
        // this.playerTurn = "O";
        // Player set up for two players
        this.players = ["X", "O"];
        this.currentPlayerIndex = 0;

        // Player Colors
        this.playerColors = {
            X: "red",
            O: "blue",
        };

        this.grid = [
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
        ];

        this.cursor = new Cursor(6, 7);

        // Initialize a 6x7 connect-four grid
        Screen.initialize(6, 7);
        Screen.setGridlines(true);

        // Replace this with real commands
        Screen.addCommand("left", "move cursor left", this.cursor.left);
        Screen.addCommand("right", "move cursor right", this.cursor.right);
        Screen.addCommand("up", "move cursor up", this.cursor.up);
        Screen.addCommand("down", "move cursor down", this.cursor.down);
        Screen.addCommand(
            "return",
            "place move at cursor position",
            this.placeMove
        );
        // this.cursor.setBackgroundColor();
        Screen.render();
    }

    // Check for win
    static checkWin(grid) {
        const directions = [
            [0, 1], // Horizontal
            [1, 0], // Vertical
            [1, 1], // Diagonal Left to Right
            [-1, 1], // Diagonal Right to Left
        ];

        const maxOffset = 3;

        for (let row = 0; row < grid.length; row++) {
            for (let column = 0; column < grid[0].length; column++) {
                const cell = grid[row][column];

                if (cell !== " ") {
                    for (const [dRow, dCol] of directions) {
                        let sequence = [cell];

                        for (let i = 1; i <= maxOffset; i++) {
                            const newRow = row + dRow * i;
                            const newCol = column + dCol * i;

                            if (
                                newRow >= 0 &&
                                newRow < grid.length &&
                                newCol >= 0 &&
                                newCol < grid[0].length &&
                                grid[newRow][newCol] === cell
                            ) {
                                sequence.push(cell);
                            } else {
                                break;
                            }
                        }

                        if (sequence.length === 4) {
                            return cell; // Winner found
                        }
                    }
                }
            }
        }

        // Check for tied game
        if (grid.every((row) => row.every((cell) => cell !== " "))) {
            return "T"; // Tied game
        }

        // No winner and not tied, (game ongoing)
        return false;
    }

    // Place move
    placeMove = () => {
        // console.log(this.grid);
        const currentPlayerSymbol = this.players[this.currentPlayerIndex];
        const currentPlayerColor = this.playerColors[currentPlayerSymbol];

        if (Screen.grid[this.cursor.row][this.cursor.col] === " ") {
            Screen.setTextColor(
                this.cursor.row,
                this.cursor.col,
                currentPlayerColor
            );
            Screen.setGrid(
                this.cursor.row,
                this.cursor.col,
                currentPlayerSymbol
            );
            Screen.render();

            // Check for winner
            if (ConnectFour.checkWin(Screen.grid)) {
                ConnectFour.endGame(ConnectFour.checkWin(Screen.grid));
            } else {
                // Switch player
                this.currentPlayerIndex =
                    (this.currentPlayerIndex + 1) % this.players.length;
            }
        } else {
            console.log("invalid move, this space is occupied");
        }
    };

    static endGame(winner) {
        if (winner === "O" || winner === "X") {
            Screen.setMessage(`Player ${winner} wins!`);
        } else if (winner === "T") {
            Screen.setMessage(`Tie game!`);
        } else {
            Screen.setMessage(`Game Over`);
        }
        Screen.render();
        Screen.quit();
    }
}

module.exports = ConnectFour;
