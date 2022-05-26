import React, {useState} from 'react'
import Confetti from 'react-confetti'
import 'animate.css'
 const TicTacToe = () => {
    const [turn, setTurn] = useState('X')
    const [cells, setCells] = useState(Array(9).fill(''))
    const [winner, setWinner] = useState()



    const handleClick = (id)=>{
        if(winner){
            alert("Game over")
            return
        }
        if(cells[id]!==''){
            alert("Already clicked")
            return
        }
        let squares = [...cells]
        if(turn ==='X'){
            squares[id]='X'
            setTurn('O')
        }else{
            squares[id]='O'
            setTurn('X')
        }
        checkForWinner(squares)
        setCells(squares)
    }


    const checkForWinner = squares =>{
        let combos = {
            across:[
                [0,1,2],
                [3,4,5],
                [6,7,8]
            ],
            down:[
                [0,3,6],
                [1,4,7],
                [2,5,8]
            ],
            diagonal:[
                [0,4,8],
                [2,4,6]
            ]
        }
        for(let combo in combos){
            combos[combo].forEach(pattern=>{
                if(
                    squares[pattern[0]] === ''||
                    squares[pattern[1]] === ''||
                    squares[pattern[2]] === ''
                ){
                    // do nothing
                    
                }else if(
                    squares[pattern[0]] === squares[pattern[1]]&&
                    squares[pattern[1]] === squares[pattern[2]]
                ){
                    setWinner(squares[pattern[0]])
                }else if(squares.every(item=> item !== "")){
                    setWinner("Draw")
                }
            })
        }
    }


   


     const Cell = ({id})=>{
         return <td  onClick={()=>handleClick(id)}><p className='animate__animated animate__tada'>{cells[id]}</p></td>
     }

 const handleRestart = ()=>{
     setWinner(null)
     setCells(Array(9).fill(""))
 }

  return (
    <div>
        {(winner ==="X" ||winner ==="O") && <Confetti/>}
           {!winner ? <p>Turn: {turn}</p>:<h3 className='animate__animated animate__heartBeat game-over'>Game over Congratulations {winner}</h3>}
        <table>
        <tbody>
        <tr>
                <Cell id={0}/>
                <Cell id={1}/>
                <Cell id={2}/>
        </tr>
        <tr>
                <Cell id={3}/>
                <Cell id={4}/>
                <Cell id={5}/>
        </tr>
        <tr>
                <Cell id={6}/>
                <Cell id={7}/>
                <Cell id={8}/>
        </tr>
       </tbody>
        
        </table>
        {winner && 
        <>
        <p className='animate__animated animate__bounceIn'>Winner {winner}</p>
        <button onClick={()=>handleRestart()} className="animate__animated animate__lightSpeedInRight">Play New</button>
        </>
        }
    </div>
  )
}
export default TicTacToe
