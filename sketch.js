var sea,ship,pirate,cash,diamonds,jewelry,sword,gm0;
var seaimg,shipimg,pirateimg,cashImg,diamondsImg,jewelryImg,swordImg,gm0img;
var cashG,diamondsG,jewelryG,swordGroup,pshipG;
var treasureCollection = 0;
var PLAY=1;
var END=0;
var gameState=1;
var gameover;
var points;
var restart,restartimg;

function preload(){
  seaimg = loadImage("sea.png");
  shipimg = loadImage("ship.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jewelryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  pirateimg = loadImage("pship.png");
  gm0img = loadImage("gameOver.png");
  gameover = loadSound("gameover.wav");
  points = loadSound("yay.wav");
  restartimg=loadImage("restart.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  sea=createSprite(windowWidth/2,windowHeight/2);
  sea.addImage(seaimg);
  sea.velocityY = 4;
  sea.scale=1.2;

  ship = createSprite(windowWidth,windowHeight,20,20);
  ship.addImage(shipimg);
  ship.scale=0.1;

  cashG=new Group();
  diamondsG=new Group();
  jewelryG=new Group();
  swordGroup=new Group();
  pshipG = new Group();

  gm0=createSprite(windowWidth/2,100);
  gm0.addImage(gm0img);
  gm0.scale=0.5;

 restart=createSprite(windowWidth/2,150);
 restart.addImage(restartimg);
 restart.scale=0.5;
}

function draw(){

  if(gameState===PLAY){
    edges=createEdgeSprites();
    ship.collide(edges);
    gm0.visible=false;
    restart.visible=false;
    if(sea.y > windowHeight ){
      sea.y = windowHeight/2;
    }
    ship.x=World.mouseX;
    createCash();
    createDiamonds();
    createjewelry();
    createSword();
    createPirates();

    if (cashG.isTouching(ship)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
      points.play();
    }
    else if (diamondsG.isTouching(ship)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+10; 
      points.play();
    }
    else if(jewelryG.isTouching(ship)) {
      jewelryG.destroyEach();
      treasureCollection= treasureCollection + 15;
      points.play();
    }
    else{
      if(swordGroup.isTouching(ship)||pshipG.isTouching(ship)) {
        gameover.play();
        gameState=END;
      }
    }
  }

  if(gameState===END){
    gm0.visible=true;
    restart.visible=true;
    sea.velocityY = 0;
    ship.x=windowWidth/2;
    ship.y=windowHeight/2;
    cashG.destroyEach();
    diamondsG.destroyEach();
    jewelryG.destroyEach();
    swordGroup.destroyEach();
    pshipG.destroyEach();
    if(touches.length>0 || mousePressedOver (restart)){
     reset();
     touches = []
    }
} 
drawSprites();
textSize(12);
fill(255);
text("Treasure: "+ treasureCollection,10,30);
}

function reset(){
  gameState=PLAY;
  cashG.destroyEach();
  diamondsG.destroyEach();
  jewelryG.destroyEach();
  swordGroup.destroyEach();
  pshipG.destroyEach();
  treasureCollection=0;
  ship.x=windowWidth;
  ship.y=windowHeight;
  sea.velocityY = 4;
  }

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, windowWidth),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.07;
  cash.velocityY = 3;
  cash.lifetime = windowHeight;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, windowWidth),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.02;
  diamonds.velocityY = 3;
  diamonds.lifetime = windowHeight;
  diamondsG.add(diamonds);
  }
}

function createjewelry() {
  if (World.frameCount % 410 == 0) {
  var jewelry = createSprite(Math.round(random(50, windowWidth),40, 10, 10));
  jewelry.addImage(jewelryImg);
  jewelry.scale=0.07;
  jewelry.velocityY = 3;
  jewelry.lifetime = windowHeight;
  jewelryG.add(jewelry);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, windowWidth),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.06;
  sword.velocityY = 3;
  sword.lifetime = windowHeight;
  swordGroup.add(sword);
  }
}

function createPirates(){
  if (World.frameCount % 630 == 0) {
  var pirate = createSprite(Math.round(random(50, windowWidth),40, 10, 10));
  pirate.addImage(pirateimg);
  pirate.scale=0.06;
  pirate.velocityY = 3;
  pirate.lifetime = windowHeight;
  pshipG.add(pirate);
  }
}