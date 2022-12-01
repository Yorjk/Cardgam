import { chooseLevelBlock } from "./blocks.js"
import { gameBlock } from "./blocks.js"
import { cardBlock } from "./blocks.js"
import { youLooseBlock } from "./blocks.js"
import { youWinBlock } from "./blocks.js"

const app = document.querySelector(".app")
export function chooseLevelScreen() {
    const chooseLevel = document.createElement("div")
    chooseLevel.classList.add("choose_level_screen")
    app.appendChild(chooseLevel)

    window.application.blocks["chooseLevel"] = chooseLevelBlock
    window.application.renderBlock("chooseLevel", chooseLevel)
}

window.application.screens["chooseLevel"] = chooseLevelScreen
window.application.renderScreen("chooseLevel")

export function gameScreen() {
    app.innerHTML = ""
    const game = document.createElement("div")
    game.classList.add("game_screen", "center")
    app.appendChild(game)

    window.application.blocks["game"] = gameBlock
    window.application.renderBlock("game", game)

    window.application.blocks["cardField"] = cardBlock
    window.application.renderBlock("cardField", game)
}

export function youLooseScreen() {
    app.innerHTML = ""
    const loose = document.createElement("div")
    loose.classList.add("end_of_game")
    app.appendChild(loose)
    window.application.blocks["youLoose"] = youLooseBlock
    window.application.renderBlock("youLoose", loose)
}

export function youWinScreen() {
    app.innerHTML = ""
    const win = document.createElement("div")
    win.classList.add("end_of_game")
    app.appendChild(win)
    window.application.blocks["youWin"] = youWinBlock
    window.application.renderBlock("youWin", win)
}
