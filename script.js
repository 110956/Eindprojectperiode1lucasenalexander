class Raster { // Schepping van het raster
  constructor(r,k) {
    this.aantalRijen = r;
    this.aantalKolommen = k;
    this.celGrootte = null;
  }
  
  berekenCelGrootte() { // Berekent de grootte van de cellen
    this.celGrootte = canvas.width / this.aantalKolommen;
  }
  
  teken() {
    push(); // Slaat de tekeninstellingen op
    noFill(); // De hokjes zijn doorzichtig
    stroke('grey'); // Bepaalt de kleur van de lijntjes
    for (var rij = 0;rij<this.aantalRijen;rij++) { // Spawnt de rijen
      for (var kolom = 0;kolom<this.aantalKolommen;kolom++) { // Spawnt de kolommen
        rect(kolom*this.celGrootte,rij*this.celGrootte,this.celGrootte,this.celGrootte); // Definieert het format voor de attributen van het raster
      }
    }
    pop(); // Herstelt de tekeninstellingen
  }
}

class Jos { // De schepping van jos
  constructor() { // Atributen van Jos
    this.x = 0;
    this.y = 300;
    this.animatie = [];
    this.sprite =  null;
    this.stapGrootte = null;
    this.gehaald = false;
    this.aanDeBeurt = true;
    this.levens = 1; // Begint met 1 leven/ hartje
  }
  
  beweeg() { // Bestuuring m.b.v. WASD
    if (keyIsDown(68)) { // Checkt of toets D is ingedrukt
      this.x += this.stapGrootte; // De x positie gaat naar rechts
      this.aanDeBeurt = false; // Je bent niet meer aan de beurt
    }
    if (keyIsDown(87)) { // Checkt of toets W is ingedrukt
      this.y -= this.stapGrootte; // De y positie gaat naar boven
      this.aanDeBeurt = false; // Je bent niet meer aan de beurt
    }
    if (keyIsDown(83)) { // Checkt of toets S is ingedrukt
      this.y += this.stapGrootte; // De y positie gaat naar beneden
      this.aanDeBeurt = false; // Je bent niet meer aan de beurt
    }
    if (keyIsDown(65)) { // Checkt of toets A is ingedrukt
      this.x -= this.stapGrootte; // De x positie gaat naar links
      this.aanDeBeurt = false; // Je bent niet meer aan de beurt
    }
    this.x = constrain(this.x,0,canvas.width);
    this.y = constrain(this.y,0,canvas.height - raster.celGrootte); // zorgt dat Eve netjes in het raster blijft
    
    if (this.x == canvas.width) { // Checkt of je aan de overkan van het veld bent
      this.gehaald = true; // Geeft 'true' terug zodat je kan winnen in een andere functie
    }
  }
  
  wordtGeraakt(vijand) { // Als je geraakt wordt gaat een leven er van af
    if (this.x == vijand.x && this.y == vijand.y) { // Controleert of posities gelijk zijn van Jos en tank
      this.levens -= 1; // Leven eraf
      return true; // Geeft 'true' terug zodat dat in een andere functie kan worden gebruikt
    }
    else {
      return false; // Geeft 'false' terug en er gebeurt niks
    }
  }
  KomtOpMedkit(kit) { // Checkt of je op een medkit staat
    if (this.x == kit.x && this.y == kit.y && eve.aanDeBeurt == false) { // Checkt of de posities van Jos en de medkit gelijk zijn
    return true; // Geeft 'true' terug zodat er een leven bij kan in een andere functie
    }
    else {
      return false; // Geeft 'false' terug en er gebeurt niks
    }
  }
  
  toon() {
    image(this.sprite,this.x,this.y,raster.celGrootte,raster.celGrootte); // Defineert het format voor de attributen van Jos
  }
}

class Vijand {  // Schepping van vijandige tanks
  constructor(x,y) { // Atributen van de tanks
    this.x = x;
    this.y = y;
    this.sprite = null;
    this.stapGrootte = null;
  }

