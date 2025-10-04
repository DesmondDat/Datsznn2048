class Game2048 {
    constructor(size = 4) {
        this.size = size;
        this.score = 0;
        this.board = Array.from({ length: size }, () => Array(size).fill(0));
        this.addRandomTile();
        this.addRandomTile();
    }

    addRandomTile() {
        const empty = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] === 0) empty.push([i, j]);
            }
        }
        if (empty.length > 0) {
            const [i, j] = empty[Math.floor(Math.random() * empty.length)];
            this.board[i][j] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    move(direction) {
        let moved = false;
        let boardBefore = JSON.stringify(this.board);

        if (direction === "up") {
            this.transpose();
            moved = this.compressAndMerge();
            this.transpose();
        } else if (direction === "down") {
            this.transpose();
            this.reverseRows();
            moved = this.compressAndMerge();
            this.reverseRows();
            this.transpose();
        } else if (direction === "left") {
            moved = this.compressAndMerge();
        } else if (direction === "right") {
            this.reverseRows();
            moved = this.compressAndMerge();
            this.reverseRows();
        }

        if (moved && JSON.stringify(this.board) !== boardBefore) {
            this.addRandomTile();
            return true;
        }
        return false;
    }

    compressAndMerge() {
        let moved = false;
        for (let i = 0; i < this.size; i++) {
            let row = this.board[i].filter(num => num !== 0);
            for (let j = 0; j < row.length - 1; j++) {
                if (row[j] === row[j + 1]) {
                    row[j] *= 2;
                    this.score += row[j];
                    row[j + 1] = 0;
                }
            }
            row = row.filter(num => num !== 0);
            while (row.length < this.size) row.push(0);
            if (row.toString() !== this.board[i].toString()) moved = true;
            this.board[i] = row;
        }
        return moved;
    }

    transpose() {
        this.board = this.board[0].map((_, i) => this.board.map(row => row[i]));
    }

    reverseRows() {
        this.board = this.board.map(row => row.reverse());
    }

    isGameOver() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] === 0) return false;
                if (i < this.size - 1 && this.board[i][j] === this.board[i + 1][j]) return false;
                if (j < this.size - 1 && this.board[i][j] === this.board[i][j + 1]) return false;
            }
        }
        return true;
    }
}