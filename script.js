class Board {
    constructor(rows, columns) {
        this.domElement = document.querySelector('.board');
        this.context = this.domElement.getContext('2d');
        this.blockSize = 25;
        this.rows = rows;
        this.columns = columns;
        this.domElement.height = this.rows * this.blockSize;
        this.domElement.width = this.columns * this.blockSize; 
    }

    make(color='black') {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.domElement.height, this.domElement.width);
    }
}

class Snake {
    constructor(x, y) {
        this.domElement = document.querySelector('.board');
        this.context = this.domElement.getContext('2d');
        this.blockSize = 25;
        this.head = {x: x, y: y};
        this.body = [];

    }
    make(color='green') {
        this.context.fillStyle = color;
        this.context.fillRect(this.head.x, this.head.y, this.blockSize, this.blockSize);
    }
}

let board = new Board(20, 20);
let snake = new Snake(200, 200);

document.addEventListener('DOMContentLoaded', () => {
    board.make();
    snake.make()
});

