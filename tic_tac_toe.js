let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector(".resetBtn");
let newBtn=document.querySelector(".newBtn");
let mesCon=document.querySelector(".mesgContainer");
let mesg=document.querySelector(".winner");

let turn0=true;
let count=0;

const winPetterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const reset=()=>{
    turn0=true;
    count=0;
    enableBoxes();
    mesCon.classList.add("mesgContainer");
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        // console.log("box was clocked");
        if(turn0){
            box.style.color="rgb(133, 40, 40)";
            box.innerText="O";
            turn0=false;
        }
        else{
            box.style.color="rgb(31, 31, 114)";
            box.innerText="X";
            turn0=true;
        }
        
        box.disabled=true;//After click that box is disable
        count++;
        let isWinner= checkWinner();

        if(count===9 && !isWinner){
            draw();
        }
    });
});

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const showWinner=(winner_name)=>{
    mesCon.classList.remove("mesgContainer"); //Passes id 
    mesg.innerText=`Congratulation ! Winner is ${winner_name}`;
    disableBoxes();
}   

const draw=()=>{
    mesg.innerText=`Match Draw ! Start Again`;
    mesCon.classList.remove("mesgContainer"); 
    disableBoxes();
}

const checkWinner=()=>{
    for(let pattern of winPetterns){
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(
        // boxes[pattern[0]].innerText,
        // boxes[pattern[1]].innerText,
        // boxes[pattern[2]].innerText);
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;


        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

resetBtn.addEventListener("click",reset);
newBtn.addEventListener("click",reset);
