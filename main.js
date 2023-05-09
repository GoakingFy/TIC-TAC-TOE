const cells = document.querySelectorAll(".cell")
const x_turn = document.querySelector(".container-player-x-turn");
const o_turn = document.querySelector(".container-player-o-turn");
const modal = document.querySelector(".container-modal")
const btnReset = document.querySelector(".btn-resetGame")
const last10W = document.querySelector(".last-10-win")
let seg = 0
let min = 0
let timer = document.querySelector(".timer");



let winner = undefined
const PLAYERS = {
    X: "X",
    O:"O"
}

let historyWin = []

console.log(historyWin)

let TABLE = ["","","","","","","","",""]
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

timerGame()

cells.forEach(cell => {
    
    
    cell.addEventListener("click" , (e)=>{

        if(cell.innerHTML =="" && winner == undefined){
            
            let cell_content = e.target;
            let cell_id = cell_content.getAttribute("data-cell")
          
            x_turn.classList.toggle('select-turn')
            o_turn.classList.toggle('select-turn')
           
            TABLE[cell_id - 1] = current_player;
            cell_content.innerHTML = TABLE[cell_id - 1];
            cell.classList.toggle(TABLE[cell_id - 1]);
           
            console.log(TABLE)
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
           displayModal(winner)
           addHistoryWinner()
           

           
       } 
       
       if(TABLE[COMB_WIN[i][0]] == "O" && TABLE[COMB_WIN[i][1]] == "O" && TABLE[COMB_WIN[i][2]] == "O"){
           winner = PLAYERS.O
           console.log("Ha ganado O")
           displayModal(winner)
           addHistoryWinner()
       }

   
        
    }

    !TABLE.includes("") ? winner = "tie" : null
    

    
}

btnReset.addEventListener("click" , ()=>{
    modal.style.display = "none"
    resetGame()
})

function resetGame(){
    
    cells.forEach((cell)=>{
        let cell_id = cell.getAttribute("data-cell")
        console.log(cell_id)
        cell.innerHTML = ''
        if(TABLE[cell_id -1]!= ""){
            cell.classList.remove(TABLE[cell_id -1] );
        }
       
    })
    TABLE = ["","","","","","","","",""]
    current_player = INITIAL_PLAYER;
    
    winner = undefined
    x_turn.classList.add('select-turn')
    o_turn.classList.remove('select-turn')
    min = 0
    seg = 0
    console.log(historyWin)
    loadHistoryWinner(historyWin)

}


function displayModal(winner){
    const infoWinner = document.querySelector(".info-winner")
    infoWinner.innerHTML = `Ha ganado el jugador ${winner}`

  modal.style.display = "flex"  
    

}

function timerGame() {
   
    
      
        setInterval(()=>{
          seg++

            if(seg == 60){
            seg = 0
            min++
          }
          
          timer.innerHTML = `${min}:${seg}`
          
        
        
        },1000)
       

}

function addHistoryWinner(){
    let infoGame = {
        winner,
        time: timer.innerHTML
    }

    historyWin.push(infoGame)
}

function loadHistoryWinner(arr){
    last10W.innerHTML = ``
    arr.forEach( record =>{
        console.log(record.winner)
        let newElement =  document.createElement("p")
        newElement.textContent = record.winner
        newElement.classList.add(record.winner)
        last10W.appendChild(newElement)
    } )
}

