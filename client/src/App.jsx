import React, { useEffect, useState } from 'react'
import './App.css'
import { io } from 'socket.io-client'
import Input from './Components/Input'
const App = () => {

  const [score,setScore]=useState({})

  const [allScores,setAllScores]=useState([])

  const socket=io("localhost:3000")


  function connectSocket(){
    socket.on("connection",(socket)=>{
      console.log(socket)
      
    })
    socket.on("scores_array", (scores_array) => {
      console.log(scores_array);
    });
  }

  function handleInputEvent(e){
    let {name,value}=e.target;

    let currentObj={[name]:value}

    setScore((prev)=>(
      {...prev,...currentObj}
    ));

  }

  function sendScores(){
    socket.emit('scores', score);
    socket.on("scores_array", (scores_array) => {
      setAllScores(scores_array);
    });
  }

  // console.log(score)

  useEffect(()=>{
    connectSocket();
  })


  return (
    <div>
      <h1>React Multiplayer Dashboard</h1>
      <Input
        placeholder={`Enter your name`}
        handleInputEvent={handleInputEvent}
        name={'name'}
      />
      
      <Input
        placeholder={`Enter your score`}
        handleInputEvent={handleInputEvent}
        name={'score'}
      />

      <button onClick={sendScores} className='send-scores'>Send</button>

      {
        allScores.map((score)=>(
          <div key={score.id}>
            <p>Name: {score.name}</p>
            <p>Score: {score.score}</p>
          </div>
        ))
      }
    </div>
  );
}

export default App