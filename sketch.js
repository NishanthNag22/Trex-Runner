var trex ,trex_running ,trex_collided;
var ground,groundimage;
var invisibleground;
var cloudimg;
var obs1,obs2,obs3,obs4,obs5,obs6;
var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameover,gameoverimg;
var restart,restartimg;
var die,jump,checkpoint;
var highscore=0;

function preload(){
  trex_running=         loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided=loadAnimation("trex_collided.png");
  groundimage=loadImage("ground2.png");
  cloudimg=loadImage("cloud.png");
  obs1=loadImage("obstacle1.png");
  obs2=loadImage("obstacle2.png");
  obs3=loadImage("obstacle3.png");
  obs4=loadImage("obstacle4.png");
  obs5=loadImage("obstacle5.png");
  obs6=loadImage("obstacle6.png");
  gameoverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
}

function setup(){
  createCanvas(/*600,200*/displayWidth,displayHeight-112);
  
  trex=createSprite(80,displayHeight-200,10,40);
  trex.addAnimation("trex",trex_running);
  trex.addAnimation("trexcollided",trex_collided);
  trex.scale= 0.75;
  trex.setCollider("circle",0,0,30);
  
  ground=createSprite(displayWidth/2,displayHeight-200,displayWidth,10); 
  ground.addImage("ground",groundimage);
  ground.x=ground.width/2;
  
  invisibleground=createSprite(300,displayHeight-195,displayWidth,5);
  invisibleground.visible=false;
  
  cloudsGroup= new Group();
  obstaclesGroup= new Group();
  
  gameover=createSprite(displayWidth/2,displayHeight/2-100,20,20);
  gameover.addImage(gameoverimg);
  gameover.visible=false;
  
  restart=createSprite(displayWidth/2,displayHeight/2,20,20);
  restart.addImage(restartimg);
  restart.visible=false;
}

function draw(){
  background(180);
  textSize(40)
  text("Score :" + score, displayWidth-400,80);
  text("HI :" +highscore,displayWidth-150,80);
  if(gameState==PLAY){
     score=score + Math.round(getFrameRate()/60);
     ground.velocityX=-(5+3*score/100);
    
     if(keyDown("space") && trex.y=>372){
     trex.velocityY=-25;
    }
  console.log(trex.y);
  if(ground.x<200){
     ground.x=ground.width/2;
    }
    
    trex.velocityY=trex.velocityY+1.7;
    spawnClouds();
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
      gameState=END;
    }
  }
  else if(gameState==END){
    ground.velocityX=0;
    trex.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    trex.changeAnimation("trexcollided",trex_collided);
    gameover.visible=true;
    restart.visible=true;
  }
  
  if(mousePressedOver(restart)){
    reset();
  }
  
  trex.collide(invisibleground);  
  
  drawSprites();
  
}

function spawnClouds(){
  if(World.frameCount % 150==0){
  var cloud=createSprite(displayWidth-50,displayHeight-280,40,10);
    cloud.velocityX=-5;
    cloud.y=random(170,220);
    cloud.addImage(cloudimg);
    cloud.scale=1.5;
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    cloud.lifetime=125;
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles(){
  if(World.frameCount % 125 ==0){
  
  var obstacle=createSprite(displayWidth-50,displayHeight-230,30,60);
    obstacle.velocityX=-(5+3*score/100);
  var rand=Math.round(random(1,6));
    switch(rand){
    case 1:obstacle.addImage(obs1);
    break;
    case 2:obstacle.addImage(obs2);
    break;
    case 3:obstacle.addImage(obs3);
    break;
    case 4:obstacle.addImage(obs4);
    break;
    case 5:obstacle.addImage(obs5);
    break;
    case 6:obstacle.addImage(obs6);
    break;
    default : break;
    }
    obstacle.scale=1.15;
    obstacle.lifetime=200;
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
   gameState=PLAY;
   obstaclesGroup.destroyEach();
   cloudsGroup.destroyEach();
   gameover.visible=false;
   restart.visible=false;
   trex.changeAnimation("trex",trex_running);
   if(highscore<score){
     highscore=score;
   }
   score=0;
}