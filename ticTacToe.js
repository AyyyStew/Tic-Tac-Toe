const gameView = function(){
    //arguably unecessary sort
    const spaces = Array.from(document.getElementsByClassName("space")).sort((a, b) => a.dataset.index - b.dataset.index)
    const gameStatus = document.getElementsByClassName("gameStatus")[0]

    const initializeBoard = () =>{
        for (let space of spaces){
            space.innerHTML = ""

            space.addEventListener("click", ()=>{
                let symbol = gamePlay.playTurn(space.dataset.index)
                console.log(symbol)
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

    //accept player object or draw
    const gameOver = (result) =>{
        if (result === "Draw") {
            setGameStatus(result) 
        } else{
            setGameStatus(`${result.name} won! representing ${result.symbol}`)
        }

    }

    return {
        initializeBoard,
        setGameStatus,
        gameOver,
    }    
}()

const gameboard = function (){
    const rowSize = 3
    const numberForWin = 3
    let spaces = new Array(rowSize**2)

    const placePiece = (symbol, space) =>{
        if (spaces[space] !== undefined){
            return undefined
        } else {
            spaces[space] = symbol
            return symbol
        }
    }

    const checkForWinner = (symbol) =>{
        const checkColumns = () => {
            //this loop goes through the indices of the first row
            for (let i=0; i<rowSize; i++){
                let symbolsInColumn = 0 //variable to 
                for (let j=0; j<rowSize; j++){
                    //this loop calculates the index of thhe next item in the column
                    //by adding the coulmn's start index i with a multiple (j) of the row size
                    let played_symbol = spaces[(i + j*rowSize)]
                    
                    if (played_symbol === symbol){
                        //if the symbol in the current space is the symbol we are looking for,
                        //increment the counter
                        symbolsInColumn++
                    }else{
                        //else set the count to 0
                        symbolsInColumn = 0
                    }
        
                    if (symbolsInColumn >= numberForWin){
                        return true
                    }
                }
        
            }
        
            return false
        }

        const checkRows = () => {
            //parse the array into rows
            let rowStart = 0
            for (let i=0; i<rowSize; i++){
                let row = spaces.slice(rowStart, rowStart+rowSize)
                rowStart += rowSize //get the start of the next row
        
                //count ouccrences of a symble in a row
                //probably could use a higher order funciton
                let symbolCounter = 0
                for (let cell of row){
                    if (cell === symbol){
                        symbolCounter++
                    } else{
                        symbolCounter=0
                    }
        
                    if(symbolCounter >= numberForWin){
                        return true
                    }
                }
        
            }
            return false
        }


        //check win conditions if there is one, return true
        console.log(checkRows())
        console.log(checkColumns())
        if (checkRows() || checkColumns()){
            return true
        } else{
            return false
        }

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

        if(gameboard.checkForWinner(currentPlayer.symbol)){
            gameView.gameOver(currentPlayer)
            return currentPlayer.symbol
        }

        //change current player
        if (currentPlayer === player1){
            currentPlayer = player2
        } else{
            currentPlayer = player1
        }
        
        return play
    }

    return {startGame, playTurn}
}()

gamePlay.startGame()
