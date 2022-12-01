import cards from "./lib/cardArray"
import { gameScreen } from "./screens.js"
import { youLooseScreen } from "./screens.js"
import { youWinScreen } from "./screens.js"
import { stopTimer } from "./lib/timer.js"
import { startTimer } from "./lib/timer.js"

export function chooseLevelBlock(container) {
    let chooseLevelBlockArray = []
    const chooseLevelDiv = document.createElement("div")
    chooseLevelDiv.classList.add("choose_level-div")
    chooseLevelBlockArray.push(chooseLevelDiv)
    const chooseLevelTitle = document.createElement("p")
    chooseLevelTitle.classList.add("choose_level-title")
    chooseLevelDiv.appendChild(chooseLevelTitle)
    chooseLevelTitle.textContent = "Выбери сложность"
    const chooseLevelForm = document.createElement("div")
    chooseLevelForm.classList.add("choose_level_form")
    chooseLevelDiv.appendChild(chooseLevelForm)
    const chooseLevelButtonEasy = document.createElement("button")
    chooseLevelButtonEasy.classList.add(
        "choose_level-button_easy",
        "level-button"
    )
    chooseLevelForm.appendChild(chooseLevelButtonEasy)
    chooseLevelButtonEasy.textContent = "1"
    const chooseLevelButtonMedium = document.createElement("button")
    chooseLevelButtonMedium.classList.add(
        "choose_level-button_medium",
        "level-button"
    )
    chooseLevelForm.appendChild(chooseLevelButtonMedium)
    chooseLevelButtonMedium.textContent = "2"
    const chooseLevelButtonHard = document.createElement("button")
    chooseLevelButtonHard.classList.add(
        "choose_level-button_hard",
        "level-button"
    )
    chooseLevelForm.appendChild(chooseLevelButtonHard)
    chooseLevelButtonHard.textContent = "3"
    const chooseLevelButton = document.createElement("button")
    chooseLevelButton.classList.add("choose_level-button")
    chooseLevelDiv.appendChild(chooseLevelButton)
    chooseLevelButton.textContent = "Старт"

    chooseLevelBlockArray.forEach((element) => {
        container.appendChild(element)
    })

    chooseLevelButtonEasy.addEventListener("click", (event) => {
        window.application.level = "easy"
        chooseLevelButtonEasy.classList.add("level-button_click")
        chooseLevelButtonMedium.classList.remove("level-button_click")
        chooseLevelButtonHard.classList.remove("level-button_click")
    })
    chooseLevelButtonMedium.addEventListener("click", (event) => {
        window.application.level = "medium"
        chooseLevelButtonMedium.classList.add("level-button_click")
        chooseLevelButtonEasy.classList.remove("level-button_click")
        chooseLevelButtonHard.classList.remove("level-button_click")
    })
    chooseLevelButtonHard.addEventListener("click", (event) => {
        window.application.level = "hard"
        chooseLevelButtonHard.classList.add("level-button_click")
        chooseLevelButtonEasy.classList.remove("level-button_click")
        chooseLevelButtonMedium.classList.remove("level-button_click")
    })

    chooseLevelButton.addEventListener("click", (event) => {
        event.preventDefault()
        window.application.screens["game"] = gameScreen
        window.application.renderScreen("game")
    })
}

export function gameBlock(container) {
    const gameMenu = document.createElement("div")
    gameMenu.classList.add("game_menu")
    const gameTimerMenu = document.createElement("div")
    gameTimerMenu.classList.add("game_timer_menu")
    const gameTimerMin = document.createElement("p")
    gameTimerMin.classList.add("game_time")
    gameTimerMin.textContent = "min"
    gameTimerMenu.appendChild(gameTimerMin)
    const gameTimerSek = document.createElement("p")
    gameTimerSek.classList.add("game_time")
    gameTimerSek.textContent = "sek"
    gameTimerMenu.appendChild(gameTimerSek)
    const gameTimer = document.createElement("p")
    gameTimer.classList.add("game_timer")
    gameTimer.textContent = "00:00"
    gameMenu.appendChild(gameTimer)
    const gameMenuButton = document.createElement("button")
    gameMenuButton.classList.add("game_button")
    gameMenuButton.textContent = "Начать заново"
    gameMenu.appendChild(gameMenuButton)
    container.appendChild(gameTimerMenu)
    container.appendChild(gameMenu)
    gameMenuButton.addEventListener("click", () => {
        location.reload()
    })
}

