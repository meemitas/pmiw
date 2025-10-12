// tp final parte 1
// integrantes: Angel Matias Ojeda  122819/5, Nadia B. Romero 118770/6
// com 3
// prof David Bodeian :D
// url video de romero, nadia: https://www.youtube.com/watch?v=ophSmC1YdQQ

// Variable para manejar en qué pantalla estamos
let pantalla = "inicio";

// imagenes y textos de la aventura
let imgs = {};
let textos = {};

// musiquita
let inicio_mus;
let ingame_mus;
let muted = false;

// --- para el cambio de música con fade ---
let currentMusic = null;
let targetMusic = null;
let fadeDuration = 1.0; 
let fadeStartTime = 0;
let fading = false;

// --- para que los botones no se activen mil veces ---
let clickBloqueado = false;

function preload() {
  // cargo las imágenes
  imgs["inicio"] = loadImage("data/inicio.png");
  imgs["creditos"] = loadImage("data/creditos.jpg");
  imgs["intro"] = loadImage("data/intro.png");
  imgs["solo"] = loadImage("data/solo.png");
  imgs["loki"] = loadImage("data/loki.png");
  imgs["thrym"] = loadImage("data/thrym.png");
  imgs["freya"] = loadImage("data/freya.png");
  imgs["plan"] = loadImage("data/plan.png");
  imgs["boda"] = loadImage("data/boda.png");
  imgs["banquete"] = loadImage("data/banquete.png");
  imgs["martillo"] = loadImage("data/martillo.png");
  imgs["escape"] = loadImage("data/escape.png");
  imgs["asgard"] = loadImage("data/asgard.png");
  imgs["lokiFinal"] = loadImage("data/loki_final.png");
  imgs["finalHeroico"] = loadImage("data/final_heroico.png");
  imgs["finalMalo"] = loadImage("data/final_malo.png");
  imgs["cursor"] = loadImage("data/cursor.png");
  imgs["mute"] = loadImage("data/mute.png");
  imgs["unmute"] = loadImage("data/unmute.png");

  // cargo la música
  inicio_mus = loadSound('sonidos/gwynlordofcinder_motoisakuraba.mp3');
  ingame_mus = loadSound('sonidos/deslienssolides_shirosagisu.mp3');
}

function setup() {
  createCanvas(640, 480);
  textFont("Georgia");
  textAlign(CENTER, CENTER);
  noCursor();

  // textos que van arriba de las imágenes
  textos["intro"] = "Thor descubre que su martillo ha sido robado.\n¿Va solo a Jotunheim o pide ayuda a Loki?";
  textos["solo"] = "Thor viaja solo a Jotunheim.\n¿Elige atacar silenciosamente o ir cual kamikaze?";
  textos["loki"] = "Thor pide ayuda a Loki.\nJuntos parten hacia Jotunheim.";
  textos["thrym"] = "El gigante Thrym exige a Freyja como esposa a cambio del martillo.\nLoki presenta un plan fuera de lo normal";
  textos["freya"] = "Freyja rechaza indignada.\n¿Qué harán ahora?";
  textos["plan"] = "Loki idea un plan: disfrazar a Thor de novia.";
  textos["boda"] = "Thor disfrazado y Loki llegan al banquete nupcial.";
  textos["banquete"] = "Thor come demasiado y casi arruina el plan.\nThrym sospecha...";
  textos["martillo"] = "El martillo aparece para bendecir la unión.\nEs la oportunidad perfecta.";
  textos["escape"] = "Thor y Loki escapan con el martillo.";
  textos["asgard"] = "De vuelta en Asgard, todos esperan saber la verdad.";
  textos["lokiFinal"] = "Loki manipula la situación para quedar como si él haya sido el héroe.";
  textos["finalHeroico"] = "¡Thor recupera el martillo y derrota a los gigantes!\nFinal Heroico.";
  textos["finalMalo"] = "El plan falla y los gigantes celebran su victoria.\nFinal Malo.";
}

function draw() {
  background(20);
  manejarMusica();

  // pantallas del juego
  if (pantalla === "inicio") {
    mostrarInicio();
  } else if (pantalla === "creditos") {
    mostrarCreditos();
  } else {
    mostrarPantalla();
  }

  // png mute/unmute
  let iconX = 10;
  let iconY = 10;
  let iconSize = 40;
  image(muted ? imgs["mute"] : imgs["unmute"], iconX, iconY, iconSize, iconSize);

  // reemplazamos el cursor normal por uno temático
  if (imgs["cursor"]) image(imgs["cursor"], mouseX, mouseY, 32, 32);
}

// --- manejo de música con crossfade ---
function manejarMusica() {
  if (muted) {
    if (currentMusic) currentMusic.stop();
    if (targetMusic) targetMusic.stop();
    return;
  }

  let musicaDeseada =
    (pantalla === "inicio" || pantalla === "creditos" || pantalla === "finalHeroico" ||
     pantalla === "finalMalo" || pantalla === "escape" || pantalla === "lokiFinal")
      ? inicio_mus
      : ingame_mus;

  if (musicaDeseada !== currentMusic && !fading) {
    targetMusic = musicaDeseada;
    iniciarFade();
  }

  // transición suave
  if (fading) {
    let elapsed = (millis() - fadeStartTime) / 1000.0;
    let t = constrain(elapsed / fadeDuration, 0, 1);

    if (currentMusic) currentMusic.setVolume(1 - t);
    if (targetMusic) {
      if (!targetMusic.isPlaying()) targetMusic.play();
      targetMusic.setVolume(t);
    }

    if (t >= 1) {
      if (currentMusic && currentMusic.isPlaying()) currentMusic.stop();
      currentMusic = targetMusic;
      targetMusic = null;
      fading = false;
    }
  }
}

