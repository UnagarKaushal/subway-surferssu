var jake;
var jakeAnimation;
var rails;
var train; 
var trainImage1;
var trainsGroup;
var score = 0;
var gameState = "play";
var barrier1;
var barrier2;
var railsGroup;

function preload(){
  //pre-load images
  jakeAnimation = loadAnimation("jake1.png", "jake2.png","jake4.PNG","jake5.png");
  trainImage1 = loadImage("train.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  //create sprites here
  jake = createSprite(windowWidth/2,windowHeight-200,20,20);
  jake.addAnimation("jakeRunning", jakeAnimation)
  jake.scale = 1;
  trainsGroup = new Group();
  barrier1 = createSprite(windowWidth-50,0,10,20000)
  barrier2 = createSprite(windowWidth-1500,0,10,20000)
  
  railsGroup = new Group();
}

function draw() {
  background("black");
  textSize(15)
  fill("white")
  text("Score:"+score,windowWidth-100,20)
  
  barrier1.visible = false;
  barrier2.visible = false;
  
  if (gameState === "play"){
    score += Math.round (frameCount/200)
    
    jake.visible = true;
    

    if (keyDown("right")){
      jake.velocityX = 10;
    }

    if (keyDown("left")){
      jake.velocityX = -10;
    }

    jake.bounceOff(barrier1)
    jake.bounceOff(barrier2)
    
    if (jake.isTouching(trainsGroup)){
      gameState = "end";
    }

    spawnRails();
    spawnRails2();
    spawnTrains();
  }
  else if (gameState === "end"){
    railsGroup.destroyEach();
    
    jake.visible = false;
    textSize(45);
    fill("white");
    text("GAME OVER YOU GOT: "+score+" POINTS", 50, 200)
    
    textSize(45)
    fill("white")
    text("PRESS R TO RESTART", windowWidth/2, windowHeight/2)
    
    if (keyWentDown("r")){
      score = 0;
      gameState = "play";
      jake.x = windowWidth/2;
      jake.velocityX = 0;
    }
  }
  
  drawSprites();
}

function spawnRails() {
  //write code here to spawn the rails
  if (frameCount % 50 === 0) {
    rail = createSprite(windowWidth-975,0,10,100);
    rail.scale = 1;
    rail.velocityY = 5;
    rail.lifetime = 200;
    
    //adjust the depth
    rail.depth = jake.depth
    jake.depth = jake.depth + 1;
    
    railsGroup.add(rail);
    }
}

function spawnRails2() {
  //write code here to spawn the rails
  if (frameCount % 50 === 0) {
    rail = createSprite(windowWidth-600,0,10,100);
    rail.scale = 1;
    rail.velocityY = 5;
    rail.lifetime = 200;
    
    //adjust the depth
    rail.depth = jake.depth
    jake.depth = jake.depth + 1;
    
    railsGroup.add(rail)
    }
}

function spawnTrains(){
  if (frameCount % 160 === 0) {
    train = createSprite(0, 0, 80 , 200)
    train.addImage(trainImage1);
    train.scale = 0.06;
    train.velocityY = Math.round(random(5,10));
    train.lifetime = 200;
    trainsGroup.add(train);
    var a = Math.round(random(1,3))
    switch(a){
      case 1: train.x = windowWidth-300;
        break
      case 2: train.x = windowWidth-800;
        break
      case 3: train.x = windowWidth-1200;
        break
    }
    
  }
}