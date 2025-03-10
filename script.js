/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const UP_ARROW = 38
const DOWN_ARROW = 40
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;
var kogelX = 300;
var kogelY = 0;
var spelerX = 625; // x-positie van speler
var spelerY = 400; // y-positie van speler
var vijandX = 400;
var vijandY = 50;
var hp = 100;
var points = 0;
var vijandXlijst = [400, 500, 550, 700, 800, 900, 1000, 1100];
var vijandYlijst = [0];
/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function () {
  // vijand
  vijandY = vijandY + 5;

  // kogel
  kogelY = kogelY - 15;

  // speler

  if (keyIsDown(65)) {
    spelerX -= 10;
  }

  if (keyIsDown(68)) {
    spelerX += 10;
  }

  if (keyIsDown(87)) {
    spelerY -= 10;
  }

  if (keyIsDown(83)) {
    spelerY += 10;
  }
  if (mouseIsPressed) {
    kogelX = spelerX;
    kogelY = spelerY - 50;

  }
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten vijanden
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function () {
  if (spelerX > 1280) {
    spelerX = 1280;
  }
  if (spelerY > 720) {
    spelerY = 720;
  }
  if (spelerX < 0) {
    spelerX = 0;
  }
  if (spelerY < 0) {
    spelerY = 0;
  }
  if (vijandY > 720) {
    vijandY = 0;
  }




  // botsing speler tegen vijand
  for (var i = 0; i < 8; i = i + 1) {
    if (vijandXlijst[i] - spelerX < 50 &&
      vijandXlijst[i] - spelerX > -50 &&
      vijandY - spelerY < 50 &&
      vijandY - spelerY > -50) {
      console.log("geraakt");
      hp = hp - 1;
    }
  }




  // botsing kogel tegen vijand
  for (var i = 0; i < 8; i = i + 1) {
    if (kogelX - vijandXlijst[i] < 50 && kogelX - vijandXlijst[i] > -50 && kogelY - vijandY < 50 && kogelY - vijandY > -50) {
      console.log("botsing");

    }
  }
};

/**
 * Tekent spelscherm
 */
var tekenAlles = function () {
  // achtergrond
  fill(42, 212, 198);
  rect(0, 0, 1280, 720);
  // vijand
  fill("red")
  for
  (var i = 0; i < 8; i = i + 1) {
    ellipse(vijandXlijst[i], vijandY - 25, 50, 50);
  }


  // kogel
  fill("black");
  ellipse(kogelX - 25, kogelY - 25, 20, 20);
  // speler
  fill("white");
  rect(spelerX - 25, spelerY - 25, 50, 50);
  fill("black");
  ellipse(spelerX, spelerY, 10, 10);

  // punten en health
  textSize(64);
  text(hp, 30, 60);
  points = points + 1 / 50;
  text('points: \n' + floor(points), 900, 80)


}
/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function () {
  if (hp <= 0) {
    return true
  }
  else {
    return false;
  }
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background(255, 0, 0);
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {

  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (checkGameOver(hp < 1)) {

      spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
    background: ('black')
    textSize(150)
    fill('red')
    text('Game over', 176, 360)
    textSize(90)
    fill('red')
    text('score' + floor(points), 170, 340)



  }
}
