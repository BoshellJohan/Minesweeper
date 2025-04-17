import { callFunctionAfterSquareValid, returnNums } from "./utils.js";
import { aroundFirstClick } from "./gameState.js";

/**
 * Almacena las casillas alrededor del primer clic en el array `aroundFirstClick`.
 * @param {HTMLElement} square - La casilla seleccionada en el primer clic.
 */
export const setSquaresAroundFirstClick = (square) => {
    const [x, y] = returnNums(square.className).map(Number);

    aroundFirstClick.push([x, y]); // Agrega la casilla inicial
    callFunctionAfterSquareValid(square, pushSetSquaresAroundFirstClick); // Agrega las adyacentes
};

/**
 * Agrega coordenadas de casillas adyacentes al primer clic.
 * @param {number} xBoundary - Coordenada X de la casilla adyacente.
 * @param {number} yBoundary - Coordenada Y de la casilla adyacente.
 */
const pushSetSquaresAroundFirstClick = (xBoundary, yBoundary) => {
    aroundFirstClick.push([xBoundary, yBoundary]);
};
