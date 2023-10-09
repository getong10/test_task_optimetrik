"use strict";

const n = +prompt('Введите количество клеток', '');
const arrQ = prompt('Введите координаты x и y ферзя через запятую', '').trim().split(',');
const N_D = +prompt('Введите количество уток', '');
let arrD = [];
let i = 0;
while (i < N_D) {
    arrD[i] = prompt(`Введите координаты ${i + 1} утки через запятую`, '').trim().split(',');
    i++;
}

function renderBoard (n) {
    const board = document.querySelector('#board');
    board.style.cssText = `grid-template-columns: repeat(${n}, 40px); grid-template-rows: repeat(${n}, 40px)`;

    const boardArray = Array.from({length: n}, () => Array(n).fill(false));

    const labels = Array.from({length: n});
    for (let i = 0; i < labels.length; i++) {
        labels[i] = i + 1;
    }

    const queenX = parseInt(arrQ[0]);
    const queenY = parseInt(arrQ[1]);
    boardArray[queenX - 1][queenY - 1] = 'queen';

    for (let i = 0; i < arrD.length; i++) {
        const duckX = parseInt(arrD[i][0]);
        const duckY = parseInt(arrD[i][1]);
        boardArray[duckX - 1][duckY - 1] = 'duck';
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (
                boardArray[i][j] !== 'queen' &&
                isFree(i + 1, j + 1, boardArray) &&
                boardArray[i][j] !== 'duck') {
                    boardArray[i][j] = 'way';
                }
        }
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            board.appendChild(cell);

            if (i === 0 && j !== 0) {
                const label = document.createElement('div');
                label.className = 'label-top';
                label.textContent = j + 1;
                cell.appendChild(label);
            } else if (j === 0 && i !== 0) {
                const label = document.createElement('div');
                label.className = 'label-bottom';
                label.textContent = i + 1;
                cell.appendChild(label);
            } else if (i === 0 && j === 0) {
                const label = document.createElement('div');
                label.className = 'label-for-one';
                label.textContent = j + 1;
                cell.appendChild(label);
            }

            if (boardArray[i][j] === 'queen') {
                cell.style.cssText = 'background-color: yellow';
            } else if (boardArray[i][j] === 'duck') {
                cell.style.cssText = 'background-color: red';
            } else if (boardArray[i][j] === 'way') {
                cell.style.cssText = 'background-color: green'
            } else if ((i % 2 === 0 && j % 2 !== 0) || (i % 2 !== 0 && j % 2 === 0)) {
                cell.style.cssText = 'background-color: black;'
            } else cell.style.cssText = 'background-color: white;'
        }
    }
}

function isFree (x, y, boardArray) {
    const path = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    for (const [px, py] of path) {
        let currX = x + px;
        let currY = y + py;
        
        while (
            currX >= 1 && currX <= boardArray.length &&
            currY >= 1 && currY <= boardArray.length) {
                if (boardArray[currX - 1][currY - 1] === 'queen') {
                    return true;
                } else if (boardArray[currX - 1][currY - 1] === 'duck') {
                    break;
                }
                currX += px;
                currY += py;
            }
    }
    return false;
}

renderBoard(n);