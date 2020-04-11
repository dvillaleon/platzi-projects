
const topLeft = document.getElementById('topLeft')
const topRight = document.getElementById('topRight')
const bottomLeft = document.getElementById('bottomLeft')
const bottomRight = document.getElementById('bottomRight')
const btnEmpezar = document.getElementById('btnEmpezar')
const LevelQty = 10
const COLOR_DELAY = 620
const audio_topLeft = new Audio('resources/glassy1.mp3');
const audio_topRight = new Audio('resources/glassy2.mp3');
const audio_bottomLeft = new Audio('resources/glassy3.mp3');
const audio_bottomRight = new Audio('resources/glassy4.mp3');


class Game {
    constructor() {
        this.initialize()
        setTimeout(() => {
            this.sequenceInit()
            this.nextLevel()
        }, 1000);
    }

    initialize() {
        //Se hace un bind para no perder el contexto del 
        //juego a la hora de llamar a la función elegirColor
        this.pickButton = this.pickButton.bind(this)
        this.initialize = this.initialize.bind(this)
        this.nextLevel = this.nextLevel.bind(this)
        this.toggleBtnStart()
        this.level = 1
        this.buttons = {
            topLeft,
            topRight,
            bottomLeft,
            bottomRight
        }
        this.audios = {
            audio_topLeft, 
            audio_topRight,
            audio_bottomLeft,
            audio_bottomRight
        }
    }

    toggleBtnStart() {
        if (btnStart.classList.contains('hide')) {
            btnStart.classList.remove('hide')
        }
        else {
            btnStart.classList.add('hide')
        }
    }

    sequenceInit() {
        this.selection = 0
        this.sequence = new Array(LevelQty).fill(0).map(n =>
            Math.floor(Math.random() * 4))
        // this.secuencia = new Array(10).fill(0).map(n => Math.random()* 4) | 0
    }

    nextLevel() {
        this.turnOnSequence()
        this.addClickEvents()
    }

    
    getButtonByNumber(number) {
        switch (number) {
            case 0:
                return 'topLeft'
            case 1:
                return 'topRight'
            case 2:
                return 'bottomLeft'
            case 3:
                return 'bottomRight'
        }
    }

    getNumberbyButton(button) {
        switch (button) {
            case 'topLeft':
                return 0
            case 'topRight':
                return 1
            case 'bottomLeft':
                return 2
            case 'bottomRight':
                return 3
        }
    }

    turnButtonOn(button) {
        this.buttons[button].classList.add('light')
        let audio = this.audios[`audio_${button}`]
        audio.play();
        setTimeout(() => {
            this.turnButtonOff(button)
            audio.pause()
            audio.currentTime = 0
        }, COLOR_DELAY)
    }

    turnButtonOff(button) {
        this.buttons[button].classList.remove('light')
    }

    addClickEvents() {
        this.buttons.topLeft.addEventListener('click', this.pickButton)
        this.buttons.topRight.addEventListener('click', this.pickButton)
        this.buttons.bottomLeft.addEventListener('click', this.pickButton)
        this.buttons.bottomRight.addEventListener('click', this.pickButton)
    }

    removeClickEvents() {
        this.buttons.topLeft.removeEventListener('click', this.pickButton)
        this.buttons.topRight.removeEventListener('click', this.pickButton)
        this.buttons.bottomLeft.removeEventListener('click', this.pickButton)
        this.buttons.bottomRight.removeEventListener('click', this.pickButton)
    }

    pickButton(ev) {
        const selectedButton = ev.target.dataset.button
        this.turnButtonOn(selectedButton)
        const selectedNumber =
            this.getNumberbyButton(selectedButton)

        if (selectedNumber === this.sequence[this.selection]) {
            this.selection++
            if (this.level === this.selection) {
                this.level++
                this.removeClickEvents()
                if (this.level === LevelQty + 1) {
                    this.winGame()
                }
                else {
                    this.selection = 0
                    setTimeout(this.nextLevel, 1500)
                }
            }
        }
        else {
            this.removeClickEvents ()
            this.loseGame()
        }
    }

    winGame() {
        swal("Well done!", "You win the game!", "success")
            .then(this.initialize)
    }

    loseGame() {
        swal("Ooops!", "If you learn from a loss you have not lost.!", "error")
            .then(this.initialize)
    }

    turnOnSequence() {
        for (let index = 0; index < this.level; index++) {
            const button =
                this.getButtonByNumber(this.sequence[index])
            setTimeout(() => this.turnButtonOn(button), 1000 * index)
        }
    }
}

function startGame() {
    var game = new Game()
}