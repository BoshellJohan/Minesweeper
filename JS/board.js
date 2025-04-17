import { squarePressed } from "./squareEvents.js";
import { casillas_horizontales, casillas_verticales, sizeSquare, cantidad_minas} from "./gameState.js";
import { board } from "../main.js";

/**
 * Crea un elemento button para cada casilla del tablero
 * @param {number} x - Coordenada X de la casilla.
 * @param {number} y - Coordenada Y de la casilla.
 * @return {HTMLElement} square - Nueva casilla en el tablero.
 */
const createSquare = (x, y) => {
    let square = document.createElement("button");
    square.classList.add("square", `[${x},${y}]`);
    square.style.width = `${sizeSquare}px`;
    square.style.height = `${sizeSquare}px`;

    square.setAttribute("ismine", false);
    square.setAttribute("isDiscovered", false);
    square.setAttribute("isflagged", false);
    square.setAttribute("count", 0);

    square.style.backgroundColor = (x + y) % 2 == 0 ? "rgb(191, 225, 125)" : "rgb(170, 204, 106)";

    square.addEventListener("mousedown", (ev) => squarePressed(ev));
    square.addEventListener("contextmenu", (event) => event.preventDefault());

    return square;
};

// Carga el tablero con su respectivo ancho y alto según la cantidad de casillas y el tamaño de cada una.
export const loadBoard = () => {
    board.style.width = `${casillas_horizontales * sizeSquare + 3}px`;
    board.style.height = `${casillas_verticales * sizeSquare + 3}px`;
    board.style.gridTemplateColumns = `repeat(${casillas_horizontales}, 1fr)`;

    let countFlags = document.getElementById("count-flags");
    countFlags.setAttribute("count", cantidad_minas);
    countFlags.textContent = cantidad_minas;

    for (let i = 0; i < casillas_verticales; i++) {
        for (let j = 0; j < casillas_horizontales; j++) {
            board.appendChild(createSquare(i, j));
        }
    }
};
