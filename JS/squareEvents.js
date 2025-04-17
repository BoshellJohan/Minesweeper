import {
    getAttributeBoolean, getElementSquare, returnNums, lockSquare,
    showMessage, updateFlagsAmount, getAttributeSquares, callFunctionAfterSquareValid
} from "./utils.js";

import { placeMines } from "./boardUtils.js";
import { analizeBoard, stopGame, win } from "./stopGame.js";
import { firstClick } from "./gameState.js";
import { addValueToSquares } from "./squareNumbers.js";
import { setSquaresAroundFirstClick } from './handleFirstClick.js.js';


//Incrementa la cantidad de banderas disponibles.

const addAmountFlags = () => {
    const flagCounter = document.getElementById("count-flags");
    let cantidad_banderas = Number(flagCounter.getAttribute("count"));

    updateFlagsAmount(++cantidad_banderas);
};

/**
 * Revisa y desbloquea una casilla adyacente si no es una mina.
 * @param {number} xBoundary - Coordenada X de la casilla adyacente.
 * @param {number} yBoundary - Coordenada Y de la casilla adyacente.
 */
const handleLookAdjacentSquare = (xBoundary, yBoundary) => {
    const square = getElementSquare(xBoundary, yBoundary);
    const [isMine, isFlagged, isDiscovered, count] = getAttributeSquares(square);

    if (!isMine && !isDiscovered) {
        square.setAttribute("isDiscovered", true);
        lockSquare(square, count);

        if (isFlagged) {
            square.innerHTML = "";
            square.setAttribute("isflagged", false);
            addAmountFlags();
        }

        if (count === 0) callFunctionAfterSquareValid(square, handleLookAdjacentSquare);
    }
};

/**
 * Alterna la bandera en una casilla.
 * @param {HTMLElement} square - La casilla sobre la que se interactúa.
 */
const toggleFlag = (square) => {
    const flagCounter = document.getElementById("count-flags");
    let cantidad_banderas = Number(flagCounter.getAttribute("count"));
    const isFlagged = getAttributeBoolean(square, "isflagged");

    if (isFlagged) {
        square.innerHTML = "";
        cantidad_banderas++;
        square.setAttribute("isflagged", false);
    } else if (cantidad_banderas > 0) {
        const img = document.createElement("img");
        img.src = "./images/flag.svg";
        img.alt = "";
        img.style.pointerEvents = "none"; // Evita que la imagen intercepte clics

        cantidad_banderas--;
        square.appendChild(img);
        square.setAttribute("isflagged", true);
    } else {
        showMessage("No hay más banderas restantes.", "failed");
    }

    updateFlagsAmount(cantidad_banderas);
};

/**
 * Destapa una casilla y verifica si es una mina.
 * @param {HTMLElement} square - La casilla seleccionada.
 */
const showSquare = (square) => {
    let [x, y] = returnNums(square.className).map(Number);
    const [isMine, isFlagged, , count] = getAttributeSquares(square);

    if (isMine && !isFlagged) {
        showMessage("You pressed a Mine, you lost", "failed");
        stopGame();
    } else if (!isFlagged) {
        lockSquare(square, count);
        square.setAttribute("isDiscovered", true);

        if (count === 0) callFunctionAfterSquareValid(square, handleLookAdjacentSquare);
        if (analizeBoard()) win();
    }
};

/**
 * Maneja el evento de clic en una casilla.
 * @param {MouseEvent} ev - Evento de clic del ratón.
 */
export const squarePressed = (ev) => {
    const mouseClick = ev.button; // 0: izquierdo (descubrir), 2: derecho (bandera)
    const squareButton = ev.target;
    const isFlagged = getAttributeBoolean(squareButton, "isflagged");
    const isActive = firstClick.isActive;

    if (mouseClick === 2) {
        toggleFlag(squareButton);
    } else if (isActive && !isFlagged) {
        setSquaresAroundFirstClick(squareButton);
        placeMines();
        addValueToSquares();
        firstClick.isActive = false;
        showSquare(squareButton);
    } else {
        showSquare(squareButton);
    }
};
