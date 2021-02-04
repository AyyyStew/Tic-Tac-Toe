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


        const checkDiagnols = () => {
            //this fuction makes me very sad. 

            //checking top left to bottom right diagnols "\" shaped"

            //parse into rows
            let rowArray = []
            let rowStart = 0
            for (let i=0; i<rowSize; i++){
                let row = spaces.slice(rowStart, rowStart+rowSize)
                rowStart += rowSize //get the start of the next row
                rowArray.push(row)
            }
            // console.log(rowArray)


            //go through diagnols spawned from top row
            for (let columnPointer=0; columnPointer<rowArray[0].length; columnPointer++){
                let symbolsInDiagnol = 0
                for (let rowPointer=0; rowPointer<rowArray.length; rowPointer++){
                    let currentCell = rowArray[rowPointer][rowPointer+columnPointer]
                    if (currentCell === symbol){
                        symbolsInDiagnol++
                    }else{
                        symbolsInDiagnol = 0
                    }
                
                    if (symbolsInDiagnol >= numberForWin){
                        return true
                    }
                }
            }

            //go through diagnols spawned by first column
            for (let rowPointer=1; rowPointer<rowArray.length; rowPointer++){
                // console.log(rowArray[rowPointer])
                let symbolsInDiagnol = 0;
                for (let columnPointer=0; columnPointer<rowArray[0].length; columnPointer++){
                    let currentRow = rowArray[rowPointer + columnPointer]
                    
                    if (currentRow === undefined){
                        columnPointer = Infinity
                    } else{
                        let currentCell = currentRow[columnPointer]

                        if (currentCell === symbol){
                            symbolsInDiagnol++
                        }else{
                            symbolsInDiagnol = 0
                        }
                    
                        if (symbolsInDiagnol >= numberForWin){
                            return true
                        }
                    }
                    
                }
            }

            //checking anti diagnols ie from bottom left to top right '/' shaped
            //go through anti diagnols spawned from the first column
            for (let columnPointer = 0; columnPointer<rowArray.length; columnPointer++){
                let symbolsInDiagnol = 0
                for(let rowPointer = rowArray.length -1; rowPointer>=0; rowPointer--){
                    let currentCell = rowArray[rowPointer][columnPointer - rowPointer]
                    // console.log(currentCell)
                    if (currentCell === symbol){
                        symbolsInDiagnol++
                    }else{
                        symbolsInDiagnol = 0
                    }
                
                    if (symbolsInDiagnol >= numberForWin){
                        return true
                    }
                }
            }


            //i don't even know anymore
            let x = 0
            for (let columnPointer = rowArray.length-1; columnPointer>=0; columnPointer--){
                let symbolsInDiagnol = 0
                for(let rowPointer = 0; rowPointer<rowArray.length; rowPointer++){
                    let y = rowArray.length - rowPointer + x
                    let currentCell = rowArray[rowPointer][y]
                    // console.log({rowPointer, y, currentCell})

                    if (currentCell === symbol){
                        symbolsInDiagnol++;
                    }else{
                        symbolsInDiagnol= 0;
                    }

                    if (symbolsInDiagnol >= numberForWin){
                        return true
                    }

                }
                // console.log()
                x++
            }

            return undefined
        }

        let rowArray = []
        let rowStart = 0
        for (let i=0; i<rowSize; i++){
            let row = spaces.slice(rowStart, rowStart+rowSize)
            rowStart += rowSize //get the start of the next row
            rowArray.push(row)
        }

        console.log(rowArray)
        if (checkRows() || checkColumns() || checkDiagnols()){
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

        console.log({space, play})
        if(gameboard.checkForWinner(currentPlayer.symbol)){
            console.log("game should have ended")
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
