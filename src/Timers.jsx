import { useState, useLayoutEffect } from 'react'
import Timer from './Timer'
import {FaPlus} from 'react-icons/fa'
import './styles/Timers.css'

const Timers = () => {

  let [id, setId] = useState(0)
  let [savedTimers, setSavedTimers] = useState([])

  const saveTimers = () => {
    localStorage.setItem("localStoredTimers", JSON.stringify(savedTimers))
  }
  const loadTimers = () => {
    if (localStorage.getItem("localStoredTimers") && 
        JSON.parse(localStorage.getItem("localStoredTimers")).length > 0) {
      savedTimers = JSON.parse(localStorage.getItem("localStoredTimers"))
    } else {
      savedTimers = [
        {id: 0, seconds: 0, minutes: 1, hours: 0, timerName: ""}
      ]
    }

    setSavedTimers(savedTimers)

    id = savedTimers[savedTimers.length-1].id
    setId(id)
  }
  
  const addNewTimer = () => {
    id++
    setId(id)
    savedTimers.push({id: id, seconds: 0, minutes: 1, hours: 0, timerName: ""})
    setSavedTimers(savedTimers)
    saveTimers()
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
    saveTimers()
  }

  const timerChangeHandler = (id, sec, min, hr, timerName) => {
    if (sec > 59) {
      sec = 59
    }
    if (min > 59) {
      min = 59
    }
    for (let i = 0; i < savedTimers.length; i++) {
      if (savedTimers[i].id === id) {
        savedTimers[i].seconds = sec
        savedTimers[i].minutes = min
        savedTimers[i].hours = hr
        savedTimers[i].timerName = timerName
        break
      }
    }
    setSavedTimers(savedTimers)
    saveTimers()
  }

  useLayoutEffect(() => {
    loadTimers()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ( 
    <div className="tiles">
      
        {
          savedTimers.map((timer) => {
            return (<Timer 
              passedSeconds={timer.seconds} 
              passedMinutes={timer.minutes} 
              passedHours={timer.hours} 
              passedName={timer.timerName} 
              deleteTimer={deleteTimer} 
              timerChangeHandler={timerChangeHandler} 
              id={timer.id} 
              key={timer.id}/>)
          })
        }
      

      
      <button onClick={addNewTimer} className="add-button tile pointer"><FaPlus /></button>
      

    </div>
  );
}

export default Timers;

