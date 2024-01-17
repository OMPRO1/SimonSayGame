let gameSeq = [];
let userSeq = [];

let level = 0;
let started = false;

let btns = ["red","yellow","blue","purple"];

let h2 = document.querySelector('h3')

document.addEventListener('keypress', function(){
    if(started == false){
        console.log("game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add('userflash');
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let rndIdx = Math.floor(Math.random()*3);
    let rndColor = btns[rndIdx];
    let rndBtn = document.querySelector(`.${rndColor}`);
    gameSeq.push(rndColor);
    console.log(gameSeq);
    gameFlash(rndBtn);
}

function checkAns(idx){

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{

        h2.innerHTML = `GAME OVER! your score was <b>${level}</b> <br>press any key to start again`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = 'white';
        },150);
        high();
        reset();
    }

}

function btnPress(){
    userFlash(this);
    let btn = this;
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener('click',btnPress);
}

function reset() {
    level =0;
    started = false;
    gameSeq = [];
    userSeq = [];

}

function high() {
    let highScr;
    if(level>highScr){
        highScr = level;
    }
    let a = document.createElement('h2');
    a.innerHTML = `Your Highest Score is : <b>${highScr}</b>`;
    h2.append(a);
}