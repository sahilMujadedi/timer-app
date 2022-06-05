import { useState } from 'react'
import Timer from './Timer'

const Timers = () => {
  let [id, setId] = useState(0)
  let [savedTimers, setSavedTimers] = useState([
    {id: id, seconds: 5, minutes: 0, hours: 0}
  ])
  
  const addNewTimer = () => {
    id++
    setId(id)
    savedTimers.push({id: id, seconds: 5, minutes: 0, hours: 0})
    setSavedTimers(savedTimers)
  }
  return ( 
    <>
      {
        savedTimers.map((timer) => {
          return (<Timer passedSeconds={timer.seconds} passedMinutes={timer.minutes} passedHours={timer.hours} id={timer.id} key={timer.id}/>)
        })
      }
      <button onClick={addNewTimer}>New Timer</button>
    </>
  );
}
 
export default Timers;
