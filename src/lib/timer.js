let sec = 0
let min = 0
let timerID
const gameTimer = document.querySelector(".game_timer")

export const startTimer = () => {
    timer()
}

export const stopTimer = () => {
    gameTimer.textContent = "00:00"
    clearTimeout(timerID)
    const finalTime =
        (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec)
    sec = 0
    min = 0
    return (window.application.finalTime = finalTime)
}

function tick() {
    sec++
    if (sec >= 60) {
        sec = 0
        min++
    }
}

function add() {
    tick()
    gameTimer.textContent =
        (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec)
    timer()
}

function timer() {
    timerID = setTimeout(add, 1000)
}
