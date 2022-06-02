import Timer from './Timer'

const Timers = () => {
  let savedTimers = [
    {id: 0, seconds: 5, minutes: 0, hours: 0}
  ]

  

  return ( 
    <>
      {savedTimers.map((timer) => (
        <Timer passedSeconds={timer.seconds} passedMinutes={timer.minutes} passedHours={timer.hours} key={timer.id}/>
      ))}
    </>
  );
}
 
export default Timers;