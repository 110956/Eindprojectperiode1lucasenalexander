class Raster { //Raster word gemaakt 
  constructor(r,k) {
    this.aantalRijen = r;
    this.aantalKolommen = k;
    this.celGrootte = null;
  }
  
  berekenCelGrootte() {
    this.celGrootte = canvas.width / this.aantalKolommen;
  }
  
  teken() {
    push();
    noFill();
    stroke('grey');
    for (var rij = 0;rij<this.aantalRijen;rij++) {
      for (var kolom = 0;kolom<this.aantalKolommen;kolom++) {
        rect(kolom*this.celGrootte,rij*this.celGrootte,this.celGrootte,this.celGrootte);
      }
    }
    pop();
  }
}

class Jos { //De schepping van jos
  constructor() {
    this.x = 0;
    this.y = 300;
    this.animatie = [];
    this.frameNummer =  3;
    this.stapGrootte = null;
    this.gehaald = false;
    this.aanDeBeurt = true;
    this.levens = 1;
  }
  
  beweeg() { //Bestuuring m.b.v. WASD, achteruit hebben we extra toegevoegd!
    if (keyIsDown(68)) {
      this.x += this.stapGrootte;
      this.frameNummer = 1;
      this.aanDeBeurt = false;
    }
    if (keyIsDown(87)) {
      this.y -= this.stapGrootte;
      this.frameNummer = 4;
      this.aanDeBeurt = false;
    }
    if (keyIsDown(83)) {
      this.y += this.stapGrootte;
      this.frameNummer = 5;
      this.aanDeBeurt = false;
    }
    if (keyIsDown(65)) {
      this.x -= this.stapGrootte;
      this.frameNummer = 1;
      this.aanDeBeurt = false;
    }
    this.x = constrain(this.x,0,canvas.width);
    this.y = constrain(this.y,0,canvas.height - raster.celGrootte);
    
    if (this.x == canvas.width) {
      this.gehaald = true;
    }
  }
  
  wordtGeraakt(vijand) {
    if (this.x == vijand.x && this.y == vijand.y) {
      this.levens -= 1;
      return true;
    }
    else {
      return false;
    }
  }
  KomtOpMedkit(kit) {
    if (this.x == kit.x && this.y == kit.y && eve.aanDeBeurt == false) {
     
      return true;
    }
    else {
      return false;
    }
  }
  
