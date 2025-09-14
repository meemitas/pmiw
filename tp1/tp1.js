// nadia b. romero :D legajo: 188770/6
// tp1 - segundo cuatri
// com 3
// prof. David Bedoian
// video de Youtube:

let img;
let cont;
let cant = 11;
let tam;
let cambioTam = false;
let cambiarColor = false;

let negro;
let blanco;

function preload() {
  img = loadImage("data/f18.JPEG");
}

function setup() {
  createCanvas(800, 400);
  cont = 2;
  negro = color(0);
  blanco = color(255);
}


function draw() {
  cont++;
  background(255);
  dibujarGrilla();
  image(img, 0, 0, 400, 400); //obra :D
}
