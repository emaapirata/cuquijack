/**
 * 2C Two of Clubs
 * 2D Two of Diamonds
 * 2H Two of Hearts
 * 2S Two of Spades
 */

let deck = [];

const tipos = ["C", "D", "H", "S"];
const otras_cartas = ["J", "Q", "K", "A"];

let puntos_jugador = 0;
let puntos_computadora = 0;

//Referencias del html
const btnPedir = document.querySelector("#btnPedir");
const btnNuevo = document.querySelector("#btnNuevo");
const btnDetener = document.querySelector("#btnDetener");
const puntosHTML = document.querySelectorAll("small");
const divJugadorCartas = document.querySelector("#jugador-cartas");
const divComputadoraCartas = document.querySelector("#computadora-cartas");
const titulo = document.querySelector(".titulo");
const crearDeck = () => {
  deck = [];
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }
  for (const carta of otras_cartas) {
    for (let tipo of tipos) {
      deck.push(carta + tipo);
    }
  }

  deck = _.shuffle(deck);

  return deck;
};

crearDeck();

//esta funcion me permite tomar una carta

const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }
  const carta = deck.pop();
  return carta;
};
/* console.log(pedirCarta());


console.log(deck); */

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

// turno de la pc

const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    puntos_computadora = puntos_computadora + valorCarta(carta);
    puntosHTML[1].innerHTML = `<b>${puntos_computadora}</b>`;
    /* <img class="carta" src="assets/cartas/2C.png" /> */
    const imgCartaNueva = document.createElement("img");
    imgCartaNueva.classList.add("carta");
    imgCartaNueva.src = `assets/cartas/${carta}.png`;
    divComputadoraCartas.append(imgCartaNueva);

    if (puntosMinimos > 21) {
      break;
    }
    if (puntos_computadora > 21) {
      return false;
    }
    if (puntos_computadora === 21 && puntosMinimos === 21) {
      return true;
    }
  } while (puntos_computadora < puntosMinimos && puntosMinimos <= 21);
  return true;
};

//Eventos

btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  puntos_jugador = puntos_jugador + valorCarta(carta);
  puntosHTML[0].innerHTML = `<b>${puntos_jugador}</b>`;
  /* <img class="carta" src="assets/cartas/2C.png" /> */
  const imgCartaNueva = document.createElement("img");
  imgCartaNueva.classList.add("carta");
  imgCartaNueva.src = `assets/cartas/${carta}.png`;
  divJugadorCartas.append(imgCartaNueva);

  if (puntos_jugador > 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntos_jugador);
    titulo.innerText = "Perdiste papa.. juga de nuevo!";
  } else if (puntos_jugador === 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    if (turnoComputadora(puntos_jugador)) {
      if(puntos_computadora===puntos_jugador){
      titulo.innerText = "Empato la computadora ojetuda";}
      else {
titulo.innerText = "Ganó la compu";
      }
    } else {
      titulo.innerText = "Ganaste!!";
    }
  }
});

btnDetener.addEventListener("click", () => {
  btnDetener.disabled = true;
  btnPedir.disabled = true;
    if (turnoComputadora(puntos_jugador)) {
      if(puntos_computadora===puntos_jugador){
      titulo.innerText = "Empato la computadora ojetuda";}
      else {
titulo.innerText = "Ganó la compu";
      }
    } else {
      titulo.innerText = "Ganaste!!";
    }
});

btnNuevo.addEventListener("click", () => {
  crearDeck();
  puntos_computadora = 0;
  puntos_jugador = 0;
  puntosHTML[0].innerText = 0;
  puntosHTML[1].innerText = 0;
  divComputadoraCartas.innerHTML = "";
  divJugadorCartas.innerHTML = "";
  btnPedir.disabled = false;
  btnDetener.disabled = false;
  titulo.innerText = 'Cuquijack'
});
