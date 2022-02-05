import { useState } from 'react'

const Timer = () => {
  // states and variables //
  // input variables
  let [hours, setHours] = useState('00')
  let [minutes, setMinutes] = useState('00')
  let [seconds, setSeconds] = useState('00')

  // timer variables
  let [timeLeft, setTimeLeft] = useState(0)
  let [timerGoing, setTimerGoing] = useState(false)
  let [timerIntervalID, setTimerIntervalID] = useState(null)

  // display variables
  let [hoursDisplay, setHoursDisplay] = useState('00')
  let [minutesDisplay, setMinutesDisplay] = useState('00')
  let [secondsDisplay, setSecondsDisplay] = useState('00')

  // variable to check if the timer has been set.
  let [timerIsSet, setTimerIsSet] = useState(false)

  // ((hours*3600) + (minutes*60) + (seconds))

  // the meat of the timer
  // first checks if timer is set to see if it needs to reset the timeLeft
  // if the timer was not going when function was run, make it start going
  // if the timer was going when the function was run, stop the timer.
  const toggleTimer = () => {
    if (!timerIsSet) {
      hours = parseInt(hours)
      minutes= parseInt(minutes)
      seconds= parseInt(seconds)
      // add one at the end to make up for flooring
      timeLeft = (hours*3600) + (minutes*60) + (seconds)
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

  const resetTimer = () => {
    setTimerIsSet(false)
  }

  // if user types a bad input, this function fixes it.
  const fixInputs = (inputFieldName) => {
    if (inputFieldName === "hours") {
      setHours(padZeros(hours))
    } else if (inputFieldName === "minutes") {
      setMinutes(padZeros(minutes))
      if (minutes > 59) {
        setMinutes(59)
      }
    } else {
      setSeconds(padZeros(seconds))
      if (seconds > 59) {
        setSeconds(59)
      }
    }
    
  }

  // it actually just pads zeros on the back of the display states.
  const makeTimeLeftPretty = () => {
    if (hours) {
      hoursDisplay = Math.floor(timeLeft/3600)
      setHoursDisplay(padZeros(hoursDisplay))
    }
    minutesDisplay = Math.floor((timeLeft % 3600) / 60)
    secondsDisplay = Math.floor((timeLeft % 3600) % 60) + 1
    
    setMinutesDisplay(padZeros(minutesDisplay))
    setSecondsDisplay(padZeros(secondsDisplay))
  }

  // makes H:M:S look like HH:MM:SS, just to look nicer.
  const padZeros = (num) => {
    let s = num.toString()
    while (s.length < 2) {
      s = "0" + s
    }
    return s
  }

  const handleInputClick = (e) => {
    e.target.select()
  }
  const handleInputChange = (e, inputFieldName) => {
    // Number(e.target.value) returns a number, if zero is returned, it is evaluated to be false, so we have to check if it's a zero to avoid this.
    if (!Number(e.target.value) && Number(e.target.value) !== 0) {
      return
    } else if (inputFieldName === "minutes") {
      setMinutes(e.target.value)
    } else if (inputFieldName === "seconds") {
      setSeconds(e.target.value)
    } else {
      setHours(e.target.value)
    }
  }

  // there's got to be a way to make these input fields less messy...
  return (
    <div className="Timer">

      <p>{hoursDisplay}:{minutesDisplay}:{secondsDisplay}</p>

      {/* Only show the input fields on set up */}
      {!timerIsSet && 
        <>
          <input
            className="hour time-input"
            placeholder="HH"
            type="tel"
            maxLength="2"
            value={hours}
            onChange={(e) => handleInputChange(e, "hours")}
            onBlur={() => fixInputs("hours")}
            onClick={handleInputClick}
          ></input>
          :
          <input
            className="minute time-input"
            placeholder="MM"
            type="tel"
            maxLength="2"
            value={minutes}
            onChange={(e) => handleInputChange(e, "minutes")}
            onBlur={() => fixInputs("minutes")}
            onClick={handleInputClick}
          ></input>
          :
          <input
            className="second time-input"
            placeholder="SS"
            type="tel"
            maxLength="2"
            value={seconds}
            onChange={(e) => handleInputChange(e, "seconds")}
            onBlur={() => fixInputs("seconds")}
            onClick={handleInputClick}
          ></input> 
        </>
      }
      <button onClick={toggleTimer}>{timerGoing ? "Stop" : "Start"}</button>
      {!timerGoing && timerIsSet &&
        <button onClick={resetTimer}>Reset</button>
      }

    </div>
  );
}

export default Timer;
