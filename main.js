import { startBoard } from "./JS/gameState.js"

//Variables globales
const $ = el => document.querySelector(el)

export const message = $(".message")
export const board = $(".board")


let resetBtn = $("#reset-btn")
let selectElem = document.getElementById("difficulty")
let currentGame = "easy"


selectElem.addEventListener("change", (e) => {
    board.innerHTML = ""
    currentGame = e.target.value
    startBoard(currentGame)
})


resetBtn.addEventListener("click", () => {
    board.innerHTML = ""
    startBoard(currentGame)
})


//Events Listeners
document.addEventListener("DOMContentLoaded", () => {
    startBoard(currentGame)
})

