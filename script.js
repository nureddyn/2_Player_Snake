class Board {
    constructor(blockSize, rows, columns) {
        this.domElement = document.querySelector('.board');
        this.context = this.domElement.getContext('2d');
        this.blockSize = blockSize;
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


let board = new Board(25, 20, 20);

document.addEventListener('DOMContentLoaded', () => {
    board.make();
});

