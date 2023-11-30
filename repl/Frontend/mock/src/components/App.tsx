import "../styles/App.css";
import REPL from "./REPL";

/**
 * This is the top level app class that creates the repl
 * @returns
 */
function App() {
  return (
    <div className="App">
      <p className="App-header">
        <h1
          aria-label="Repl: the heading of the webpage"
          // aria-label="Mock Heading"
          // aria-description="Mock, the heading of the webpage"
        >
          Repl
        </h1>
      </p>
      <REPL />
    </div>
  );
}

export default App;
