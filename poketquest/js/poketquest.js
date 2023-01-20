const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
sectionReiniciar.style.display = 'none'

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const resultadoJugador = document.getElementById('resultado-jugador')
const resultadoEnemigo = document.getElementById('resultado-enemigo')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokepones = []
let ataqueJugador =[]
let ataqueEnemigo = []
let resultadoiconos = []
let opcionDeMokepones
let inputBowser
let inputTreerex
let inputDrogon
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonPlanta
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let indexResultadoJugador
let indexResultadoEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0 
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350 

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let bowser = new Mokepon('Bowser', './assets/blastoise.png', 5, './assets/blastoise-cara.png')

let treerex = new Mokepon('Treerex', './assets/venusaur.png', 5, './assets/venusaur-cara.png')

let drogon = new Mokepon('Drogon', './assets/charizard.png', 5, './assets/charizard-cara.png')

let bowserEnemigo = new Mokepon('Bowser', './assets/blastoise.png', 5, './assets/blastoise-cara.png')

let treerexEnemigo = new Mokepon('Treerex', './assets/venusaur.png', 5, './assets/venusaur-cara.png')

let drogonEnemigo = new Mokepon('Drogon', './assets/charizard.png', 5, './assets/charizard-cara.png')

bowser.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-planta' },
)

bowserEnemigo.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-planta' },
)

treerex.ataques.push(
    { nombre: '🌱', id: 'boton-planta' },
    { nombre: '🌱', id: 'boton-planta' },
    { nombre: '🌱', id: 'boton-planta' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    
)

treerexEnemigo.ataques.push(
    { nombre: '🌱', id: 'boton-planta' },
    { nombre: '🌱', id: 'boton-planta' },
    { nombre: '🌱', id: 'boton-planta' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    
)

drogon.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-planta' },
)

drogonEnemigo.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' }, 
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-planta' },
)

mokepones.push(bowser,treerex,drogon)

function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

     inputBowser = document.getElementById('Bowser')
     inputTreerex = document.getElementById('Treerex')
     inputDrogon = document.getElementById('Drogon')

    })
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    
    sectionSeleccionarMascota.style.display = 'none'
    
    if (inputBowser.checked) {
        spanMascotaJugador.innerHTML = inputBowser.id
        mascotaJugador = inputBowser.id
        document.getElementById('vidas-jugador').style.color = 'blue';
        document.getElementById('mascota-jugador').style.color = 'blue';
    } else if (inputTreerex.checked) {
        spanMascotaJugador.innerHTML = inputTreerex.id
        mascotaJugador = inputTreerex.id
        document.getElementById('vidas-jugador').style.color = 'green';
        document.getElementById('mascota-jugador').style.color = 'green';
    } else if (inputDrogon.checked) {
        spanMascotaJugador.innerHTML = inputDrogon.id
        mascotaJugador = inputDrogon.id
        document.getElementById('vidas-jugador').style.color = 'red';
        document.getElementById('mascota-jugador').style.color = 'red';
    } else {
        alert('Selecciona una mascota')
    }

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

     botonFuego = document.getElementById('boton-fuego')
     botonAgua = document.getElementById('boton-agua')
     botonTierra = document.getElementById('boton-planta')
     botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#8B0000'
                boton.disabled = true 
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = 'blue'
                boton.disabled = true  
            } else {
                ataqueJugador.push('PLANTA')
                console.log(ataqueJugador)
                boton.style.background = 'green'
                boton.disabled = true  
            }
            ataqueAleatorioEnemigo()
        })
    })
    

}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    if (enemigo.nombre === 'Drogon'){
        document.getElementById('vidas-enemigo').style.color = 'red';
        document.getElementById('mascota-enemigo').style.color = 'red';  
    }else if(enemigo.nombre === 'Treerex'){
        document.getElementById('vidas-enemigo').style.color = 'green';
        document.getElementById('mascota-enemigo').style.color = 'green';
    }else {
        document.getElementById('vidas-enemigo').style.color = 'blue';
        document.getElementById('mascota-enemigo').style.color = 'blue';
    }
    
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}


function ataqueAleatorioEnemigo() {
    console.log('Ataques enemigo', ataquesMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)
    
    if (ataqueAleatorio == 0 || ataqueAleatorio ==1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('PLANTA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
    indexResultadoJugador = resultadoiconos[jugador]
    indexResultadoEnemigo = resultadoiconos[enemigo]
}

function combate() {
    
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            resultadoiconos.push('EMPATE')
            indexAmbosOponente(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'PLANTA') {
            resultadoiconos.push('GANASTE')
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador 
        } else if (ataqueJugador[index] ==='AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            resultadoiconos.push('GANASTE')
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'PLANTA' && ataqueEnemigo[index] === 'AGUA') {
            resultadoiconos.push('GANASTE')
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            resultadoiconos.push('PERDISTE')
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate!!!")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("Felicidades! Ganaste 😄")
    } else {
        crearMensajeFinal('Lo siento, perdiste 😔')
    }
}

function crearMensaje(resultado) {
    
    let nuevoResultadoJugador = document.createElement('p')
    let nuevoResultadoEnemigo = document.createElement('p')
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado

    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador

    if (indexResultadoJugador === 'GANASTE'){
        nuevoResultadoJugador.Image = 'GANADOR';   
        nuevoResultadoEnemigo.innerHTML = 'PERDEDOR'; 
    }
    else if (indexResultadoJugador === 'PERDISTE'){
        nuevoResultadoJugador.innerHTML = 'PERDEDOR'; 
        nuevoResultadoEnemigo.innerHTML = 'GANADOR';
    }else {
        nuevoResultadoJugador.innerHTML = 'EMPATE';
        nuevoResultadoEnemigo.innerHTML = 'EMPATE';
    }
    

    if (indexAtaqueJugador === 'FUEGO'){
        nuevoAtaqueDelJugador.style.color = 'red';
    }
    else if (indexAtaqueJugador === 'AGUA'){
        nuevoAtaqueDelJugador.style.color = 'blue';
    }else {
        nuevoAtaqueDelJugador.style.color = 'green';
    }

    if (indexAtaqueEnemigo === 'FUEGO'){
        nuevoAtaqueDelEnemigo.style.color = 'red';
    }
    else if (indexAtaqueEnemigo === 'AGUA'){
        nuevoAtaqueDelEnemigo.style.color = 'blue';
    }else {
        nuevoAtaqueDelEnemigo.style.color = 'green';
    }
    
   // resultadoJugador.appendChild(nuevoResultadoJugador)
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
   // resultadoEnemigo.appendChild(nuevoResultadoEnemigo)
    

}

function crearMensajeFinal(resultadoFinal) {
    
    
    sectionMensajes.innerHTML = resultadoFinal


    
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()
    bowserEnemigo.pintarMokepon()
    treerexEnemigo.pintarMokepon()
    drogonEnemigo.pintarMokepon()
    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(bowserEnemigo)
        revisarColision(treerexEnemigo)
        revisarColision(drogonEnemigo)
    }
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa() {

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50)
    
    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
        
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = 
        mascotaJugadorObjeto.y
    const abajoMascota = 
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = 
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = 
        mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    console.log('Se detecto una colision');
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)
