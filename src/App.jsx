import { useEffect, useState } from 'react'
import Box from './components/Box'

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [Xturn, seXturn] = useState(false)
  const [winner, setWinner] = useState(null)
  const [winningLine, setWinningLine] = useState([])

  useEffect(() => {
    if (calculateWinner(board)) {
      setWinner(calculateWinner(board)[0])
      setWinningLine(calculateWinner(board)[1])
    }
  }, [board])



  const boardElements = board.map((item, index) => (
    <Box
      key={index}
      value={item}
      handleClick={() => handleClick(index)}
      lineBox={winningLine ? winningLine.includes(index) : false}
      win={winner}
    />
  ))

  const handleClick = boxIndex => {
    if (board[boxIndex] || winner) return

    setBoard(prevBoard => prevBoard.map((item, index) => (
      index === boxIndex ? Xturn ? 'X' : 'O' : item
    )))

    seXturn(!Xturn)

  }

  const calculateWinner = board => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let line of lines) {
      const [a, b, c] = line
      if (board[a] && board[b]) {
        if (board[a] === board[b] && board[b] === board[c])
          return [board[a], line]
      }
    }

    if(board.every(square => square !== null)){
      return [null, null]
    }

    return null

  }

  const resetBoard = () => {
    setBoard(Array(9).fill(null))
    seXturn(false)
    setWinner(null)
    setWinningLine([])
  }

  return (
    <div className='flex justify-around items-center w-screen h-screen bg-zinc-950'>
      <div className='h-2/5 flex flex-col justify-around items-center text-white text-5xl p-1'>
        {winningLine === null 
        ?
        <h1 className='w-full text-center '>Tie</h1>
        :
        <h1 className='w-full'>{winner ? `Winner : ${winner}` : `${Xturn ? 'X' : 'O'}'s turn`}</h1>
      }
        <button onClick={resetBoard} className='hover:bg-white hover:text-black cursor-pointer transition duration-300 ease-in text-3xl px-3 py-2 rounded-lg text-white bg-black shadow-inner shadow-white/30'>
          Play Again
        </button>
      </div>
      <div className='grid grid-cols-3 gap-1 w-2/5 aspect-square bg-white p-1'>
        {boardElements}
      </div>
    </div>
  )
}

export default App
