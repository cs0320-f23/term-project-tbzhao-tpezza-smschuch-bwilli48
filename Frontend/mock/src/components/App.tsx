import { SetStateAction, useState } from "react";
import "../styles/App.css";
import MainContainer from "./MainContainer";

/**
 * This is the top level app class that creates the repl and instantiates the list of
 * resorts.
 * @returns Our app in HTML
 */
function App() {
	var resortsAlph = [
		"Araphoe Basin",
		"Big Sky",
		"Jay Peak",
		"Jackson Hole",
		"Killington",
		"Smuggler's Notch",
		"Snowbird",
		"Sugarbush",
	];
	const [resortList, setResortList] = useState<string[]>(resortsAlph);
	return (
		<div className="App">
			<p className="App-header">
				<h1
					aria-label="Repl: the heading of the webpage"
					// aria-label="Mock Heading"
					// aria-description="Mock, the heading of the webpage"
				>
					Alpine Advisor
				</h1>
			</p>
			<MainContainer resortList={resortList} setResortList={setResortList} />
		</div>
	);
}

export default App;
