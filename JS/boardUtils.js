import { getElementSquare, getAttributeBoolean, getRandomPosition } from "./utils.js";
import { casillas_horizontales, casillas_verticales, cantidad_minas, setOffSquare, aroundFirstClick } from "./gameState.js";

/**
 * Verifica cuántas minas hay alrededor de una casilla que es mina. Con intención de no tenes una mina encerrada por otras minas.
 * @param {number} x - Coordenada X de la casilla.
 * @param {number} y - Coordenada Y de la casilla.
 * @return {boolean} - Es una casilla válida para ser mina o no.
 */
export const isMineAroundOtherMines = (x, y) => {
    let validSquares = 0, countMines = 0;

    for (let [dx, dy] of setOffSquare) {
        let xBoundary = dx + x;
        let yBoundary = dy + y;

        if (xBoundary >= 0 && xBoundary < casillas_verticales && yBoundary >= 0 && yBoundary < casillas_horizontales) {
            validSquares++;
            let square = getElementSquare(xBoundary, yBoundary);
            if (getAttributeBoolean(square, "ismine")) countMines++;
        }
    }
    return validSquares <= countMines + 2;
};

//Verifica si una posible mina [x,y] está alrededor de la casilla donde se realizó el primer click
//Retorna un Booleano que indica si está alrededor o no.
export const isAroundFirstClick = (x, y) => aroundFirstClick.some(([dx, dy]) => x === dx && y === dy);

//Posiciona las minas de manera al azar a lo largo del tablero, a excepción de la casilla y alrededor de donde se hizó el primer click.
export const placeMines = () => {
    for (let i = 0; i < cantidad_minas; i++) {
        let [x, y] = getRandomPosition();
        let square = getElementSquare(x, y);

        if (getAttributeBoolean(square, "ismine") || isMineAroundOtherMines(x, y) || isAroundFirstClick(x, y)) {
            i--; // Reintentar si la posición es inválida
        } else {
            square.setAttribute("ismine", true);
            square.classList.add("mine");
        }
    }
};
