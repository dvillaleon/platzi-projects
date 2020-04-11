
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const CANTIDAD_NIVELES = 10
const COLOR_DELAY = 620
const audio = new Audio('resources/tone.mp3');


class Juego {
    constructor() {
        this.inicializar()
        setTimeout(() => {
            this.generarSecuencia()
            this.siguienteNivel()
        }, 1000);
    }

    inicializar() {
        //Se hace un bind para no perder el contexto del 
        //juego a la hora de llamar a la función elegirColor
        this.elegirColor = this.elegirColor.bind(this)
        this.inicializar = this.inicializar.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.toggleBtnEmpezar()
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    toggleBtnEmpezar() {
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
        }
        else {
            btnEmpezar.classList.add('hide')
        }
    }

    generarSecuencia() {
        this.seleccion = 0
        this.secuencia = new Array(CANTIDAD_NIVELES).fill(0).map(n =>
            Math.floor(Math.random() * 4))
        // this.secuencia = new Array(10).fill(0).map(n => Math.random()* 4) | 0
    }

    siguienteNivel() {
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }

    transformarColorANumero(color) {
        switch (color) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light')
        audio.play()
        setTimeout(() => {
            this.apagarColor(color)
            audio.pause()
            audio.currentTime = 0
        }, COLOR_DELAY)
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }

    agregarEventosClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev) {
        const colorSeleccionado = ev.target.dataset.color
        this.iluminarColor(colorSeleccionado)
        const numeroSeleccionado =
            this.transformarColorANumero(colorSeleccionado)


        if (numeroSeleccionado === this.secuencia[this.seleccion]) {
            this.seleccion++
            if (this.nivel === this.seleccion) {
                this.nivel++
                this.eliminarEventosClick()
                if (this.nivel === CANTIDAD_NIVELES + 1) {
                    this.ganoJuego()
                }
                else {
                    this.seleccion = 0
                    setTimeout(this.siguienteNivel, 1500)
                }
            }
        }
        else {
            this.eliminarEventosClick()
            this.perdioJuego()
        }
    }

    ganoJuego() {
        swal("Bien hecho!", "Ganaste el juego!", "success")
            .then(this.inicializar)
    }

    perdioJuego() {
        swal("Ooops!", "Perdiste!", "error")
            .then(this.inicializar)
    }

    iluminarSecuencia() {
        for (let index = 0; index < this.nivel; index++) {
            const color =
                this.transformarNumeroAColor(this.secuencia[index])
            setTimeout(() => this.iluminarColor(color), 1000 * index)
        }
    }
}

function empezarJuego() {
    var juego = new Juego()
}