import { useState } from 'react'
import TimerInputs from './TimerInputs'
import './styles/Timer.css'

const Timer = ({passedSeconds, passedMinutes, passedHours}) => {
  
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
      setTimerIsSet(true)
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

  

  const timerFinished = () => {
    clearInterval(timerIntervalID)
    setFinishedFlag(true)
    setTimerGoing(false)
    setTimeLeft(TIMESHIFT*2)
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
      {!finishedFlag &&
        <button onClick={toggleTimer}>{timerGoing ? "Stop" : "Start"}</button>
      }
      
      {!timerGoing && timerIsSet &&
        <button onClick={resetTimer}>Reset</button>
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
