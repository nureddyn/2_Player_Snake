class Board {
    constructor() {
        this.domElement = document.querySelector('.board');
        this.context = this.domElement.getContext('2d');
        this.blockSize = 25;
        this.rows = 20;
        this.columns = 20;
        this.domElement.height = this.rows * this.blockSize;
        this.domElement.width = this.columns * this.blockSize; 
    }

    make(color='black') {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.domElement.height, this.domElement.width);
    }
    update(snake) {
        this.context.fillRect(snake.head.x, snake.head.y, board.blockSize, board.blockSize);
    }
}

class Snake {
    constructor(board, context) {
        this.domElement = board;
        this.context = context;
        this.blockSize = 25;
        this.head = {x: this.blockSize*5, y: this.blockSize*5};
        this.body = [];
        this.velocityX = 0;
        this.velocityY = 0;

    }
    make(color='green') {
        this.head.x += this.velocityX * board.blockSize;
        this.head.y += this.velocityY * board.blockSize;
        this.context.fillStyle = color;
        this.context.fillRect(this.head.x, this.head.y, this.blockSize, this.blockSize);
    }
    eat(food) {
        if (this.head.x == food.position.x && this.head.y == food.position.y) {
            this.body.push([food.position.x, food.position.y]);
            food.relocateFood();
        }
    }

}

class Food {
    constructor(board, context) {
        this.domElement = board;
        this.context = context;
        this.blockSize = 25;
        this.position = {
            x: Math.floor((Math.random()*20)) * this.blockSize,
            y: Math.floor((Math.random()*20)) * this.blockSize,
        };

    }
    make(color='purple') {
        this.context.fillStyle = color;
        this.context.fillRect(this.position.x, this.position.y, this.blockSize, this.blockSize);
    }
    relocateFood() {
        this.position = {
            x: Math.floor((Math.random()*20)) * this.blockSize,
            y: Math.floor((Math.random()*20)) * this.blockSize,
        };
    }
}

let board = new Board();
let snake = new Snake(board.domElement, board.context);
let food = new Food(board.domElement, board.context);
document.addEventListener('DOMContentLoaded', () => {
    board.make();
    snake.make();
    food.make();

    document.addEventListener('keyup', changeDirection);
    setInterval(update, 1000/10);

});


function changeDirection(e) {
    snake.head.x += snake.velocityX * snake.blockSize;
    snake.head.y += snake.velocityY * snake.blockSize;
    if (e.code == 'ArrowUp' && snake.velocityY != 1) {
        snake.velocityX = 0;
        snake.velocityY = -1;
    }
    else if (e.code == 'ArrowDown' && snake.velocityY != -1) {
        snake.velocityX = 0;
        snake.velocityY = 1;
    }
    else if (e.code == 'ArrowLeft' && snake.velocityX != 1) {
        snake.velocityX = -1;
        snake.velocityY = 0;
    }
    else if (e.code == 'ArrowRight' && snake.velocityX != -1) {
        snake.velocityX = 1;
        snake.velocityY = 0;
    }
}


function update() {
    board.make();
    food.make();
    snake.eat(food);
    snake.make();
}

