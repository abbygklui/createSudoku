class SudokuGenerator {
    #grid;

    constructor() {
        this.#grid = [
            [],
            [],
            [],
            []
        ];
    }

    createSudoku() {
        var num = 0;
        for (var x = 0; x < 4; x++) {
            var options = [1, 2, 3, 4];
            ////for the first row
            if (x == 0) {
                for (var y = 0; y < 4; y++) {
                    var optionsNum = this.getRandomInt(options.length);
                    num = options[optionsNum]
                    this.#grid[x].push(num);
                    options.splice(optionsNum, 1)
                }
            }
            ////for the rest
            else {
                this.#grid[x] = [];
                for (var y = 0; y < 4; y++) {
                    var attempts = 0;
                    while (attempts < 10) { // Limit the number of attempts
                        var optionsNum = this.getRandomInt(options.length);
                        num = options[optionsNum];
    
                        //// check if num already exists within the column
                        var duplicateFound = false;
                        for (var i = 0; i < x; i++) {
                            if (num == this.#grid[i][y]) {
                                duplicateFound = true;
                                break;
                            }
                        }
                        var boxStartX = Math.floor(x / 2) * 2; // Calculate the starting row index of the current 2x2 this.#grid box
                        var boxStartY = Math.floor(y / 2) * 2; // Calculate the starting column index of the current 2x2 this.#grid box
                        for (var bx = boxStartX; bx < boxStartX + 2; bx++) {
                            for (var by = boxStartY; by < boxStartY + 2; by++) {
                                if (num == this.#grid[bx][by]) {
                                    duplicateFound = true;
                                    break;
                                }
                            }
                            if (duplicateFound) break;
                        }
    
                        if (!duplicateFound) {
                            this.#grid[x].push(num);
                            options.splice(optionsNum, 1);
                            break; // Exit the while loop if a valid number is found
                        }
                        attempts++;
                    }
                    if (attempts >= 10) {
                        // Reset the entire row and start over
                        this.#grid[x] = [];
                        x=0;
                        break;
                    }
                }
            }
        }
    }

    printSudoku() {
        for (var x = 0; x < 4; x++) {
            if (x == 2) {
                console.log("---------")
            }
            var row = "";
            for (var y = 0; y < 4; y++) {
                row = row + this.#grid[x][y] + " ";
                if (y == 1) {
                    row += "|" + " ";
                }
            }
            console.log(row);
        }
    }

    generateBlanks() {
        var options = [1, 2, 3, 4];
        var rowNum = 0;
        var columnNum = 0;
        for (var x = 0; x < 8; x++) {
            rowNum = this.getRandomInt(options.length);
            columnNum = this.getRandomInt(options.length);
            this.#grid[rowNum].splice(columnNum, 1, " ");
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    ////public
    generateAndPrintSudoku() {
        this.createSudoku();
        this.generateBlanks();
        this.printSudoku();
    }
}

var sudokuGenerator = new SudokuGenerator();
sudokuGenerator.generateAndPrintSudoku();

