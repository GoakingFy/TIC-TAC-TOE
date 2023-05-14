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

!JSON.parse(localStorage.getItem("recordLastWin")) ? localStorage.setItem("recordLastWin" , JSON.stringify([])) : null;

let recordLocalStorage = JSON.parse(localStorage.getItem("recordLastWin"))

loadRecordWinner(recordLocalStorage)


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

setInterval(timerGame , 1000)

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
          
           displayModal(winner)
           addRecordWinner(recordLocalStorage)
        
           
       } 
       
       if(TABLE[COMB_WIN[i][0]] == "O" && TABLE[COMB_WIN[i][1]] == "O" && TABLE[COMB_WIN[i][2]] == "O"){
           winner = PLAYERS.O
          
           displayModal(winner)
           addRecordWinner(recordLocalStorage)
       }
        
    }

    if(!TABLE.includes("")){
        winner = "tie"
        displayModal(winner)
    }

     
    
    
}

btnReset.addEventListener("click" , ()=>{
    modal.style.display = "none"
    resetGame()
  
})

function resetGame(){
    
    cells.forEach((cell)=>{
        let cell_id = cell.getAttribute("data-cell")
        
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
    
    loadRecordWinner(recordLocalStorage)

}


function displayModal(winner){
    const infoWinner = document.querySelector(".info-winner")
    winner != "tie" ? infoWinner.innerHTML = `Ha ganado el jugador ${winner}` : infoWinner.innerHTML = `Ningún jugador ha ganado` 

    modal.style.display = "flex"  
    

}

function timerGame() {
        seg++;
        const min = Math.floor(seg / 60);
        const segundosRestantes = seg % 60;
        const cadena = `${min.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
        timer.textContent = cadena;
}

function addRecordWinner(arrRecord){
    let infoGame = {
        winner,
        time: timer.innerHTML
    }

    arrRecord.push(infoGame)
    localStorage.setItem("recordLastWin" , JSON.stringify(arrRecord));
}

function loadRecordWinner(arr){
    last10W.innerHTML = ``
    if(arr != null){
        arr.forEach( record =>{
           
            let newElement =  document.createElement("p")
            newElement.textContent = record.winner
            newElement.classList.add(record.winner)
            newElement.setAttribute('time' , record.time)
            last10W.appendChild(newElement)
        } )
    }
   
}

