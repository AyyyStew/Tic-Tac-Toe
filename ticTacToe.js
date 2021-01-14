const gameView = function(){
    //arguably unecessary sort
    const spaces = Array.from(document.getElementsByClassName("space")).sort((a, b) => a.dataset.index - b.dataset.index)
    const gameStatus = document.getElementsByClassName("gameStatus")[0]

    const initializeBoard = () =>{
        for (let space of spaces){
            space.innerHTML = ""

            space.addEventListener("click", ()=>{
                console.log(space)
                let symbol = gamePlay.playTurn(space.dataset.index)
                if (symbol !== undefined){
                    space.innerHTML = symbol
                } else{
                    setGameStatus("Space Already Occupied")
                }
            })
        }

    }

    const setGameStatus = (msg) => {
        gameStatus.innerHTML = msg
    }


    return {
        initializeBoard,
        setGameStatus,
        // gameOver,
        // setPlayer,
    }    
}()

const gameboard = function (){
    let spaces = new Array(9)
    const placePiece = (symbol, space) =>{
        if (spaces[space] !== undefined){
            return undefined
        } else {
            spaces[space] = symbol
            return symbol
        }
    }

    const checkForWinner = (symbol) =>{
        return
    }

    const log = ()=>{
        console.log({spaces})
    }

    return {placePiece, log, checkForWinner}
}()

const player = function(name, symbol){
    return {name, symbol}
}

const gamePlay = function(){
    //TODO custom set players
    let player1 = player("bob", "x")
    let player2 = player("alice", "o")
    let currentPlayer = player2
    
    let turnCounter = 0;
    const startGame = ()=>{
        gameView.initializeBoard()
    }

    const playTurn = (space)=>{
        //if the game exceeds 9 turns the game is over
        //since there is only nice spaces to play on
        if (turnCounter > 8){
            gameView.gameOver("Draw")
        }

        let play = gameboard.placePiece(currentPlayer.symbol, space) 
        //if we get undefined as a return it means the space was already occupied
        //so end the play here
        if (play === undefined){ return undefined}

        if(gameboard.checkForWinner()){
            gameView.gameOver(currentPlayer)
            return
        }

        //change current player
        if (currentPlayer === player1){
            currentPlayer = player2
        } else{
            currentPlayer = player1
        }
        



        // console.log(currentPlayer)
        return play
    }

    return {startGame, playTurn}
}()

gamePlay.startGame()
