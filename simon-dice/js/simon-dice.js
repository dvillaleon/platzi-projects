
const topLeft = document.getElementById('topLeft')
const topRight = document.getElementById('topRight')
const bottomLeft = document.getElementById('bottomLeft')
const bottomRight = document.getElementById('bottomRight')
const btnEmpezar = document.getElementById('btnEmpezar')
const toggleAudio = document.getElementById('toggleAudio')
const COLOR_DELAY = 620
const audio_topLeft = new Audio('resources/glassy1.mp3');
const audio_topRight = new Audio('resources/glassy2.mp3');
const audio_bottomLeft = new Audio('resources/glassy3.mp3');
const audio_bottomRight = new Audio('resources/glassy4.mp3');
const lossQuotes = [
    'Losing is part of the game. If you never lose, you are never truly tested, and never forced to grow. - David Sirlin',
    'I would prefer even to lose with honor than to win by cheating. - Sophocles',
    'If you learn from a loss you have not lost. - Austin O\'Malley',
    'Sometimes you lose. Nothing you can do but admit it. - Sarah Dessen',
    'You win some, you lose some.',
    'You know what makes a good loser? Practice. - Ernest Hemingway'
]

class Game {
    constructor() {
        this.initialize()
        this.sequenceInit()
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
        swal("How many levels would you like to play?:", {
            content: "input",
            icon: "info"
        })
            .then((value) => {
                let levels = parseInt(value);
                if (!isNaN(levels)) {
                    this.LevelQty = levels;
                    this.sequence = new Array(this.LevelQty).fill(0).map(n => Math.floor(Math.random() * 4));
                    setTimeout(() => {
                        this.nextLevel();
                    }, 1000);
                }
                else {
                    swal("Ooops!", "You need to enter a number!", "info")
                        .then(this.toggleBtnStart)
                }
            });
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
        if (toggleAudio.classList.contains('is-pressed')) {
            audio.play();
        }
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
                if (this.level === this.LevelQty + 1) {
                    this.winGame()
                }
                else {
                    this.selection = 0
                    setTimeout(this.nextLevel, 1500)
                }
            }
        }
        else {
            this.removeClickEvents()
            this.loseGame()
        }
    }

    winGame() {
        swal("Well done!", "You win the game!", "success")
            .then(this.initialize)
    }

    loseGame() {
        swal("Ooops!", this.getLossMessage(), "error")
            .then(this.initialize)
    }

    turnOnSequence() {
        for (let index = 0; index < this.level; index++) {
            const button =
                this.getButtonByNumber(this.sequence[index])
            setTimeout(() => this.turnButtonOn(button), 1000 * index)
        }
    }

    getLossMessage(){
        let randomMessage = Math.floor(Math.random() * 6)
        return lossQuotes[randomMessage]
    }
}

function startGame() {
    var game = new Game()
}