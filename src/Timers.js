import { useState } from 'react'
import Timer from './Timer'

const Timers = () => {

  // TODO: don't forget to also save ID into local storage and grab from local storage.
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
  const deleteTimer = (id) => {
    // for some reason page does not re-render unless .slice() is used
    savedTimers = savedTimers.slice()
    for (let i = 0; i < savedTimers.length; i++) {
      if (savedTimers[i].id === id) {
        savedTimers.splice(i, 1)
        break
      }
    }
    setSavedTimers(savedTimers)
  }

  const timerChangeHandler = (id, sec, min, hr) => {
    for (let i = 0; i < savedTimers.length; i++) {
      if (savedTimers[i].id === id) {
        savedTimers[i].seconds = sec
        savedTimers[i].minutes = min
        savedTimers[i].hours = hr
        break
      }
    }
    setSavedTimers(savedTimers)
  }

  return ( 
    <>
      {
        savedTimers.map((timer) => {
          return (<Timer passedSeconds={timer.seconds} passedMinutes={timer.minutes} passedHours={timer.hours} deleteTimer={deleteTimer} timerChangeHandler={timerChangeHandler} id={timer.id} key={timer.id}/>)
        })
      }
      <button onClick={addNewTimer}>New Timer</button>
    </>
  );
}
 
export default Timers;
