import {loadBoard} from "./board.js"
import {hideMessage } from "./utils.js";
import {board} from "../main.js"

let timerElem = document.getElementById("time")
let intervalo = null;
let initTime = 0;

export let casillas_horizontales
export let casillas_verticales
export let cantidad_minas
export let sizeSquare

export let aroundFirstClick = []
export let firstClick = {"isActive": true}

export const setOffSquare = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
];

export const colors = {
    "0": "rgb(0,0,0)", "1": "rgb(81, 165, 230)",
    "2": "rgb(79, 194, 91)", "3": "rgb(203, 64, 59)",
    "4": "rgb(177, 71, 207)", "5": "rgb(228, 217, 68)",
    "6": "rgb(79, 194, 91)", "7": "#fff", "8": "#fff"
};

const mode = {
    "easy": { filas: 10, columnas: 10, minas: 20, sizeCuadro: 40, fontSize: 2 },
    "medium": { filas: 12, columnas: 20, minas: 40, sizeCuadro: 35, fontSize: 1.6 },
    "hard": { filas: 20, columnas: 15, minas: 50, sizeCuadro: 30, fontSize: 1.2 }
};

//Inicia o Pausa el temporizador según el valor del parámetro iniciar.
export const handleTimer = (iniciar = true) => {
    if (intervalo) clearInterval(intervalo);
    if (!iniciar) return intervalo = null;

    initTime = 0;
    timerElem.textContent = initTime;
    intervalo = setInterval(() => timerElem.textContent = ++initTime, 1000);
};

//Retorna la configuración del juego según el modo de juego.
const getGameConfig = (modeGame) => mode[modeGame] || mode["easy"];

//Inicia el tablero, recibe su modo de juego como parámetro.
export const startBoard = (modeGame) => {
    handleTimer()

    let rules = getGameConfig(modeGame)
    let fontSize = rules.fontSize
    board.style.fontSize = `${fontSize}rem`

    casillas_horizontales = rules.filas
    casillas_verticales = rules.columnas
    cantidad_minas = rules.minas
    sizeSquare = rules.sizeCuadro

    firstClick.isActive = true
    aroundFirstClick = []
    hideMessage()
    loadBoard()
}