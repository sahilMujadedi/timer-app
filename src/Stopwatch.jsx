import { useEffect, useState } from 'react'
import {FaPause, FaPlay, FaUndoAlt, FaTimes, FaStopwatch} from 'react-icons/fa'
import './styles/Stopwatch.css'

const Stopwatch = ({passedSeconds, passedMinutes, passedHours, passedName, passedLaps, timerChangeHandler, deleteTimer, id}) => {
  const padZeros = (num) => {
    let s = num.toString()
    while (s.length < 2) {
      s = "0" + s
    }
    return s
  }
  // states and variables //
  // input variables
  let [timerName, setTimerName] = useState(passedName)

  // behind the scenes stopwatch variables
  let [timeElapsed, setTimeElapsed] = useState(1000*((passedSeconds) + (60*passedMinutes) + (3600*passedHours)))
  let [timerGoing, setTimerGoing] = useState(false)
  let [timerIntervalID, setTimerIntervalID] = useState(null)

  let lastUpdate = new Date().getTime()

  // display variables
  let [hoursDisplay, setHoursDisplay] = useState(padZeros(passedHours))
  let [minutesDisplay, setMinutesDisplay] = useState(padZeros(passedMinutes))
  let [secondsDisplay, setSecondsDisplay] = useState(padZeros(passedSeconds))

  let [laps, setLaps] = useState(passedLaps)

  let [timerStyle, setTimerStyle] = useState('timer')

  // variable to check if the timer has been set.
  let [timerIsSet, setTimerIsSet] = useState(false)

  // the meat of the stopwatch
  // first sets the stopwatch
  // if stopwatch was not going when function was run, start it
  // otherwise stop it.
  const toggleStopwatch = () => {
    if (!timerIsSet) {
      setTimerIsSet(true)
    }
    if (!timerGoing) {
      lastUpdate = new Date().getTime()
      setTimerGoing(true)

      setTimerIntervalID(setInterval(() => {

        timeElapsed += new Date().getTime() - lastUpdate

        setTimeElapsed(timeElapsed)
        makeTimeElapsedPretty()

        lastUpdate = new Date().getTime()
      }, 100))
    } else if (timerGoing) {
      setTimerGoing(false)
      clearInterval(timerIntervalID)
    }

  }

  // calculates how many hours minutes and seconds there are to display it in a readable way
  const makeTimeElapsedPretty = () => {
    minutesDisplay = Math.floor(((timeElapsed / 1000) % 3600) / 60)
    secondsDisplay = Math.floor(((timeElapsed / 1000) % 3600) % 60)
    hoursDisplay = Math.floor((timeElapsed / 1000)/3600)

    setHoursDisplay(padZeros(hoursDisplay))
    setMinutesDisplay(padZeros(minutesDisplay))
    setSecondsDisplay(padZeros(secondsDisplay))
  }

  // runs when reset button is pressed, makes the displays 00 and allows input.
  const resetTimer = () => {
    setTimerGoing(false)
    setTimerIsSet(false)
    setTimerStyle('timer')
    setTimeElapsed(0)
    setMinutesDisplay(padZeros(0))
    setSecondsDisplay(padZeros(0))
    setHoursDisplay(padZeros(0))
  }

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      timerChangeHandler(id, parseInt(secondsDisplay), parseInt(minutesDisplay), parseInt(hoursDisplay), timerName)
    })
  })

  return (
    <div className={"timer tile " + timerStyle}>
      <div className="upper-timer">
        {/* stopwatch icon */}
        <span className="timer-icon"><FaStopwatch /></span>
        {/* timer name */}
        <input type="text" value={timerName} placeholder="Timer Name" className="name-input" onChange={(e) => {
          timerChangeHandler(id, parseInt(secondsDisplay), parseInt(minutesDisplay), parseInt(hoursDisplay), e.target.value)
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
          <button onClick={toggleStopwatch} className="timer-toggle pointer">{timerGoing ? <FaPause /> : <FaPlay />}</button>
        </div>
        
        

      </div>

      <div className="lower-timer">
        {/* stopwatch display */}
          <span>
              <p className="timer-display">{hoursDisplay}:{minutesDisplay}:{secondsDisplay}</p>
          </span>
          <div className="laps-container">
            <table>
              <tr>
                <th>#</th>
                <th>Time</th>
              </tr>
              <tr>
                <td>1</td>
                <td>01:00:00</td>
              </tr>
              <tr>
                <td>2</td>
                <td>01:00:00</td>
              </tr>
              <tr>
                <td>3</td>
                <td>01:00:00</td>
              </tr>
            </table>
          </div>
      </div>

    </div>
  )
}

export default Stopwatch

