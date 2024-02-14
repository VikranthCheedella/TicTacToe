let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let msgTurn=document.querySelector("#turn");
let container = document.querySelector(".container");
let GameName = document.querySelector(".name");

let turn;
let count=0;
const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
function playerTurn(){
    const randomNumber=Math.random();
    if(randomNumber>=0&&randomNumber<1/2){
        turn = "O";
    }
    else{
        turn = "X";
    }
}

playerTurn();
msgTurn.innerText=`Player ${turn} turn`;
boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if(turn === "O"){
            box.innerText="O";
            turn = "X";
        }
        else{
            box.innerText = "X";
            turn = "O";
        }
        count++;
        box.disabled=true;
        checkWinner();
        msgTurn.innerText=`Player ${turn} turn`;
    });
});

const showWinner=(winner) =>{
    if (winner==="Draw") msg.innerText="It's a TIE!";
    else msg.innerText=`Congratulations , Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    count=0;
};

resetBtn.addEventListener("click" , ()=>{
    boxes.forEach((box)=>{
        box.innerText="";
        box.disabled=false;
    });
    playerTurn();
    msgContainer.classList.add("hide");
    msgTurn.classList.remove("hide");
    count=0;
});

newBtn.addEventListener("click" , ()=>{
    boxes.forEach((box)=>{
        box.innerText="";
        box.disabled=false;
    });
    playerTurn();
    msgContainer.classList.add("hide");
    msgTurn.classList.remove("hide");
    resetBtn.classList.remove("hide");
    container.classList.remove("hide");
    GameName.classList.remove("hide"); 
    count=0;
});

function checkWinner(){
    for(let pattern of winPatterns){
        let posval1=boxes[pattern[0]].innerText;
        let posval2=boxes[pattern[1]].innerText;
        let posval3=boxes[pattern[2]].innerText;
        if(posval1!="" && posval2!="" && posval3!=""){
            if(posval1 === posval2 && posval2 === posval3){
                showWinner(posval1);
                boxes.forEach((box)=>{
                     box.disabled=true;
                });
                msgTurn.classList.add("hide");
                resetBtn.classList.add("hide");
                container.classList.add("hide");
                GameName.classList.add("hide");
            }
        }
    }
    if(count===9){
        msgTurn.classList.add("hide");
        resetBtn.classList.add("hide");
        container.classList.add("hide");
        GameName.classList.add("hide");
        showWinner("Draw");
    }
}