function iniciarFade() {
  fadeStartTime = millis();
  fading = true;
  if (currentMusic) currentMusic.setVolume(1);
  if (targetMusic) targetMusic.setVolume(0);
}

// --- pantallas del juego ---
function mostrarInicio() {
  if (imgs["inicio"]) image(imgs["inicio"], 0, 0, width, height);

  fill(255);
  textSize(28);
  text("Thor y Loki: El robo de Mjölnir", width/2, height/3);

  boton("Empezar", width/2, height/2, () => pantalla = "intro");
  boton("Créditos", width/2, height/2 + 60, () => pantalla = "creditos");
}

function mostrarCreditos() {
  if (imgs["creditos"]) image(imgs["creditos"], 0, 0, width, height);
  rectMode(CENTER);
  fill(20, 20, 50, 200);
  rect(width/2, height/2, 300, 80, 5);
  fill(255);
  textSize(22);
  text("Créditos", width/2, 80);
  textSize(16);
  text("Angel Ojeda\nNadia Romero\nObra original: mito nórdico de Thrym", width/2, height/2);
  boton("Volver al inicio", width/2, height - 60, () => pantalla = "inicio");
}

function mostrarPantalla() {
  if (imgs[pantalla]) image(imgs[pantalla], 0, 0, width, height);
  fill(255);
  textSize(16);
  text(textos[pantalla], width/2, 60);

  if (pantalla === "intro") {
    boton("Ir solo", width/2 - 120, height - 100, () => pantalla = "solo");
    boton("Pedir ayuda a Loki", width/2 + 120, height - 100, () => pantalla = "loki");
  } else if (pantalla === "solo") {
    boton("Silencioso", width/2 - 120, height - 100, () => pantalla = "finalHeroico");
    boton("Kamikaze", width/2 + 120, height - 100, () => pantalla = "finalMalo");
  } else if (pantalla === "loki") {
    boton("Seguir al encuentro", width/2, height - 100, () => pantalla = "thrym");
  } else if (pantalla === "thrym") {
    boton("Hablar con Freyja", width/2 - 120, height - 100, () => pantalla = "freya");
    boton("Aceptar plan de Loki", width/2 + 120, height - 100, () => pantalla = "plan");
  } else if (pantalla === "freya") {
    boton("Abandonar misión", width/2 - 120, height - 100, () => pantalla = "finalMalo");
    boton("Aceptar plan de Loki", width/2 + 120, height - 100, () => pantalla = "plan");
  } else if (pantalla === "plan") {
    boton("Ir a la boda", width/2, height - 100, () => pantalla = "boda");
  } else if (pantalla === "boda") {
    boton("Seguir con el plan", width/2, height - 100, () => pantalla = "banquete");
  } else if (pantalla === "banquete") {
    boton("Esperar el martillo", width/2, height - 100, () => pantalla = "martillo");
  } else if (pantalla === "martillo") {
    boton("Atacar", width/2 - 120, height - 100, () => pantalla = "finalHeroico");
    boton("Escapar con Loki", width/2 + 120, height - 100, () => pantalla = "escape");
  } else if (pantalla === "escape") {
    boton("Volver a Asgard", width/2, height - 100, () => pantalla = "asgard");
  } else if (pantalla === "asgard") {
    boton("Contar la verdad", width/2 - 120, height - 100, () => pantalla = "finalHeroico");
    boton("Mentir", width/2 + 120, height - 100, () => pantalla = "lokiFinal");
  } else if (pantalla === "lokiFinal" || pantalla === "finalHeroico" || pantalla === "finalMalo") {
    boton("Volver al inicio", width/2, height - 100, () => pantalla = "inicio");
  }
}

// --- botones ---
function boton(txt, x, y, accion) {
  rectMode(CENTER);
  fill(50, 50, 80, 200);
  rect(x, y, 200, 40, 10);
  fill(255);
  textSize(16);
  text(txt, x, y);

  // hace que el click funcione una sola vez
  if (!clickBloqueado &&
      mouseIsPressed &&
      mouseX > x - 100 && mouseX < x + 100 &&
      mouseY > y - 20 && mouseY < y + 20) {
    accion();
    clickBloqueado = true;
  }
}

// cuando soltás el mouse se puede volver a hacer clic
function mouseReleased() {
  clickBloqueado = false;
}

// --- botón de mute ---
function mouseClicked() {
  let iconX = 10, iconY = 10, iconSize = 40;
  if (mouseX > iconX && mouseX < iconX + iconSize && mouseY > iconY && mouseY < iconY + iconSize) {
    muted = !muted;
    if (muted) {
      if (currentMusic) currentMusic.stop();
      if (targetMusic) targetMusic.stop();
    }
    return;
  }
}
