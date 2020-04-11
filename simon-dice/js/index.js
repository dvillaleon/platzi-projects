const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')

class Juego {
    constructor() {
        this.inicializar()
        this.generarSecuencia()
        this.siguienteNivel()
    }

    inicializar() {
        //Se hace un bind para no perder el contexto del 
        //juego a la hora de llamar a la función elegirColor
        this.elegirColor = this.elegirColor.bind(this) 
        btnEmpezar.classList.add('hide')
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    generarSecuencia() {
        this.secuencia = new Array(10).fill(0).map(n =>
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

    iluminarColor(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }

    agregarEventosClick(){
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
    }

    elegirColor(ev){
        console.log(ev)
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