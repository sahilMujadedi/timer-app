import { useState } from 'react'
import TimerInputs from './TimerInputs'
import './styles/Timer.css'

const Timer = ({passedSeconds, passedMinutes, passedHours, passedName, timerChangeHandler, deleteTimer, id}) => {
  
  // makes H:M:S look like HH:MM:SS
  const padZeros = (num) => {
    let s = num.toString()
    while (s.length < 2) {
      s = "0" + s
    }
    return s
  }

  // states and variables //
  // input variables
  let [hours, setHours] = useState(padZeros(passedHours))
  let [minutes, setMinutes] = useState(padZeros(passedMinutes))
  let [seconds, setSeconds] = useState(padZeros(passedSeconds))

  let [timerName, setTimerName] = useState(passedName)

  // shifts the timer so that when the timer displays 0 it ends rather than waiting to go past 0
  // and also displays the input time instead of immediately going down a second.
  const TIMESHIFT = 1000;

  // behind the scenes timer variables
  let [timeLeft, setTimeLeft] = useState(TIMESHIFT*2) // set so that timer does not finish when the page loads.
  let [timerGoing, setTimerGoing] = useState(false)
  let [timerIntervalID, setTimerIntervalID] = useState(null)

  let lastUpdate = new Date().getTime()

  // display variables
  let [hoursDisplay, setHoursDisplay] = useState('00')
  let [minutesDisplay, setMinutesDisplay] = useState('00')
  let [secondsDisplay, setSecondsDisplay] = useState('00')
  let [finishedFlag, setFinishedFlag] = useState(false)

  let [timerDisplayStyle, setTimerDisplayStyle] = useState('timer-display')

  // variable to check if the timer has been set.
  let [timerIsSet, setTimerIsSet] = useState(false)

  // progress bar variable
  let [initialTimeLeft, setInitialTimeLeft] = useState(0)

  // the meat of the timer
  // first checks if timer is set to see if it needs to reset the timeLeft
  // if the timer was not going when function was run, make it start going
  // if the timer was going when the function was run, stop the timer.
  const toggleTimer = () => {
    if (!timerIsSet) {
      hours = parseInt(hours)
      minutes= parseInt(minutes)
      seconds= parseInt(seconds)

      timeLeft = (((hours*3600) + (minutes*60) + (seconds)) * 1000) + TIMESHIFT // timeLeft will be in milliseconds
      initialTimeLeft = timeLeft
      setInitialTimeLeft(initialTimeLeft)
      setTimerIsSet(true)
      setTimeLeft(timeLeft)
    }
    if (!timerGoing) {
      lastUpdate = new Date().getTime()
      setTimerGoing(true)

      setTimerIntervalID(setInterval(() => {
        timeLeft -= new Date().getTime() - lastUpdate

        setTimeLeft(timeLeft)
        makeTimeLeftPretty()

        lastUpdate = new Date().getTime()
      }, 100))
    } else if (timerGoing) {
      setTimerGoing(false)
      clearInterval(timerIntervalID)
    }
    
  }

  // calculates how many hours minutes and seconds there are to display it in a readable way.
  const makeTimeLeftPretty = () => {
    if (hours) {
      hoursDisplay = Math.floor((timeLeft / 1000)/3600)
      setHoursDisplay(padZeros(hoursDisplay))
    }
    minutesDisplay = Math.floor(((timeLeft / 1000) % 3600) / 60)
    secondsDisplay = Math.floor(((timeLeft / 1000) % 3600) % 60)
    
    setMinutesDisplay(padZeros(minutesDisplay))
    setSecondsDisplay(padZeros(secondsDisplay))
  }

  // runs when reset button is pressed, makes the displays 00 and allows input.
  const resetTimer = () => {
    setTimerGoing(false)
    setTimerIsSet(false)
    setTimerDisplayStyle('timer-display')
    setFinishedFlag(false)
    setMinutesDisplay(padZeros(0))
    setSecondsDisplay(padZeros(0))
    setHoursDisplay(padZeros(0))
  }

  const timerFinished = () => {
    clearInterval(timerIntervalID)
    setFinishedFlag(true)
    setTimerGoing(false)
    setTimeLeft(TIMESHIFT+1)
    setTimerDisplayStyle(timerDisplayStyle += ' timer-display-finished')
    console.log('timerfinished')
  }

  
  return (
    <div className="timer">
      <input type="text" value={timerName} placeholder="Timer Name" onChange={(e) => {
        timerChangeHandler(id, seconds, minutes, hours, e.target.value)
        setTimerName(e.target.value)
      }}/>
      {timeLeft > TIMESHIFT
        ? <p className={timerDisplayStyle}>{hoursDisplay}:{minutesDisplay}:{secondsDisplay}</p>
        : timerFinished()
      }
      

      <TimerInputs
        seconds={seconds} 
        setSeconds={setSeconds}
        minutes={minutes}
        setMinutes={setMinutes} 
        hours={hours}
        setHours={setHours}
        id={id}
        timerName={timerName}
        padZeros={padZeros}
        timerChangeHandler={timerChangeHandler}
        timerIsSet={timerIsSet}
      />

      <div className='progress-bar'>
        <progress value={timerIsSet ? initialTimeLeft - timeLeft : 0} max={initialTimeLeft - TIMESHIFT} />
      </div>
       
      
      {!finishedFlag &&
        <button onClick={toggleTimer}>{timerGoing ? "Stop" : "Start"}</button>
      }
      
      {!timerGoing && timerIsSet &&
        <button onClick={resetTimer}>Reset</button>
      }
      {!timerIsSet && 
        <button onClick={() => deleteTimer(id)}>Delete</button>
      }
    </div>
  );
}

Timer.defaultProps = {
  passedHours: 0,
  passedMinutes: 1,
  passedSeconds: 0
}

export default Timer
