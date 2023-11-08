class Board {
    constructor() {
        this.domElement = document.querySelector('.board');
        this.context = this.domElement.getContext('2d');
        this.blockSize = 25;
        this.rows = 20;
        this.columns = 20;
        this.height = this.rows * this.blockSize;
        this.width = this.columns * this.blockSize; 
    }

    make() {
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, board.height, board.width);
    }
}


let board = new Board();

document.addEventListener('DOMContentLoaded', () => {
    board.make();
});