const cells = Array.from(document.querySelectorAll(".cell"));
const enemyCells = cells.slice(0, 56);
const playerCells = cells.slice(56);
const scoreDisplay = document.querySelector(".score");
var mySound;
var myMusic;
let gem=0;


let dropCount, speed, score;
let newscore;

reset();

isStart = false;
function startFunction()
{
    isStart = !isStart;
    if (isStart==true)
    {
        if (!dropCount) {
            document.getElementById("title").style.visibility = "hidden";
            document.body.style.backgroundImage = "url(elements/play2.png)";
            // player.style.backgroundImage = "url(elements/spaceship25.gif)";
            startGame();
        }
        document.getElementById("start").style.visibility = "hidden";
        document.getElementById("remote").style.visibility = "visible";
    }
    else
    {
        document.getElementById("start").style.visibility = "visible";
        document.getElementById("remote").style.visibility = "hidden";
    }
}

function leftFunction()
{
    const player = document.querySelector(".player");

    if (!dropCount) {
        document.getElementById("title").style.visibility = "hidden";
        document.body.style.backgroundImage = "url(elements/play2.png)";
        // player.style.backgroundImage = "url(elements/spaceship25.gif)";
        startGame();
	}


    if (score>3)
    {
        if(score<=10)
        {
            player.style.backgroundImage = "url(elements/spaceship50.gif)";
            score+=50
        }
        else if(score >5 && score<=100)
        {
            player.style.backgroundImage = "url(elements/spaceship75.gif)";
            score+=50
        }
        if(score>=200)
        {
            player.style.backgroundImage = "url(elements/spaceship100.gif)";
            score+=50
        }
        
    }
    if (playerCells.includes(player.parentElement.previousElementSibling)) {
        player.parentElement.previousElementSibling.appendChild(player);
    }
}

function rightFunction()
{
    const player = document.querySelector(".player");

    if (!dropCount) {
        document.getElementById("title").style.visibility = "hidden";
        document.body.style.backgroundImage = "url(elements/play2.png)";
        // player.style.backgroundImage = "url(elements/spaceship25.gif)";
        startGame();
	}

    if (score>3)
    {
        if(score<=10)
        {
            player.style.backgroundImage = "url(elements/spaceship50.gif)";
            score+=50
        }
        else if(score >5 && score<=100)
        {
            player.style.backgroundImage = "url(elements/spaceship75.gif)";
            score+=50
        }
        if(score>=200)
        {
            player.style.backgroundImage = "url(elements/spaceship100.gif)";
            score+=50
        }
        
    }
    if (playerCells.includes(player.parentElement.nextElementSibling)) {
        player.parentElement.nextElementSibling.appendChild(player);
    }
}

document.addEventListener("keydown", e => {
    const player = document.querySelector(".player");

    if (!dropCount) {
        document.getElementById("title").style.visibility = "hidden";
        document.body.style.backgroundImage = "url(elements/play2.png)";
        // player.style.backgroundImage = "url(elements/spaceship25.gif)";
        startGame();
	}


    if (score>3)
    {
        if(score<=10)
        {
            player.style.backgroundImage = "url(elements/spaceship50.gif)";
            score+=50
        }
        else if(score >5 && score<=100)
        {
            player.style.backgroundImage = "url(elements/spaceship75.gif)";
            score+=50
        }
        if(score>=200)
        {
            player.style.backgroundImage = "url(elements/spaceship100.gif)";
            score+=50
        }
        
    }

    

    if (e.key === "ArrowRight" && playerCells.includes(player.parentElement.nextElementSibling)) {
        player.parentElement.nextElementSibling.appendChild(player);
    }

    if (e.key === "ArrowLeft" && playerCells.includes(player.parentElement.previousElementSibling)) {
        player.parentElement.previousElementSibling.appendChild(player);
    }
});


function reset() {
    dropCount = 0;
	speed = 1000;
	score = 0;
	scoreDisplay.innerHTML = "0";

	cells.forEach(cell => cell.innerHTML = "");
	playerCells[3].innerHTML = '<div class="player"></div>';
}

function startGame() {
	reset();
	loop();
	myMusic = new sound("elements/playsound.wav");
	myMusic.play();
	mySound = new sound("elements/gemsound.wav");
}

function loop() {
	let stopGame = false;

	for (let i = enemyCells.length - 1; i >= 0; i--) {
        const cell = enemyCells[i];
        const nextCell = cells[i + 8];
        const enemy = cell.children[0];

        if (!enemy) {
            continue;
        }

        nextCell.appendChild(enemy);
        
     	if (playerCells.includes(nextCell)) {
        	if (nextCell.querySelector(".player")) {
                stopGame = true;
            } else {
                score++;
                // speed = Math.max(300, speed - 150);
                speed -=10;
                if (speed<150)
                    speed=150;
                scoreDisplay.innerHTML = score;
                enemy.remove();
            }
        }
	}

	//  
	
	//even drop count, add new enemy
	
	if (dropCount % 1 === 0) {
		const position = Math.floor(Math.random() * 8);
        // if (score > 60)
        // {
        //     enemyCells[position].innerHTML = '<div class="gems"></div>';
        // }
        enemyCells[position].innerHTML = '<div class="enemy"></div>';
        if (score>100)
        {
            const position = Math.floor(Math.random() * 8);
            enemyCells[position].innerHTML = '<div class="enemy"></div>';
        }
	}

	if (stopGame) {
        // const player = document.querySelector(".player");
        document.body.style.backgroundImage = "url(elements/over2.png)";
        mySound.play();
		myMusic.stop();
        newscore = score;
        if (newscore>=0)
        {
            document.getElementById("start").style.visibility = "visible";
            document.getElementById("remote").style.visibility = "hidden";
            document.getElementById("title").style.visibility = "visible";
            document.getElementById("title").innerHTML = "GAME OVER !!!" + "<br/>" + 'Your score: ' + score;
        }
        setTimeout(function(){
            document.querySelector(".player").style.backgroundImage = "url(elements/collision.gif)";
        },100);
        reset();


	} else {
		dropCount++;
		setTimeout(loop, speed); 
	}

}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}












