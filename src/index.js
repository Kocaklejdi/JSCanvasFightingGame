const body = document.getElementById("myBody");
const ctx = document.getElementById("canvas").getContext("2d");

const image1 = document.getElementById("s1")
const image2 = document.getElementById("s2")
const image3 = document.getElementById("s3")
const image4 = document.getElementById("s4")



function drawBackground(){
    ctx.drawImage(image1,0,0)
    ctx.drawImage(image2,0,0)
    ctx.drawImage(image3,0,0)
    ctx.drawImage(image4,-100,-60) 
}

function checkPlayerBounds(obj){
  if(obj.x < 0){
    obj.x = 0;
  }
  if(obj.x > 275){
    obj.x = 275;
  }
}

function collision(player1,player2){
  if(player1.x < player2.x + player2.width &&
    player1.x + player1.width > player2.x &&
    player1.y < player2.y + player2.height &&
    player1.y + player1.height > player2.y)
{
    player2.hp --;
}
}



const player1 = new player(100,60);
const enemy1 = new enemy(200,60);
const hp = document.getElementById("hp");


function drawGame(){
  hp.style.width = `${(enemy1.hp/100) * 500}px`;
  drawBackground();
  checkPlayerBounds(player1);
  player1.drawSelf();
  player1.update();
  player1.controls.updateControls();
  enemy1.drawSelf();
  enemy1.update();
  enemy1.ai(player1);
  collision(player1.weapon,enemy1)
}

setInterval(()=>{player1.frame += 1;
  enemy1.frame += 1;
},100)

setInterval(drawGame,1000/25)