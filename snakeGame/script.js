const board = document.querySelector(".board");
let inputDir = {x: 0, y: 0};
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
const foodSound = new Audio('music/food.mp3');
const speed = 5;
let highScoreBox = document.querySelector("#highScore-box");
let lastPaintTime = 0;
let score = 0;
let highScoreVal;
let snakeArr = [
    {x: 13, y:15}
];
let food = {x:6, y:7};

let scoreDiv = document.querySelector("#score-box");
let highScore = localStorage.getItem("highScore");
if(highScore === null){
    highScoreVal = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreVal));
}else{
    highScoreVal = JSON.parse(highScore);
    highScoreBox.innerHTML = "High Score: " + highScoreVal;
}
musicSound.play();

//Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //if snake bumped into wall
        if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
            return true;
        }
    
    return false;
}

function gameEngine(){
    //part 1: updating the snake variable and food

    //if the snake is collided
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game over! Press any key to play again");
        snakeArr = [
            {x: 13, y:15}
        ];
        musicSound.play();
        score = 0;
        scoreDiv.innerHTML = "Score: " + score;
    }

    //if you have eaten the food, increment the score and regenrate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score+=1;
        if (score > highScoreVal) {
            highScoreVal = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreVal));
            highScoreBox.innerHTML = "High Score: " + highScoreVal;
        }
        scoreDiv.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b -a) * Math.random()), y: Math.round(a + (b-a) * Math.random())};

        // Ensure food doesn't spawn on the snake
        snakeArr.forEach(part => {
            if (part.x === food.x && part.y === food.y) {
                food = {x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())};
            }
        });
    }

    //moving the snake
    for(let i = snakeArr.length - 2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part 2: display the snake and food
    //display snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x:0, y:1};
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("Arrow Up");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        
        case "ArrowDown":
            console.log("Arrow Down");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("Arrow Left");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("Arrow Right");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});