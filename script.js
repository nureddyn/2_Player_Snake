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
    constructor(board, context, position) {
        this.domElement = board;
        this.context = context;
        this.blockSize = 25;
        this.head = {x: this.blockSize*position, y: this.blockSize*position};
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

        for (let i = this.body.length-1; i > 0; i--) {
            this.body[i] = this.body[i-1];
        }

        if (this.body.length) {
            this.body[0] = [this.head.x, this.head.y];
        }
        for (let i = 0; i < this.body.length; i++) {
            this.context.fillStyle = 'green';
            this.context.fillRect(this.body[i][0], this.body[i][1], this.blockSize, this.blockSize);
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
let gameOver = false;
let board = new Board();
let snake1 = new Snake(board.domElement, board.context, 18);
let snake2 = new Snake(board.domElement, board.context, 1);
let food = new Food(board.domElement, board.context);
document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('keydown', changeDirection);
    document.addEventListener('keydown', changeDirection);
    setInterval(update, 1000/10);



    // DOM manipulation
    let buttonsLeft = document.querySelector(".buttons-left");
    let buttonsRight = document.querySelector(".buttons-right");

    let buttonsLeftDiv = document.createElement("div");
    let buttonW = document.createElement("div");
    let buttonA = document.createElement("div");
    let buttonS = document.createElement("div");
    let buttonD = document.createElement("div");

    buttonsLeftDiv.setAttribute("class", "buttons-left");
    buttonW.setAttribute("class", "button-w");
    buttonW.innerText = "W";
    buttonA.setAttribute("class", "button-a");
    buttonA.innerText = "A";
    buttonS.setAttribute("class", "button-s");
    buttonS.innerText = "S";
    buttonD.setAttribute("class", "button-d");
    buttonD.innerText = "D";

    //
    let buttonsRightDiv = document.createElement("div");
    let buttonUp = document.createElement("div");
    let buttonLeft = document.createElement("div");
    let buttonDown = document.createElement("div");
    let buttonRight = document.createElement("div");

    buttonsRightDiv.setAttribute("class", "buttons-right");
    buttonUp.setAttribute("class", "button-w");
    buttonUp.innerHTML = "&#11205";
    buttonLeft.setAttribute("class", "button-a");
    buttonLeft.innerHTML = "&#11207";
    buttonDown.setAttribute("class", "button-s");
    buttonDown.innerHTML = "&#11206";
    buttonRight.setAttribute("class", "button-d");
    buttonRight.innerHTML = "&#11208";

    window.onresize = function() {
        if (window.screen.width < 600
            && document.querySelector(".buttons-left")
            && document.querySelector(".buttons-right")) {
            document.querySelector(".buttons-left").innerHTML = '';
            document.querySelector(".buttons-left").remove();

            document.querySelector(".buttons-right").innerHTML = '';
            document.querySelector(".buttons-right").remove();

        } else if (window.screen.width >= 600
            && !document.querySelector(".buttons-left")
            && !document.querySelector(".buttons-right")) {
                buttonsLeftDiv.append(buttonW, buttonA, buttonS, buttonD);
                document.querySelector(".left").append(buttonsLeftDiv);
                buttonsRightDiv.append(buttonUp, buttonLeft, buttonDown, buttonRight);
                document.querySelector(".right").append(buttonsRightDiv);
            
        }
    }

});


function changeDirection(e) {
    // Snake 1 events
    if (e.code == 'ArrowUp' && snake1.velocityY != 1) {
        snake1.velocityX = 0;
        snake1.velocityY = -1;
    }
    else if (e.code == 'ArrowDown' && snake1.velocityY != -1) {
        snake1.velocityX = 0;
        snake1.velocityY = 1;
    }
    else if (e.code == 'ArrowLeft' && snake1.velocityX != 1) {
        snake1.velocityX = -1;
        snake1.velocityY = 0;
    }
    else if (e.code == 'ArrowRight' && snake1.velocityX != -1) {
        snake1.velocityX = 1;
        snake1.velocityY = 0;
    }
    // Snake 2 events
    else if (e.code == 'KeyW' && snake2.velocityY != 1) {
        snake2.velocityX = 0;
        snake2.velocityY = -1;
    }
    else if (e.code == 'KeyS' && snake2.velocityY != -1) {
        snake2.velocityX = 0;
        snake2.velocityY = 1;
    }
    else if (e.code == 'KeyA' && snake2.velocityX != 1) {
        snake2.velocityX = -1;
        snake2.velocityY = 0;
    }
    else if (e.code == 'KeyD' && snake2.velocityX != -1) {
        snake2.velocityX = 1;
        snake2.velocityY = 0;
    }
}

function update() {
    if (gameOver == true) return;
    board.make();
    food.make();
    snake1.eat(food);
    snake2.eat(food);

    snake1.make();
    snake2.make();

    if (snake1.head.x < 0 || snake1.head.x > (board.blockSize * board.columns) - 1 ||
        snake1.head.y < 0 || snake1.head.y > (board.blockSize * board.rows) - 1) {
        gameOver = true;
        alert("Game Over");
        alert("Player 2 wins");
    }
    else if (snake2.head.x < 0 || snake2.head.x > (board.blockSize * board.columns) - 1 ||
        snake2.head.y < 0 || snake2.head.y > (board.blockSize * board.rows) - 1) {
        gameOver = true;
        alert("Game Over");
        alert("Player 1 wins");
    }
    else if (Math.round(snake1.head.x / 25) == Math.round(snake2.head.x / 25)
            && Math.round(snake1.head.y / 25) == Math.round(snake2.head.y / 25)) {
        alert("Game Over");
        alert("Tie");
        document.location.reload();
    }

    for (let i = 0; i < snake1.body.length; i++) {
        if (snake1.head.x == snake1.body[i][0] && snake1.head.y == snake1.body[i][1]) {
            gameOver = true;
            alert("Game Over");
            alert("Player 2 wins");
        }
    }

    for (let i = 0; i < snake2.body.length; i++) {
        if (snake2.head.x == snake2.body[i][0] && snake2.head.y == snake2.body[i][1]) {
            gameOver = true;
            alert("Game Over");
            alert("Player 1 wins");
        }
    }
}

