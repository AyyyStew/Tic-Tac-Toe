
//checking top left to bottom right diagnols
const checkDiagnols = () => {
    //when in doubt brute force it

    // //go through every space
    // for (let cell in spaces){
    //     let symbolsInDiagnol = 0;
    //     let x = []
    //     for(let j = Number(cell); j<spaces.length; j += (rowSize+1)){
    //         x.push(j)
    //     }
    //     console.log(x)

    // }


    //parse into rows
    let rowArray = []
    let rowStart = 0
    for (let i=0; i<rowSize; i++){
        let row = spaces.slice(rowStart, rowStart+rowSize)
        rowStart += rowSize //get the start of the next row
        rowArray.push(row)
    }
    console.log(rowArray)


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
        for (let columnPointer=0; columnPointer<rowArray[0].length; columnPointer++){
            let currentRow = rowArray[rowPointer + columnPointer]
            if (currentRow === undefined){
                columnPointer = Infinity
            } else{
                let currentCell = currentRow[columnPointer]
                console.log(currentCell)
            }
            
        }
    }

}

// spaces = [
//     1,0,1,
//     0,1,0,
//     0,0,1,
// ]

// spaces = [
//     1,1,1,1,0,
//     0,0,0,1,0,
//     0,0,0,0,0,
//     0,0,0,0,0,
//     0,0,0,0,0,
// ]

// spaces = [
//     0,1,2,
//     3,4,5,
//     6,7,8,
// ]

spaces = [...Array(25).keys()]


let rowSize = Math.sqrt(spaces.length)
let numberForWin = 3
let symbol = 1
// console.log(spaces)
let x = checkDiagnols()

console.log(x)