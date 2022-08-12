import Navbar from './Navbar'
import Timers from './Timers'
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <div className="timers">
        <Navbar />
        <Timers />
      </div>
    </div>
  );
}

export default App;