  beweeg() { // Zorgt ervoor dat de tanks random bewegen
    this.x += floor(random(-1,2))*this.stapGrootte;
    this.y += floor(random(-1,2))*this.stapGrootte;

    this.x = constrain(this.x,0,canvas.width - raster.celGrootte);
    this.y = constrain(this.y,0,canvas.height - raster.celGrootte);
  }
  
  toon() {
    image(this.sprite,this.x,this.y,raster.celGrootte,raster.celGrootte);
  } // Definieert het format voor de attributen van de tanks
}
var x = [200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850];
class Bom { // Schepping van de explosieve de bommen
  constructor(y,vy) {
    this.x = random(x);
    this.y = y;
    this.vy = vy;
		this.sprite = null;
		this.stapGrootte = null;
  }

  beweeg() {
    this.y += this.vy // Zorgt dat de bommen bewegen
    if (this.y >= 600 || this.y < 0) { // Zorg ervoor dat de bommen niet uit het speelveld gaan.
			this.vy *= -1; // Keert de snelheid van de bommen om
		}
	this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);
	} // Zorgt dat bommen netjes in het raster komen en niet door de lijnen heen spawnen
    toon() {
		        image(this.sprite, this.x, this.y, raster.celGrootte, raster.celGrootte); // Definieert het format voor de attributen van de bommen
	}
}
class Medkit { // Schepping van de medische dozen (medkits)
  constructor(x,y) { // Attributen van de medkits
    this.x = x;
    this.y = y;
    this.sprite = null;
    this.stapGrootte = null;
    this.available = true;
    this.available1 = true;
  }

  toon() {
  image(this.sprite,this.x,this.y,raster.celGrootte,raster.celGrootte);
  } // Definieert het format voor de 6attributen van de medkits
  verwijder(){ // Verwijdert medkit
    this.available = false; // Zet de bruikbaarheid van medkit op false
  }
  verwijder1(){ // Verwidert medkit
    this.available1 = false; // Zet de bruikbaarheid van medkit1 op false
  }
  
}

// Defineert variabelen
let gewonnen2;
let nukeexlposion;
let tankschot;
let medkit;
let medkit1;


