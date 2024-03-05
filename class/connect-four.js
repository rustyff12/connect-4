const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {
    constructor() {
        this.playerTurn = "O";
        // Player set up for two players
        this.players = ["X", "O"];
        this.currentPlayerIndex = 0;

        // Player Colors
        This.playerColors = {
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
        Screen.addCommand(
            "t",
            "test command (remove)",
            ConnectFour.testCommand
        );

        this.cursor.setBackgroundColor();
        Screen.render();
    }

    // Remove this
    static testCommand() {
        console.log("TEST COMMAND");
    }

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
