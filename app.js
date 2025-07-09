let gameSeq = [];
let userSeq = [];

let btns = ["red", "green", "blue", "pink"];

let started = false;
let level = 0;
let highestScore = 0;

let h3 = document.querySelector("h3");
let highScore = document.querySelector("#high-score");
document.addEventListener("keypress", function() {
    if (!started) {
        started = true;
        highScore.innerText = "";
        levelUp();
    }
});

function levelUp() {
    level++;
    h3.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    gameSeq.push(btns[randIdx]);
    let randBtn = document.querySelector(`.${btns[randIdx]}`);
    flashBtn(randBtn);
}

function flashBtn(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 200);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function btnPress() {
    if (started) {
        flashBtn(this);
        userSeq.push(this.classList[1]);
        matchSeq();
    }
}

let body = document.querySelector("body");
function matchSeq() {
    let idx = userSeq.length - 1;
    if (userSeq[idx] === gameSeq[idx]) {
        if (idx == gameSeq.length - 1) {
            userSeq = [];
            setTimeout(levelUp, 500);
        }
    } else {
        highestScore = Math.max(highestScore, level);
        body.classList.add("flash-red");
        setTimeout(function() {
            body.classList.remove("flash-red");
        }, 100);
        h3.innerText = `Game Over! Your score was ${level}.\n Press any key to restart the game.`;
        highScore.innerText = `Highest Score: ${highestScore}`;
        resetGame();
    }
}

function resetGame() {
    level = 0;
    gameSeq = [];
    userSeq = [];
    started = false;
}