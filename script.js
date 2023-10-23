class Raster {
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

class Jos {
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
  
  beweeg() {
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
      //this.levens += 1;
     // kit.verwijder();
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

class Vijand {
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
class Bom {
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
let medkit;
let medkit1;

function preload() {
  achtergrond = loadImage("images/backgrounds/informatica playground.jpg");
  dood = loadImage("images/backgrounds/Disabled-Death-Screen.png");
  gewonnen = loadImage("images/backgrounds/GTA-Mission-Passed.jpg");
  gewonnen2 = loadSound("Sound/Win.mp3");
  backgroundnuke = loadImage ("images/backgrounds/backgroundnuke.jpg");
  nukeexlposion = loadSound("Sound/nukeexlposion.mp3");
  leven1 = loadImage("images/sprites/hart.png");
  leven2 = loadImage("images/sprites/hart2.png");
  leven3 = loadImage("images/sprites/hart3.png");
}

function setup() {
  canvas = createCanvas(900,600);
  frameRate(10);
  textFont("Verdana");
  textSize(90);
  
  raster = new Raster(12,18);
  
  raster.berekenCelGrootte();
  
  eve = new Jos();
  eve.stapGrootte = 1*raster.celGrootte;
  for (var b = 0;b < 6;b++) {
    frameEve = loadImage("images/sprites/Eve100px/soldaat2.png");
    eve.animatie.push(frameEve);
  }
  
  alice = new Vijand(700,200);
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
    image(leven1, 10, 10, 50, 50)
  }
  if (eve.levens == 2){
    image(leven2, 10, 10, 100, 50)
  }
  if (eve.levens == 3){
    image(leven3, 10, 10, 150, 50)
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
  
  eve.toon();
  alice.toon();
  bob.toon();
  
  if (eve.wordtGeraakt(alice) || eve.wordtGeraakt(bob)) {
    if (eve.levens == 0){
      background(dood);
      //catched.play();
      noLoop();
    }
    else{
      return
    }
  }
  
  if (eve.wordtGeraakt(bom1) || eve.wordtGeraakt(bom2) || eve.wordtGeraakt(bom3) ||eve.wordtGeraakt(bom4) || eve.wordtGeraakt(bom5)) { 
    if (eve.levens == 0){
      noLoop();
      background(backgroundnuke);
      nukeexlposion.play();
    }
    else{
      return
    }

  }
  if (eve.KomtOpMedkit(medkit)) {
    if(medkit.available){
      eve.levens += 1;}
    medkit.verwijder();
  }

  if (eve.KomtOpMedkit(medkit1)) {
    if(medkit1.available1){
      eve.levens += 1;}
    medkit1.verwijder1();
  }
  
  if (eve.gehaald) {
    noLoop();
    background(gewonnen);
    gewonnen2.play(); 
  }
}