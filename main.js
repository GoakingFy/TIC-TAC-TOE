const cells = document.querySelectorAll(".cell")
let winner = undefined
const PLAYERS = {
    X: "X",
    O:"O"
}

const TABLE = ["","","","","","","","",""]
const COMB_WIN = [ 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

]



const INITIAL_PLAYER = PLAYERS.X;
let current_player = INITIAL_PLAYER;

cells.forEach(cell => {
    
    
    cell.addEventListener("click" , (e)=>{

        if(cell.innerHTML =="" && winner == undefined){
            
            let cell_content = e.target;
            let cell_id = cell_content.getAttribute("data-cell")

            cell_content.innerHTML = current_player;
            TABLE[cell_id - 1] = current_player;
           
            
            change_player(PLAYERS)
            setWinner(COMB_WIN)

        }
       
        
    })
});


const  change_player = (players) => current_player == players.X ? current_player = players.O : current_player = players.X


function setWinner(COMB_WIN){
    
    for (let i = 0; i < COMB_WIN.length; i++) {
      
       if(TABLE[COMB_WIN[i][0]] == "X" && TABLE[COMB_WIN[i][1]] == "X" && TABLE[COMB_WIN[i][2]] == "X"){
           winner = PLAYERS.X
           console.log("Ha ganado X")
       } 
       
       if(TABLE[COMB_WIN[i][0]] == "O" && TABLE[COMB_WIN[i][1]] == "O" && TABLE[COMB_WIN[i][2]] == "O"){
           winner = PLAYERS.O
           console.log("Ha ganado O")
       }

   
        
    }

    !TABLE.includes("") ? winner = "tie" : null
    

    
}


function resetGame(){
    TABLE = ["","","","","","","","",""]
    current_player = INITIAL_PLAYER;
}

