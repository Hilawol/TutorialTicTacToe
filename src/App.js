import './App.css';
import Game from "./Components/Game/Game";

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <Game/>
        </header>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
              Learn React
          </a>
      </div>
  )
}

export default App;
