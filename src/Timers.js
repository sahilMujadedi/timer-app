import { useState } from 'react'
import Timer from './Timer'

const Timers = () => {
  let [savedTimers, setSavedTimers] = useState([
    {id: 0, seconds: 5, minutes: 0, hours: 0}
  ])
  let [timerList, setTimerList] = useState([savedTimers.map((timer) => {
    return (<Timer passedSeconds={timer.seconds} passedMinutes={timer.minutes} passedHours={timer.hours} key={timer.id}/>)
  })])
  
  const addNewTimer = () => {
    setTimerList(timerList.concat(<Timer passedSeconds={0} passedMinutes={1} passedHours={0} key={timerList.length}/>))
  }
  return ( 
    <>
      {timerList}
      <button onClick={addNewTimer}>New Timer</button>
    </>
  );
}
 
export default Timers;