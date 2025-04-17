import { getAttributeBoolean, getElementSquare } from "./utils.js";
import { casillas_horizontales, casillas_verticales, colors, setOffSquare } from "./gameState.js";

/**
 * Calcula la cantidad de minas alrededor de una casilla (x, y)
 * @param {number} x - Coordenada X de la casilla
 * @param {number} y - Coordenada Y de la casilla
 * @returns {number} - Número de minas en las casillas adyacentes
 */
const countMinesAround = (x, y) => {
    let count = 0;

    for (const [dx, dy] of setOffSquare) {
        const xBoundary = x + dx;
        const yBoundary = y + dy;

        if (xBoundary >= 0 && xBoundary < casillas_verticales && yBoundary >= 0 && yBoundary < casillas_horizontales) {
            if (getAttributeBoolean(getElementSquare(xBoundary, yBoundary), "ismine")) {
                count++;
            }
        }
    }
    return count;
};


// Asigna el número de minas alrededor a cada casilla que no sea mina

export const addValueToSquares = () => {
    for (let i = 0; i < casillas_verticales; i++) {
        for (let j = 0; j < casillas_horizontales; j++) {
            let square = getElementSquare(i, j);

            if (!getAttributeBoolean(square, "ismine")) {
                let minesAround = countMinesAround(i, j);
                square.setAttribute("count", minesAround);
                square.style.color = colors[minesAround];
            }
        }
    }
};
