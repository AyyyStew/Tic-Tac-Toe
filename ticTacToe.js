const gameboard = function (){
    let spaces = new Array(9)
    const placePiece = (symbol, space) =>{
        spaces[space] = symbol
    }
    const log = ()=>{
        console.log({spaces})
    }

    return {placePiece, log}
}()

const player = function(name, symbol){
    return {name, symbol}
}

const gamePlay = function(){
    let symbol = "x"
    for (let x of document.getElementsByClassName("space")){
        x.addEventListener("click", ()=>{
            x.innerHTML = symbol
        })
    }
}()


