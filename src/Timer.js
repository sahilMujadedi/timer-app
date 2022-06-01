import { useState } from 'react'
import TimerInputs from './TimerInputs'
import './styles/Timer.css'

const Timer = () => {
  // states and variables //
  // input variables
  let [hours, setHours] = useState('00')
  let [minutes, setMinutes] = useState('00')
  let [seconds, setSeconds] = useState('00')

  // shifts the timer so that when the timer displays 0 it ends rather than waiting to go past 0
  // and also displays the input time instead of immediately going down a second.
  const TIMESHIFT = 1;

  // behind the scenes timer variables
  let [timeLeft, setTimeLeft] = useState(TIMESHIFT+1) // set to TIMESHIFT+1 so that timer does not finish when the page loads.
  let [timerGoing, setTimerGoing] = useState(false)
  let [timerIntervalID, setTimerIntervalID] = useState(null)

  // display variables
  let [hoursDisplay, setHoursDisplay] = useState('00')
  let [minutesDisplay, setMinutesDisplay] = useState('00')
  let [secondsDisplay, setSecondsDisplay] = useState('00')

  let [timerDisplayStyle, setTimerDisplayStyle] = useState('timer-display')

  // variable to check if the timer has been set.
  let [timerIsSet, setTimerIsSet] = useState(false)

  // the meat of the timer
  // first checks if timer is set to see if it needs to reset the timeLeft
  // if the timer was not going when function was run, make it start going
  // if the timer was going when the function was run, stop the timer.
  const toggleTimer = () => {
    if (!timerIsSet) {
      hours = parseInt(hours)
      minutes= parseInt(minutes)
      seconds= parseInt(seconds)
      timeLeft = (hours*3600) + (minutes*60) + (seconds) + TIMESHIFT
      setTimerIsSet(true)
    }
    if (!timerGoing) {
      setTimerGoing(true)
      setTimerIntervalID(setInterval(() => {
        timeLeft -= 0.1
        setTimeLeft(timeLeft)
        makeTimeLeftPretty()
      }, 100))
    } else if (timerGoing) {
      setTimerGoing(false)
      clearInterval(timerIntervalID)
    }
    
  }

  // runs when reset button is pressed, makes the displays 00 and allows input.
  const resetTimer = () => {
    setTimerIsSet(false)
    setMinutesDisplay(padZeros(0))
    setSecondsDisplay(padZeros(0))
    setHoursDisplay(padZeros(0))
  }
  
  // calculates how many hours minutes and seconds there are to display it in a readable way.
  const makeTimeLeftPretty = () => {
    if (hours) {
      hoursDisplay = Math.floor(timeLeft/3600)
      setHoursDisplay(padZeros(hoursDisplay))
    }
    minutesDisplay = Math.floor((timeLeft % 3600) / 60)
    secondsDisplay = Math.floor((timeLeft % 3600) % 60)
    
    setMinutesDisplay(padZeros(minutesDisplay))
    setSecondsDisplay(padZeros(secondsDisplay))
  }

  // makes H:M:S look like HH:MM:SS
  const padZeros = (num) => {
    let s = num.toString()
    while (s.length < 2) {
      s = "0" + s
    }
    return s
  }

  const timerFinished = () => {
    resetTimer()
    clearInterval(timerIntervalID)
    setTimeLeft(TIMESHIFT+1)
    setTimerDisplayStyle(timerDisplayStyle += ' timer-display-finished')
    console.log('timerfinished')
  }
  
  return (
    <div className="Timer">
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
        padZeros={padZeros}
        timerIsSet={timerIsSet}
      />

      <button onClick={toggleTimer}>{timerGoing ? "Stop" : "Start"}</button>
      {!timerGoing && timerIsSet &&
        <button onClick={resetTimer}>Reset</button>
      }

    </div>
  );
}

export default Timer
