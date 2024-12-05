let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let game = document.querySelector(".myGame");

let turnO = true; //playerX, playerY

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O"
            turnO = false;
            box.style.backgroundColor = "yellow"
        }else{
            box.innerText = "X";
            turnO = true;
            box.style.backgroundColor = "red"
        }
        box.disabled = true;
        checkWinner();
    });
});

const showWinner = (winner) => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgContainer.classList.remove("hide");
        disableBoxes();
        game.classList.add("hide");
};

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    game.classList.remove("hide");
    for (let box of boxes) {
        box.style.backgroundColor = "beige";
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }
        }
    }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);