export function cardBlock(container) {
    const cardField = document.createElement("div")
    cardField.classList.add("card_field")
    window.application.chosenCard = []
    window.application.winCounter = 0
    const cardArray = []

    if (window.application.level == "easy") {
        for (let i = 0; i < 3; i++) {
            const random = Math.floor(
                Math.random() * Object.values(cards).length
            )
            cardArray.push(Object.values(cards)[random])
        }
    } else if (window.application.level == "medium") {
        for (let i = 0; i < 6; i++) {
            const random = Math.floor(
                Math.random() * Object.values(cards).length
            )
            cardArray.push(Object.values(cards)[random])
        }
    } else if (window.application.level == "hard") {
        for (let i = 0; i < 9; i++) {
            const random = Math.floor(
                Math.random() * Object.values(cards).length
            )
            cardArray.push(Object.values(cards)[random])
        }
    } else {
        return
    }
    const cardContainer = cardArray.concat(cardArray)
    shuffle(cardContainer)
    Object.entries(cardContainer).forEach(([key, value]) => {
        const card = document.createElement("img")
        card.setAttribute("id", value.name)
        card.setAttribute("src", value.src)
        card.classList.add("card", "card_hidden")
        cardField.appendChild(card)
        function cardHidden() {
            card.setAttribute("src", value.card_upside)
        }

        setTimeout(cardHidden, 2500)

        card.addEventListener("click", () => {
            card.setAttribute("src", value.src)
            card.classList.add("card_animation")
            startTimer()
            if (window.application.chosenCard.length !== 2) {
                window.application.chosenCard.push(card.id)
            }
            if (
                window.application.chosenCard.length === 2 &&
                window.application.chosenCard[0] ===
                    window.application.chosenCard[1]
            ) {
                window.application.chosenCard = []
                window.application.winCounter++
            }
            if (
                window.application.chosenCard.length === 2 &&
                window.application.chosenCard[0] !==
                    window.application.chosenCard[1]
            ) {
                window.application.chosenCard = []
                window.application.screens["youLoose"] = youLooseScreen
                window.application.renderScreen("youLoose")
                stopTimer()
            }
            if (
                window.application.level === "easy" &&
                window.application.winCounter === 3
            ) {
                window.application.screens["youWin"] = youWinScreen
                window.application.renderScreen("youWin")
                stopTimer()
            }
            if (
                window.application.level === "medium" &&
                window.application.winCounter === 6
            ) {
                window.application.screens["youWin"] = youWinScreen
                window.application.renderScreen("youWin")
                stopTimer()
            }
            if (
                window.application.level === "hard" &&
                window.application.winCounter === 9
            ) {
                window.application.screens["youWin"] = youWinScreen
                window.application.renderScreen("youWin")
                stopTimer()
            }
        })
    })

    container.appendChild(cardField)
}

export function youLooseBlock(container) {
    let youLooseBlockArray = []
    const youLooseImg = document.createElement("img")
    youLooseImg.setAttribute("src", "static/loose.png")
    youLooseImg.classList.add("loose_image")
    youLooseBlockArray.push(youLooseImg)
    const youLooseTitle = document.createElement("p")
    youLooseTitle.classList.add("you_loose_title")
    youLooseTitle.textContent = "Вы проиграли!"
    youLooseBlockArray.push(youLooseTitle)
    const timeForPlay = document.createElement("p")
    timeForPlay.classList.add("time_for_play")
    timeForPlay.textContent = "Затраченное время:"
    youLooseBlockArray.push(timeForPlay)
    const time = document.createElement("p")
    time.classList.add("time")
    time.textContent = window.application.finalTime
    youLooseBlockArray.push(time)
    const youLooseButton = document.createElement("button")
    youLooseButton.classList.add("you_loose_button")
    youLooseButton.textContent = "Играть снова"
    youLooseBlockArray.push(youLooseButton)
    youLooseButton.addEventListener("click", () => {
        location.reload()
    })
    youLooseBlockArray.forEach((element) => {
        container.appendChild(element)
    })
}

export function youWinBlock(container) {
    let youWinBlockArray = []
    const youWinImg = document.createElement("img")
    youWinImg.setAttribute("src", "static/win.png")
    youWinImg.classList.add("win_image")
    youWinBlockArray.push(youWinImg)
    const youWinTitle = document.createElement("p")
    youWinTitle.classList.add("you_win_title")
    youWinTitle.textContent = "Вы выиграли!"
    youWinBlockArray.push(youWinTitle)
    const timeForPlay = document.createElement("p")
    timeForPlay.classList.add("time_for_play")
    timeForPlay.textContent = "Затраченное время:"
    youWinBlockArray.push(timeForPlay)
    const time = document.createElement("p")
    time.classList.add("time")
    time.textContent = window.application.finalTime
    youWinBlockArray.push(time)
    const youWinButton = document.createElement("button")
    youWinButton.classList.add("you_win_button")
    youWinButton.textContent = "Играть снова"
    youWinBlockArray.push(youWinButton)
    youWinButton.addEventListener("click", () => {
        location.reload()
    })
    youWinBlockArray.forEach((element) => {
        container.appendChild(element)
    })
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
}
