var PLAY=1;
var END=0;
var gameState=PLAY;
var trex, trex_running, edges;
var trex_colided;
var groundImage, ground
var invisibleGround;
var cloud,cloudImg;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var score;
var obstaclesGroup,cloudsGroup;
var gameOver,gameOverImg,restart,restartImg;
var jumpSound,checkpointSound,dieSound;
var touches;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_colided=loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImg=loadImage('cloud.png');
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
gameOverImg=loadImage("gameOver.png");
restartImg=loadImage("restart.png");
  jumpSound=loadSound("jump.mp3");
  checkpointSound=loadSound("checkpoint.mp3");
  dieSound=loadSound("die.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  //criando o trex
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_colided);
  edges = createEdgeSprites();
  
  ground=createSprite(width/2,height,width,20);
  ground.addImage(groundImage)
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50;
invisibleGround=createSprite(width/2,height+7,width, 10);
invisibleGround.visible=false;
gameOver=createSprite(width/2,height/2-50);
gameOver.addImage(gameOverImg);
gameOver.scale=0.5
restart=createSprite(width/2,height/2);
restart.addImage(restartImg);
restart.scale=0.5
score=0;
obstaclesGroup= new Group();
cloudsGroup= new Group();
trex.debug=false;
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");
  if(gameState===PLAY){
    gameOver.visible=false;
    restart.visible=false;
    text("score: "+score, 500, 50);
    score=score+ Math.round(frameRate()/60);
    if(touches.length>0||keyDown("space") &&trex.y>=160 ){
      jumpSound.play();
      touches=[];
      trex.velocityY=-10;
    }
    if(score>0 && score%500===0){
      checkpointSound.play()
    }
    ground.velocityX=-(5+3*score/100)
    spawnClouds();
  spawnObstaclous();
  if(obstaclesGroup.isTouching(trex)){
gameState=END;
  dieSound.play();
  }
    trex.velocityY = trex.velocityY + 0.5;
    if (ground.x<0)
    { 
      ground.x = ground.width/2;
     }
  }else if(gameState===END){
ground.velocityX=0;
trex.velocityY=0
obstaclesGroup.setVelocityXEach(0);
cloudsGroup.setVelocityXEach(0);
trex.changeAnimation("collided",trex_colided);
obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);
gameOver.visible=true;
restart.visible=true; 
if(mousePressedOver(restart)){
  // console.log("reiniciar jogo")
  reset()
 }
  }
  
  //registrando a posição y do trex
  console.log(trex.y)
 
  //pular quando tecla de espaço for pressionada
 
 //impedir que o trex caia
  trex.collide(invisibleGround);
  
  drawSprites();
}
function reset(){
gameState=PLAY;
gameOver.visible=false;
restart.visible=false;
obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
trex.changeAnimation("running",trex_running);
score=0
}
function spawnClouds(){
  if(frameCount % 60===0){
cloud=createSprite(width+20,height-300,40,10);
cloud.addImage(cloudImg);
cloud.velocityX=-3;
cloud.y=Math.round(random(100,220));
cloud.depth=trex.depth;
trex.depth=trex.depth+1;
cloud.lifetime=430;
cloudsGroup.add(cloud);
} 
}
function spawnObstaclous(){
  if(frameCount % 60===0){
obstacle=createSprite(400,height-23,10,40);
obstacle.velocityX=-(6+score/100);
var rand=Math.round(random(1,6));
switch(rand){
  case 1:obstacle.addImage(obstacle1);
  break;
  case 2:obstacle.addImage(obstacle2);
  break;
  case 3:obstacle.addImage(obstacle3);
  break;
  case 4:obstacle.addImage(obstacle4);
  break;
  case 5:obstacle.addImage(obstacle5);
  break;
  case 6:obstacle.addImage(obstacle6);
  break;
  default:break;
}
obstacle.scale=0.5;
obstacle.lifetime=100;
obstaclesGroup.add(obstacle);
}

}