function dibujarGrilla() {
  push();
  translate(-19, -16);

  for (let i = 0; i < cant; i++) {
    for (let j = 0; j < cant; j++) {

      // con el booleano se decide el color!
      if ((i + j) % 2 == 0) {
        fill(cambiarColor ? negro : 0); // color aleatorio, o negro
      } else {
        fill(cambiarColor ? blanco : 255); // color aleatorio, o blanco
      }

      let mod = 438 / float(cant);
      let x = i * mod + mod / 2;
      let y = j * mod + mod / 2;

      if (cambioTam) { // hacer zoom en el tablero ;D
        let rect = map(mouseX, 0, width, tam * 1, tam * 2);
      }

      if (mouseX > x + 400 - mod / 2 && mouseX < x + 400 + mod / 2 &&
        mouseY > y - mod / 2 && mouseY < y + mod / 2) {
        fill(160, 3, 3); // rojito interactivo
      }

      push();
      translate(x + 400, y);
      rectMode(CENTER);
      rect(0, 0, mod, mod);

      strokeWeight(4);
      stroke(255);
      noStroke();

      let offset = mod * 0.3;

      // mouse interactivo con redonditos (cambian de estado)
      if (mouseX > 400 && mouseX < 800 && mouseY > 0 && mouseY < 400) {
        offset = map(mouseX, 400, 800, mod * 0.1, mod * 0.5);
        offset = constrain(offset, mod * 0.1, mod * 0.5);
      }

      if ((i + j) % 2 == 0) {
        fill(cambiarColor ? blanco : 255); // puntos blancos sobre negro
      } else {
        fill(cambiarColor ? negro : 0); // puntos negros sobre blanco
      }

      // rendonditos alternados
      let tipo = (i + j) % 3; // 

      if (tipo == 0) {
        // redonditos en diagonal
        ellipse(offset, -offset, 10, 10);
        ellipse(-offset, offset, 10, 10);
      } else if (tipo == 1) {
        // redonditos en diagonal
        ellipse(-offset, -offset, 10, 10);
        ellipse(offset, offset, 10, 10);
      } else {
        // redonditos en horizontal
        ellipse(-offset, 0, 10, 10);
        ellipse(offset, 0, 10, 10);
      }

      pop();
    }
  }
  pop();
}

function keyPressed() {
  if (key == '-') { // me alejo de la grilla
    cant++;
    tam = (width / 2.0) / cant;
  } else if (key == '+') { // me acerco a la grilla
    cant--;
    if (cant < 1) {
      cant = 1;
    }
  } else if (key == 'r' || key == 'R') { // reinicio de grilla >:D (r minuscula y R mayuscula)
    cant = 11;
    cont = 2;
    cambioTam = false;
    cambiarColor = false; // vuelve a blanco y negro
    negro = color(0);
    blanco = color(255);
  } else if (key == 'c' || key == 'C') { // activa el cambio de colores (o efecto visual de colores)
    cambiarColor = true;
    negro = generarColorAleatorio();  // permite usar una función
    blanco = generarColorAleatorio(); // propia con retorno en lugar de repetir el código

    // negro = color(random(255), random(255), random(255)); // tono fuerte aleatorio  ((función vieja))
    // blanco = color(random(255), random(255), random(255)); // tono suave aleatorio! ((función vieja))
  }
}

function generarColorAleatorio() { // agregué esto que genera y retorna un color aleatorio
  let r = random(255);
  let g = random(255);
  let b = random(255);
  return color(r, g, b);
}
