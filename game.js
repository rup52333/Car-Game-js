const score=document.querySelector(".score");
const highScore = document.querySelector('.highScore');
const startScreen=document.querySelector(".startScreen");
const gameArea=document.querySelector('.gameArea');
const ClickToStart = document.querySelector('.ClickToStart');

ClickToStart.addEventListener('click', start);

let player={ speed:5 ,score: 0,
    highScore: 0};


let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    }

document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);


function keydown(e){
e.preventDefault();
keys[e.key] = true;

}


function keyup(e){
e.preventDefault();
keys[e.key] = false;

}
function start(){
 
 startScreen.classList.add('hide'); 
 
 gameArea.innerHTML='';
player.start=true;
player.score=0;
window.requestAnimationFrame(gamePlay);
for (i = 0; i < 5; i++) {
let roadLines = document.createElement('div');
roadLines.setAttribute('class', 'roadLines');
roadLines.y = (i * 140);
roadLines.style.top = roadLines.y + "px";
gameArea.appendChild(roadLines);
}


// creating the opponents car
for (i = 0; i < 3; i++) {
    let Opponents = document.createElement('div');
    Opponents.setAttribute('class', 'Opponents');
    Opponents.y = ((i) * -300);
    Opponents.style.top = Opponents.y + "px";
    
    Opponents.style.left = Math.floor(Math.random() * 350) + "px";
    Opponents.style.backgroundColor=randomColor();
    gameArea.appendChild(Opponents);
    
    
    }

      function randomColor(){
        function c(){
        let hex=Math.floor(Math.random()*256).toString(16);
        return ("0"+String(hex)).substr(-2);
        }
        return "#"+c()+c()+c();
        }





let car=document.createElement('div');
car.setAttribute('class','car');
gameArea.appendChild(car);
player.x = car.offsetLeft;
player.y = car.offsetTop;


}
function gamePlay(){
let car=document.querySelector('.car');
let road=gameArea.getBoundingClientRect();
if(player.start){
    moveLines();
    moveOpponents(car);
if(keys.ArrowUp && player.y>(road.top+70)){
    player.y-=player.speed;
}
if(keys.ArrowDown && player.y<(road.bottom-70)){
    player.y+=player.speed;
}

if(keys.ArrowLeft && player.x>0){
    player.x-=player.speed;
}
if(keys.ArrowRight && player.x<(road.width-50)){
    player.x+=player.speed;
}

car.style.top = player.y + "px";
car.style.left = player.x + "px";
 highScore.innerHTML = "HighScore" + ":" + (player.highScore - 1);
player.score++;
let ps=player.score-1;
player.speed += 0.01;

 if (player.highScore < player.score) {
    player.highScore++;
    highScore.innerHTML = "HighScore" + ":" + (player.highScore - 1);
    highScore.style.top="80px";
    }
score.innerText="Score:"+ps;
window.requestAnimationFrame(gamePlay);

}
}
    
function moveLines(){
   let roadLines = document.querySelectorAll('.roadLines');
   roadLines.forEach(function(item){
    
    if (item.y >= 700)
    item.y -= 700;
    item.y+=player.speed;
    item.style.top = item.y + "px";
})
}
function moveOpponents(car) {
    let Opponents = document.querySelectorAll('.Opponents');
    Opponents.forEach(function (item) {
      if (isCollide(car, item)) {
     endGame();
      }
    if (item.y >= 750) {
    item.y -= 900;
    item.style.left = Math.floor(Math.random() * 350) + "px";
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
    })
    }

    function isCollide(a, b) {
         aRect = a.getBoundingClientRect();
         bRect = b.getBoundingClientRect();
    
         return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
 }
    
      //game is end

   function endGame() {
    player.start = false;
    player.speed = 5;
    startScreen.classList.remove('hide');
     
    // ClickToStart.innerHTML= "Game Over <br> Your final score is " + player.score+"<br> Press here to restart the game.";
     
   }
    