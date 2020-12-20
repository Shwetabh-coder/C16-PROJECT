var PLAY, END, gameState
PLAY = 1;
END = 2;
gameState = PLAY;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, survival;


function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(850, 350);
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(60, 350, 1000, 10);
  ground.x = ground.width / 2;
  ground.velocityX = -6;
  ground.visible = false;

  obstacleGroup = new Group();
  bananaGroup = new Group();
  survivalTime = 0;
  score = 0;
}


function draw() {
  background("skyblue");
  if (gameState === PLAY) {
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space")) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground);
    
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
    }
    spawnObstacle();
    fruit();
    
    
    
    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
    

    }
  }

  

  if (gameState === END) {
    monkey.velocityY=0;
    
   // monkey.
    obstacle.setLifetime = -1;
    bananaGroup.setLifetime = -1;

    obstacleGroup.setVelocityEach = 0;
    bananaGroup.setVelocityEach = 0;
    
    ground.velocityX = 0;
    //ground.visible = true;
  }

  drawSprites();
  textSize(12);
  fill("white")
  text("Survival :" + survivalTime, 500, 50);
  survivalTime = Math.ceil(frameCount / frameRate())
}

function spawnObstacle() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(800, 320, 10, 40);
    obstacle.velocityX = -6;
    //add image to the obstacle
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    //lifetime to the obstacle 
    obstacle.lifetime = 300;
    //add each obstacle to the group 
    obstacleGroup.add(obstacle);
  }
}

function fruit() {
  if (frameCount % 100 === 0) {
    banana = createSprite(800, 230, 10, 10);
    banana.velocityX = -6;
    banana.y = Math.round(random(200, 250));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 300
    bananaGroup.add(banana);
  }
}