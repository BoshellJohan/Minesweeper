import {message} from "../main.js"
import { casillas_horizontales, casillas_verticales, setOffSquare } from "./gameState.js"
import { analizeBoard, win} from "./stopGame.js"

export const returnNums = (className) => {
    let pattern = /[\d]+/g
    return className.match(pattern)
}


export const getElementSquare = (x, y) => {
    let element = document.getElementsByClassName(`[${x},${y}]`)[0]
    return element
}

export const getRandomPosition = () => {
    let x = Math.floor(Math.random() * casillas_verticales)
    let y = Math.floor(Math.random() * casillas_horizontales)
    return [x, y]
}

export const getAttributeBoolean = (elem, attribute) => {
    return elem.getAttribute(attribute) == "true" ? true : false
}

export const getAttributeSquares = (elem) => {
    let isMine = elem.getAttribute("ismine") == "true" ? true : false
    let isFlagged = elem.getAttribute("isflagged") == "true" ? true : false
    let isDiscovered = elem.getAttribute("isdiscovered") == "true" ? true : false
    let count = Number(elem.getAttribute("count"))
    return [isMine, isFlagged, isDiscovered, count]
}

export const lockSquare = (elem) => {
    let [isMine, , , count] = getAttributeSquares(elem)

    elem.disabled = true
    if(!isMine){
        if(count != 0){
            elem.textContent = count
        }

        let [x, y] = returnNums(elem.className)

        if((Number(x) + Number(y)) % 2 == 0){
            elem.style.backgroundColor = "rgb(229, 194, 159)"
        } else {
            elem.style.backgroundColor = "rgb(215, 184, 153)"
        }
    }
}

export const showMessage = (msg, className) => {
    message.style.display = "block"
    message.textContent = msg
    message.className = ""
    message.classList.add("message")
    message.classList.add(className)
}

export const hideMessage = () => {
    message.style.display = "none"
}


export const updateFlagsAmount = (flags_amount) => {
    let remainingFlags = document.getElementById("count-flags")
    remainingFlags.textContent = flags_amount
    remainingFlags.setAttribute("count", flags_amount)
    if(flags_amount == 0){
        let temp_result = analizeBoard() //true = victoria || derrota
        if(temp_result){
            win()
        }
    }
}


export const callFunctionAfterSquareValid = (square, func) => {
    let [x, y] = returnNums(square.className)
    x = parseInt(x)
    y = parseInt(y)

    for (let i = 0; i < setOffSquare.length; i++) {
        let [dx, dy] = setOffSquare[i]
        let xBoundary = x + dx
        let yBoundary = y + dy
        if ((xBoundary >= 0 && xBoundary < casillas_verticales) && (yBoundary >= 0 && yBoundary < casillas_horizontales)){
                func(xBoundary, yBoundary)
        }

    }
}