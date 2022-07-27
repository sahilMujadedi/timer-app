import './styles/TimerInputs.css'

const TimerInputs = ({seconds, setSeconds, minutes, setMinutes, hours, setHours, id, timerName, padZeros, timerChangeHandler, timerIsSet, toggleTimer}) => {
  // if user types a bad input, this function fixes it.
  const fixInputs = (inputFieldName) => {
    if (inputFieldName === "hours") {
      setHours(padZeros(hours))
    } else if (inputFieldName === "minutes") {
      setMinutes(padZeros(minutes))
      if (minutes > 59) {
        setMinutes(59)
      }
    } else if (inputFieldName === "seconds") {
      setSeconds(padZeros(seconds))
      if (seconds > 59) {
        setSeconds(59)
      }
    }
    timerChangeHandler(id, Number(seconds), Number(minutes), Number(hours), timerName)
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
    } else if (inputFieldName === "hours") {
      setHours(e.target.value)
    }

  }

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      toggleTimer()
    }
  }

  return(
    <div className="inputFields">
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
            onKeyPress={(e) => handleEnter(e)}
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
            onKeyPress={(e) => handleEnter(e)}
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
            onKeyPress={(e) => handleEnter(e)}
          ></input> 
        </>
    }
  </div>
  )
  
}

export default TimerInputs
