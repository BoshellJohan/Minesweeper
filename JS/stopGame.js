import { getAttributeBoolean, getElementSquare, showMessage, getAttributeSquares } from "./utils.js";
import { casillas_horizontales, casillas_verticales, handleTimer } from "./gameState.js";

// Finaliza el juego mostrando todas las minas y deshabilitando las casillas.
export const stopGame = () => {
    document.querySelectorAll(".square").forEach(square => {
        if (getAttributeBoolean(square, "ismine")) {
            square.style.backgroundColor = "red";
            square.innerHTML = "";
        }
        square.disabled = true;
    });

    handleTimer(false);
};


// Muestra el mensaje de victoria y detiene el cronómetro.
export const win = () => {
    showMessage("Congratulations, you have won!!", "success");
    handleTimer(false);
};

/**
 * Analiza el tablero para determinar si el jugador ha ganado.
 * @returns {boolean} `true` si el jugador ha ganado, `false` en caso contrario.
 */
export const analizeBoard = () => {
    for (let i = 0; i < casillas_verticales; i++) {
        for (let j = 0; j < casillas_horizontales; j++) {
            let square = getElementSquare(i, j);
            let [isMine, isFlagged, isDiscovered] = getAttributeSquares(square);

            if ((isMine && !isFlagged) || (!isMine && isFlagged) || (!isMine && !isDiscovered)) {
                return false;
            }
        }
    }
    return true;
};
