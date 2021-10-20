//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position, background, trail;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage, backgroundImg;
var gameOverSound ,knifeSwoosh;

function preload(){
  
  backgroundImg = loadImage("fruitbg.png");
  knifeImage = loadImage("knife.png");
  monsterImage = loadImage("fruitbomb.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
}



function setup() {
  createCanvas(600, 600);
  // create background
  background = createSprite(300, 300, 600, 600);
  background.addImage(backgroundImg);
  background.scale = 5;

  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,50,150, 40);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  
  
  if(gameState===PLAY){

    //Call fruits and Monster function
    fruits();
    Monster();
    Trail();
    
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if sword touching fruit
    for(var i = 0; i < fruitGroup.length; i++){
      if(fruitGroup[i].isTouching(knife)){
        fruitGroup[i].destroy();
        knifeSwooshSound.play();
        score=score+2;
      
      }
    }
      
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        //gameover sound
        gameOverSound.play()
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
      }


  }
  
  drawSprites();
  //Display score
  fill("yellow");
  textSize(25);
  text("Score : "+ score,250,50);
}


function Monster(){
  if(World.frameCount%80===0){
    monster=createSprite(600,200,20,20);
    monster.addImage(monsterImage);
    monster.scale = 0.75;
    monster.y=Math.round(random(100,550));
    monster.velocityX=-(8+(score/4));
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%30===0){
    fruit=createSprite(400,200,20,20);
    fruit.x = 0    
  //Increase the velocity of fruit after score 4 

    fruit.velocityX= (8+(score/4));
    
     
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);

    
  }
}

function Trail() {
    trail=createSprite(knife.x, knife.y, 10, 50);
    trail.x = knife.x;
    trail.y = knife.y;
    trail.rotation = 30;
    trail.shapeColour = "white";
    
    trail.lifetime = 5;
    trail.depth = 1;
}