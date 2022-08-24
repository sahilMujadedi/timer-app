import { useState } from 'react'
import TimerInputs from './TimerInputs'
import {FaPause, FaPlay, FaUndoAlt, FaTimes} from 'react-icons/fa'
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

  let [timerStyle, setTimerStyle] = useState('timer')

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

      // set displays here to avoid the flicker between 00:00:00 and the time that was input
      setHoursDisplay(padZeros(hours))
      setMinutesDisplay(padZeros(minutes))
      setSecondsDisplay(padZeros(seconds))

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
    minutesDisplay = Math.floor(((timeLeft / 1000) % 3600) / 60)
    secondsDisplay = Math.floor(((timeLeft / 1000) % 3600) % 60)
    hoursDisplay = Math.floor((timeLeft / 1000)/3600)

    setHoursDisplay(padZeros(hoursDisplay))
    setMinutesDisplay(padZeros(minutesDisplay))
    setSecondsDisplay(padZeros(secondsDisplay))
  }

  // runs when reset button is pressed, makes the displays 00 and allows input.
  const resetTimer = () => {
    setTimerGoing(false)
    setTimerIsSet(false)
    setTimerStyle('timer')
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
    setTimerStyle(timerStyle += ' timer-finished')
    console.log('timerfinished')
  }

  
  return (
    <div className={"timer tile" + " " + timerStyle}>
      <div className="upper-timer">
        {/* timer name */}
        <input type="text" value={timerName} placeholder="Timer Name" className="name-input" onChange={(e) => {
          timerChangeHandler(id, seconds, minutes, hours, e.target.value)
          setTimerName(e.target.value)
        }}/>
        

        {/* delete and reset buttons */}
        {!timerIsSet && 
          <button onClick={() => deleteTimer(id)} className="delete-button flt-right pointer upper-button"><FaTimes /></button>
        }
        {!timerGoing && timerIsSet &&
          <button onClick={resetTimer} className="reset-button flt-right pointer upper-button"><FaUndoAlt /></button>
        }
      </div>
      
      <div className="middle-timer">
        {/* start/stop button */}
        <div className="timer-toggle-container">
          {!finishedFlag 
            ? <button onClick={toggleTimer} className="timer-toggle pointer">{timerGoing ? <FaPause /> : <FaPlay />}</button>
            : <button onClick={resetTimer} className="timer-toggle pointer"><FaUndoAlt /></button>
          }
        </div>
        
        

        {/* progress bar */}
        <div className='progress-bar-container'>
          <progress value={timerIsSet ? initialTimeLeft - timeLeft : 0} max={initialTimeLeft - TIMESHIFT} className="progress-bar" />
        </div>
      </div>

      <div className="lower-timer">
        {/* timer and input */}
        {timerIsSet &&
          <span>
            {timeLeft > TIMESHIFT
              ? <p className="timer-display">{hoursDisplay}:{minutesDisplay}:{secondsDisplay}</p>
              : timerFinished()
            }
          </span>
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
          toggleTimer={toggleTimer}
        />
      </div>

    </div>
  );
}

export default Timer
