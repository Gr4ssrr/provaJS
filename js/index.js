"use strict";

let mat = new Array(15);
let idtimer;
window.onload = function () {
  creaCaselle();
};

function creaCaselle() {
  for (let i = 0; i < 15; i++) {
    mat[i] = new Array(15);
  }
  let body = document.getElementsByTagName("body")[0];
  let h1 = document.createElement("h1");
  h1.innerText = "Acchiappa la talpa";
  h1.style.textAlign = "center";
  body.appendChild(h1);

  let wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  body.appendChild(wrapper);

  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      let btn = document.createElement("button");
      btn.setAttribute("class", "cella");
      btn.setAttribute("id", "cella" + "-" + i + "-" + j);
      btn.onclick = function () {
        ammazzaTalpa(i, j);
      };
      wrapper.appendChild(btn);
      mat[i][j] = document.getElementById("cella" + "-" + i + "-" + j);
    }
  }

  let h1punteggio = document.createElement("h1");
  h1punteggio.setAttribute("id", "h1punteggio");
  h1punteggio.innerText = "Punteggio: 0";
  h1punteggio.style.textAlign = "left";
  h1punteggio.style.marginLeft = "650px";
  body.appendChild(h1punteggio);

  posizionaSassi();

  idtimer = setInterval(mostraTalpa, 1500);
}

let punti = 0;
function ammazzaTalpa(i, j) {
  if (mat[i][j].style.backgroundColor == "red") {
    punti += 100;
    mat[i][j].style.backgroundColor = "darkGreen";
  }
  else
  {
    punti -= 100
  }
  
  h1punteggio.innerText = "Punteggio: " + punti.toString();
  if (punti == 1000) {
    punti = 0
    alert(" HAI VINTO");
    clearInterval(idtimer);
  }
}

let x = 0, y = 0;
let cnt = 0;
function mostraTalpa() {
  cnt++;
  mat[x][y].style.backgroundColor = "darkGreen";

  let xRnd = generaNumero(0, 14);
  let yRnd = generaNumero(0, 14);

  while (mat[xRnd][yRnd].style.backgroundColor == "grey") {
    let xRnd = generaNumero(0, 14);
    let yRnd = generaNumero(0, 14);
  }

  mat[xRnd][yRnd].style.backgroundColor = "red";
  (x = xRnd), (y = yRnd);
  console.log(cnt);
  if (cnt == 175) {
    clearInterval(idtimer);
    cnt = 0
    alert("HAI FINITO I TENTATIVI");
  }
}

function posizionaSassi() {
  let xRnd = generaNumero(0, 14);
  let yRnd = generaNumero(0, 14);

  for (let i = 0; i < 50; i++) {
    while (mat[xRnd][yRnd].style.backgroundColor == "grey") {
      xRnd = generaNumero(0, 14);
      yRnd = generaNumero(0, 14);
    }
    mat[xRnd][yRnd].style.backgroundColor = "grey";
    mat[xRnd][yRnd].disabled = true;
  }
}

function generaNumero(a, b) {
  return Math.floor((b - a + 1) * Math.random()) + a;
}
