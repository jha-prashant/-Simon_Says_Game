let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let h2 = document.querySelectorAll("h2");

let btns = ["red","yellow","green","purple"]

document.addEventListener("keypress", function () {
    if (started == false){
        console.log("game started");
        started = true;
        levelUp ();
    }
});

function btnflash(btn){
    btn.classList.add("flash");
    setTimeout( function(){
        btn.classList.remove("flash");
    },1000);
}

function levelUp () {
    userSeq=[];
    level++;
    h2.forEach(element => {
        element.innerText = `Level ${level}`;
        // random button chose
        let randmidx = Math.floor(Math.random() * btns.length);
        let randcolor = btns[randmidx];
        let randbtn = document.querySelector(`.${randcolor}`);
        gameSeq.push(randcolor);
        console.log(gameSeq);
        btnflash(randbtn);
    });
}
let lastColor = "";
function checkans(idx){
    // console.log("cur level",level);
    //  idx = userSeq.length -1;
    if(userSeq[idx] === gameSeq[idx]){
        if (userSeq.length === gameSeq.length){
            userSeq=[];
            setTimeout(levelUp,1000);
        }
    }
    else{
        h2.forEach(element => {
        element.innerHTML = `game over !your score was <b>${level}<b> <br> press any key to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout( function() {
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
     });
     started = false;
     gameSeq=[];
     level=0;
     userSeq=[];
    }
    // lastColor=userSeq[idx];
}
function Btnpress() {
    // console.log(this);
    
    let btn = this;
    btnflash(btn);

    let usercolor = btn.getAttribute("id")
    // console.log(usercolor);
    userSeq.push(usercolor);
    checkans(userSeq.length-1)
    
}
let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns ){
    btn.addEventListener("click",Btnpress)
}
function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}
