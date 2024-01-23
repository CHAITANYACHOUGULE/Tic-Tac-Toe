let boxes=document.querySelectorAll(".box");
let newbtn=document.querySelector("#new-btn");
let rstbtn=document.querySelector("#reset-btn");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");


let turnO= true; //O turn first
let count=0;
const winpattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];


const resetGame = () =>{
    turnO = true;
    count = 0;
    enableBoxes();
    msgcontainer.classList.add("hide");
};
disabledBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    } 
};
enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    } 
};



boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            turnO= false;
        }
        else{
            box.innerText = "X";
            turnO= true;
        }
        box.disabled = true;
        count++;

        let iswinner = checkWinner();
        if(count===9 && !iswinner){
            gamedraw();
        }
    });
});


const checkWinner = () => {
    for(let pattern of winpattern){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "")
        {
            if(pos1Val === pos2Val && pos2Val ===pos3Val)
            {
                showWinner(pos1Val);
                // console.log("got winner", pos1Val);
                return true;
            }
        }
    }
};



const showWinner = (winner) =>{
    msg.innerText = (`Congrats, Winner is ${winner}`);
    msgcontainer.classList.remove("hide");
    disabledBoxes();
};
const gamedraw = () =>{
    msg.innerText = `Game was draw.`;
    msgcontainer.classList.remove("hide");
    disabledBoxes();
};




newbtn.addEventListener("click", resetGame);
rstbtn.addEventListener("click", resetGame);