function preload() { //Importeert alle afbeeldingen en geluiden die we in dit spel nodig hebben.
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

function setup() { // Initialiseert alle elementen in het spel zodat ze klaar zijn om door draw() weergegeven te worden.
  canvas = createCanvas(900,600); // Creatie spelgebied
  frameRate(10);                  // 10 FPS
  textFont("Verdana"); // Tekst weergeven met font 'Verdana'
  textSize(90); // Tekstgrootte is 90 px
 
  achtergrondmuziek.loop(); // Speelt muziek af en zorgt dat hij nooit stopt
  achtergrondmuziek.setVolume(0.2); // Zo dat de muziek niet te hard is in volume
  
  raster = new Raster(12,18); //Raster groote 12 bij 18 gemaakt
  raster.berekenCelGrootte(); // Berekent de grootte van de cellen in het raster
  
  // Eve wordt gemaakt en toegevoegd aan het spel
  eve = new Jos(); // Genereert Eve
  eve.stapGrootte = 1*raster.celGrootte; // Bepaalt de snelheid van Eve
  eve.sprite = loadImage("images/sprites/Eve100px/soldaat2.png"); // Laad de sprite van Eve

  
  // Tanks worden gemaakt en toegevoegd aan het spel
  alice = new Vijand(700,150); // Genereert nieuwe tank
  alice.stapGrootte = 1*eve.stapGrootte; // Bepaalt de snelheid van de tank
  alice.sprite = loadImage("images/sprites/Alice100px/tank1.png"); // Laad de sprite voor de tank

  bob = new Vijand(700, 400)
  bob.stapGrootte = 1*eve.stapGrootte;
  bob.sprite = loadImage("images/sprites/Bob100px/tank1.png");

  
  // Alle bommen worden gemaakt en toegevoegd aan het spel
  bom1 = new Bom(100, raster.celGrootte); // Genereert nieuwe bom
	bom1.stapGrootte = 2 * raster.celGrootte; // Bepaalt snelheid van de bom
	bom1.sprite = loadImage("images/sprites/bomb.png"); // Bommen afbeelding

	bom2 = new Bom(400, -2 * raster.celGrootte); // Zie bom 1^^^
	bom2.stapGrootte = 3 * raster.celGrootte;
	bom2.sprite = loadImage("images/sprites/bomb.png");

	bom3 = new Bom(300, raster.celGrootte);
	bom3.stapGrootte = 1 * raster.celGrootte;
	bom3.sprite = loadImage("images/sprites/bomb.png");

  bom4 = new Bom(700, raster.celGrootte);
  bom4.stapGrootte = 2 * raster.celGrootte;
  bom4.sprite = loadImage("images/sprites/bomb.png");

  bom5 = new Bom(800, raster.celGrootte);
  bom5.stapGrootte = 3 * raster.celGrootte;
  bom5.sprite = loadImage("images/sprites/bomb.png");

  bom6 = new Bom(900, raster.celGrootte);
  bom6.stapGrootte = 4 * raster.celGrootte;
  bom6.sprite = loadImage("images/sprites/bomb.png");

  bom7 = new Bom(600, raster.celGrootte);
  bom7.stapGrootte = 5 * raster.celGrootte;
  bom7.sprite = loadImage("images/sprites/bomb.png");

  bom8 = new Bom(100, raster.celGrootte);
  bom8.stapGrootte = -1 * raster.celGrootte;
  bom8.sprite = loadImage("images/sprites/bomb.png");

  bom9 = new Bom(500, raster.celGrootte);
  bom9.stapGrootte = -2 * raster.celGrootte;
  bom9.sprite = loadImage("images/sprites/bomb.png");

  bom10 = new Bom(150, raster.celGrootte);
  bom10.stapGrootte = -3 * raster.celGrootte;
  bom10.sprite = loadImage("images/sprites/bomb.png");

  
  // Alle medkits worden gemaakt en toegevoegd aan het spel
  medkit = new Medkit(150, 400); // Genereert nieuwe medkit
  medkit.sprite = loadImage("images/sprites/medkit2.png") // Laadt de sprite van de medkit

  medkit1 = new Medkit(700,200); // Zie medkit^^^
  medkit1.sprite = loadImage("images/sprites/medkit2.png")
}


function draw() { 
  background(achtergrond); // De achtergrond wordt weergegeven
  fill("green"); // Raster verticaal en horizontaal ingekleurd m.b.v 4 rectangles te maken op de juiste locatie
  rect(000, 0, 50, 600);
  rect(850, 0, 50, 600);
  rect(0, 0, 900, 50);
  rect(0, 550, 900, 50);
  eve.toon(); // Toont Eve
  alice.toon(); // Toont tank
  bob.toon(); // Toont andere tank
	bom1.beweeg(); // Laat alle bommen bewegen
	bom2.beweeg();
	bom3.beweeg();
  bom4.beweeg();
  bom5.beweeg();
  bom6.beweeg();
  bom7.beweeg();
  bom8.beweeg();
  bom9.beweeg();
  bom10.beweeg();
  bob.toon(); // Toont alle bommen
	bom1.toon();
	bom2.toon();
	bom3.toon();
  bom4.toon();
  bom5.toon();
  bom6.toon();
  bom7.toon();
  bom8.toon();
  bom9.toon();
  bom10.toon();
  
  if(medkit.available){ // Checkt of medkit beschikbaar is
  medkit.toon();} // Medkit weergeven
  if(medkit1.available1){ // Checkt of medkit beschikbaar is 
    medkit1.toon();} // Medkit weergeven
  raster.teken(); // Het raster wordt weergegeven
  if (eve.levens == 1){ // 1 hartje voor 1 leven
    image(leven1, 10, 10, 50, 50) // Locatie van hartje 1
  }
  if (eve.levens == 2){ // 2 hartjes voor 2 levens
    image(leven2, 10, 10, 100, 50) // Locatie van hartje 2
  }
  if (eve.levens == 3){ // 3 hartjes voor 3 levens
    image(leven3, 10, 10, 150, 50) // Locatie van hartje 3
  }
  
  if (eve.aanDeBeurt) { // Als jos (eve) aan de beurt is kan je bewegen
    eve.beweeg(); // Eve beweegt (wel pas met user input)
  }
  else { // Tanks bewegen als je niet aan de beurt bent
    alice.beweeg(); // Tank beweegt
    bob.beweeg(); // Andere tank beweegt
    eve.aanDeBeurt = true; // Eve is weer aan de beurt
  }
  
  if (alice.x == bob.x && alice.y == bob.y) { // Checkt of de tanks op dezelfde plek staan
    bob.beweeg(); // Als tanks op dezelfde plek zijn beweegt eentje nog een keer
  }
  
  if (eve.wordtGeraakt(alice) || eve.wordtGeraakt(bob)) {
    if (eve.levens == 0){ // Checkt voor doodgaan door tanks
      achtergrondmuziek.stop(); // Stopt achtergrond muziek zodat je het andere soundeffect kan horen
      background(dood); // Zet achtergrond naar het dood scherm
      tankschot.play(); // Tankschot geluid speelt af
      noLoop(); // Loopt draw() niet meer
    }
    else{
      return // Er gebeurt niks
    }
  }
  
  if (eve.wordtGeraakt(bom1) || eve.wordtGeraakt(bom2) ||                    eve.wordtGeraakt(bom3) || eve.wordtGeraakt(bom4) ||                    eve.wordtGeraakt(bom5) || eve.wordtGeraakt(bom6) ||                    eve.wordtGeraakt(bom7) || eve.wordtGeraakt(bom8) ||                    eve.wordtGeraakt(bom9) || eve.wordtGeraakt(bom10)) { // Checkt voor botsing met bommen.
    if (eve.levens == 0) {// Checkt voor doodgaan door bommen
      noLoop(); // Loopt draw() niet meer
      achtergrondmuziek.stop(); // Stopt achtergrond muziek zodat je het andere soundeffect kan horen
      background(backgroundnuke); // Veranderd achtergrond naar explosie
      nukeexlposion.play(); // Speelt nuke explosie geluid
    }
    else{
      return // Er gebeurt niks
    }

  }
  if (eve.KomtOpMedkit(medkit)) { // Checkt of Eve op een medkit komt
    if(medkit.available){ // Checkt of de medkit bruikbaar is
      achtergrondmuziek.pause(); // Muziekje pauzeert
      levenerbij.setVolume(0.2); // Volume leven erbij geluid setten
        levenerbij.play(); // Leven erbij geluid afspelen
        
        setTimeout(function() { // Wacht 1200 milli seconden voordat de achtergrondmuziek verder gaat
          achtergrondmuziek.play(); // Muziekje afspelen
        }, 1200); 
        eve.levens += 1; // Levens komen erbij
      }
      medkit.verwijder(); // Verwijdert medkit
  }

  if (eve.KomtOpMedkit(medkit1)) { // Checkt of Eve op medkit1 komt
    if(medkit1.available1){ // Checkt of medkit1 bruikbaar is
      achtergrondmuziek.pause(); // Muziekje pauzeert
      levenerbij.setVolume(0.2); // Volum leven erbij geluid setten
        levenerbij.play(); // Leven erbij geluid afspelen
        
        setTimeout(function() { // Wacht 1200 millie seconden voordat de achtergrondmuziek verder gaat
          achtergrondmuziek.play(); // Muziekje afspelen
        }, 1200);
        eve.levens += 1; // Levens komen erbij
      }
    medkit1.verwijder1(); // Verwijdert medkit1
  }
  
  if (eve.gehaald) { // Checkt of je hebt gewonnen
    noLoop(); // Stopt het loopen van draw()
    achtergrondmuziek.stop(); // Muziekje stopt
    background(gewonnen); // Veranderd achtergrond naar gewonnen
    gewonnen2.play(); // Gewonnen2 geuild afspelen
  }
}