  toon() {
    image(this.animatie[this.frameNummer],this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}

class Vijand {  //Schepping van vijandige tanks
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = null;
    this.stapGrootte = null;
  }

  beweeg() {
    this.x += floor(random(-1,2))*this.stapGrootte;
    this.y += floor(random(-1,2))*this.stapGrootte;

    this.x = constrain(this.x,0,canvas.width - raster.celGrootte);
    this.y = constrain(this.y,0,canvas.height - raster.celGrootte);
  }
  
  toon() {
    image(this.sprite,this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}
var x = [500, 550, 600, 650, 700, 750, 800, 850];
class Bom { //Schepping van de bommen
  constructor(y,vy) {
    this.x = random(x);
    this.y = y;
    this.vy = vy;
		this.sprite = null;
		this.stapGrootte = null;
  }

  beweeg() {
    this.y += this.vy
    if (this.y >= 600 || this.y < 0) {
			this.vy *= -1;
		}
	this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);
	}
    toon() {
		        image(this.sprite, this.x, this.y, raster.celGrootte, raster.celGrootte);
	}
}
class Medkit {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = null;
    this.stapGrootte = null;
    this.available = true;
    this.available1 = true;
  }

  

  toon() {
  image(this.sprite,this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
  verwijder(){
    this.available = false;
  }
  verwijder1(){
    this.available1 = false;
  }
  
}


let gewonnen2;
let nukeexlposion;
let tankschot;
let medkit;
let medkit1;


function preload() { //repload voor alle afbeeldingen en geluiden die we in dit spel hebben.
  achtergrond = loadImage("images/backgrounds/informatica playground.jpg");
  dood = loadImage("images/backgrounds/wasted.png");
  gewonnen = loadImage("images/backgrounds/GTA-Mission-Passed.jpg");
  gewonnen2 = loadSound("Sound/Win.mp3");
  backgroundnuke = loadImage ("images/backgrounds/backgroundnuke.jpg");
  nukeexlposion = loadSound("Sound/nukeexlposion.mp3");
  tankschot = loadSound("Sound/tankschot2.mp3");
  leven1 = loadImage("images/sprites/hart.png");
  leven2 = loadImage("images/sprites/hart2.png");
  leven3 = loadImage("images/sprites/hart3.png");
  levenerbij = loadSound("Sound/levenerbij.mp3");
  achtergrondmuziek = loadSound("Sound/achtergrondmuziek.mp3");
}

function setup() { 
  canvas = createCanvas(900,600); //Creatie spelgebied
  frameRate(10);                  // 10 FPS
  textFont("Verdana");
  textSize(90);
 
  achtergrondmuziek.loop(); //Speelt muziek af en zorgt dat hij nooit stopt
  achtergrondmuziek.setVolume(0.2); //Zo dat de muziek niet te hard is in volume
  
  raster = new Raster(12,18); //Raster groote 12 bij 18 gemaakt
  raster.berekenCelGrootte();
  
  eve = new Jos();
  eve.stapGrootte = 1*raster.celGrootte;
  for (var b = 0;b < 6;b++) {
    frameEve = loadImage("images/sprites/Eve100px/soldaat2.png");
    eve.animatie.push(frameEve);
  }
  
  alice = new Vijand(700,150);
  alice.stapGrootte = 1*eve.stapGrootte;
  alice.sprite = loadImage("images/sprites/Alice100px/tank1.png");

  bob = new Vijand(700, 400)
  bob.stapGrootte = 1*eve.stapGrootte;
  bob.sprite = loadImage("images/sprites/Bob100px/tank1.png");

  bom1 = new Bom(100, raster.celGrootte);
	bom1.stapGrootte = 2 * raster.celGrootte;
	bom1.sprite = loadImage("images/sprites/bomb.png");

	bom2 = new Bom(400, -2 * raster.celGrootte);
	bom2.stapGrootte = 3 * raster.celGrootte;
	bom2.sprite = loadImage("images/sprites/bomb.png");

	bom3 = new Bom(300, raster.celGrootte);
	bom3.stapGrootte = 1 * raster.celGrootte;
	bom3.sprite = loadImage("images/sprites/bomb.png");

  bom4 = new Bom(700, raster.celGrootte);
  bom4.stapGrootte = 5 * raster.celGrootte;
  bom4.sprite = loadImage("images/sprites/bomb.png");

  bom5 = new Bom(500, raster.celGrootte);
  bom5.stapGrootte = 4 * raster.celGrootte;
  bom5.sprite = loadImage("images/sprites/bomb.png");

  medkit = new Medkit(150, 400);
  medkit.sprite = loadImage("images/sprites/medkit2.png")

  medkit1 = new Medkit(700,200);
  medkit1.sprite = loadImage("images/sprites/medkit2.png")
}

function draw() { 
  background(achtergrond);
  fill("green"); // Raster verticaal en horizontaal ingekleurd m.b.v 4 rectangles te maken op de juiste locatie
  rect(000, 0, 50, 600);
  rect(850, 0, 50, 600);
  rect(0, 0, 900, 50);
  rect(0, 550, 900, 50);
  //Zichtbaar maken van alle atributen (bommen, medkit, eve, alice, bob, levens)
  eve.toon();
  alice.toon();
  bob.toon();
	bom1.beweeg();
	bom2.beweeg();
	bom3.beweeg();
  bom4.beweeg();
  bom5.beweeg();
  bob.toon();
	bom1.toon();
	bom2.toon();
	bom3.toon();
  bom4.toon();
  bom5.toon();
  
  if(medkit.available){
  medkit.toon();}
  if(medkit1.available1){
    medkit1.toon();}
  raster.teken();
  if (eve.levens == 1){
    image(leven1, 00, 00, 50, 50)
  }
  if (eve.levens == 2){
    image(leven2, 00, 00, 100, 50)
  }
  if (eve.levens == 3){
    image(leven3, 00, 00, 150, 50)
  }
  
  if (eve.aanDeBeurt) {
    eve.beweeg();
  }
  else {
    alice.beweeg();
    bob.beweeg();
    eve.aanDeBeurt = true;
  }
  
  if (alice.x == bob.x && alice.y == bob.y) {
    bob.beweeg();
  }
  
  
  
  if (eve.wordtGeraakt(alice) || eve.wordtGeraakt(bob)) {
    if (eve.levens == 0){
      achtergrondmuziek.stop();
      background(dood);
      tankschot.play();
      noLoop();
    }
    else{
      return
    }
  }
  
  if (eve.wordtGeraakt(bom1) || eve.wordtGeraakt(bom2) || eve.wordtGeraakt(bom3) ||eve.wordtGeraakt(bom4) || eve.wordtGeraakt(bom5)) { 
    if (eve.levens == 0){
      noLoop();
      achtergrondmuziek.stop();
      background(backgroundnuke);
      nukeexlposion.play();
    }
    else{
      return
    }

  }
  if (eve.KomtOpMedkit(medkit)) {
    if(medkit.available){
      achtergrondmuziek.pause();
      levenerbij.setVolume(0.2);
        levenerbij.play();
        //Wacht 1200 millie seconden voordat de achtergrondmuziek verder gaat.
        setTimeout(function() {
          achtergrondmuziek.play();
        }, 1200); 
        eve.levens += 1;
      }
      medkit.verwijder();
  }

  if (eve.KomtOpMedkit(medkit1)) {
    if(medkit1.available1){
      achtergrondmuziek.pause();
      levenerbij.setVolume(0.2);
        levenerbij.play();
        //Wacht 1200 millie seconden voordat de achtergrondmuziek verder gaat.
        setTimeout(function() {
          achtergrondmuziek.play();
        }, 1200);
        eve.levens += 1;
      }
    medkit1.verwijder1();
  }
  
  if (eve.gehaald) {
     if (keyIsDown(32)){
       eve.gehaald = false;
       eve.levens = 1;
       eve.aanDeBeurt = true;
       preload();
       setup();
       draw();
     }
    else{
      noLoop();
      achtergrondmuziek.stop();
      background(gewonnen);
      gewonnen2.play();
    }
  }
  //if (eve.gehaald == true || eve.levens == 0 && keyIsDown(32)){
    //eve.gehaald = false;
    //eve.levens = 1;
    //eve.aanDeBeurt = true;
    //preload();
   // setup();
   // draw();
 // }
}

