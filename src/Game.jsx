import { useState } from "react"

const Game = () => {
  const [turn, setTurn] = useState(true)
  const [showTurn, setShowTurn] = useState("O")
  const [boxes, setBoxes] = useState(Array(9).fill(""))
  const [gotWinner, setGotWinner] = useState(false)
  const [winner,setWinner] = useState('')
  // State to store the selected box indexes for O and X
  const [arrO, setArrO] = useState(Array(3).fill(""))
  const [arrX, setArrX] = useState(Array(3).fill(""))
  
  // win combinations
  const winCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [1,4,7],
    [0,3,6],
    [2,5,8]
  ]

  const handleClick = (index) =>{
    if(!gotWinner && boxes[index] === ""){
      const newBoxes = [...boxes]
      const newArrO = [...arrO]
      const newArrX = [...arrX]

      
      if(turn){
        newArrO.shift()
        newArrO.push(index)
        setShowTurn("X")
      }else{
        newArrX.shift()
        newArrX.push(index)
        setShowTurn("O")
      }
      console.log('hola')
      
      for(let i=0;i<9;i++){
        if(newArrO.includes(i)){
          newBoxes[i] = 'O'
        }else if(newArrX.includes(i)){
          newBoxes[i] = 'X'
        }else{
          newBoxes[i] = ''
        }
      }

      const checkWinner = (playerArr) => {
        // Sort player's array for comparison
        const sortedPlayerArr = [...playerArr].sort((a, b) => a - b);
        return winCombo.some(combo => {
          const sortedCombo = [...combo].sort((a, b) => a - b); // Sort winCombo array
          return sortedCombo.every(index => sortedPlayerArr.includes(index));
        });
      };

      const winnerO = checkWinner(newArrO)
      const winnerX = checkWinner(newArrX)

      if(winnerO){
        setGotWinner(true)
        setWinner("Player O wins")
      }else if(winnerX){
        setGotWinner(true)
        setWinner("Player X wins")
      }

      setBoxes(newBoxes)
      setTurn(!turn)
      setArrO(newArrO)
      setArrX(newArrX)

    }
  }

  const handleReset = () =>{
    setBoxes(Array(9).fill(""))
    setArrO(Array(3).fill(""))
    setArrX(Array(3).fill(""))
    setShowTurn('O')
    setTurn(true)
    setGotWinner(false)
    setWinner('')
    
  }


  return (
    <div  className="w-[23.5rem] h-[40rem] text-white font-ubuntu select-none">
      <div className="rounded-xl w-[24rem] h-[23rem] bg-black text-black">
        <div className="grid grid-cols-3"> {/* Grid with 3 columns */}
          {
            boxes.map((value, index) => (
              <div key={index} className="px-3 pt-3">
                <div key={index} onClick={() => handleClick(index)} className="rounded-lg w-[6.6rem] h-[6.6rem] bg-white cursor-pointer hover:bg-[#BABABA] transition-colors ease-in-out flex justify-center text-8xl">
                  {value}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    
      <div className="mt-3 text-2xl text-green-500 font-semibold">
        {winner}
      </div>

      <div className="flex justify-between text-xl mt-5">
        <div>Next turn: {showTurn}</div>
        <div onClick={()=>handleReset()} className="bg-white text-black rounded-lg px-4 cursor-pointer hover:bg-black hover:text-white transition-colors ease-in-out">
          RESET
        </div>
      </div>

    </div>
  );  
  
}

export default Game
