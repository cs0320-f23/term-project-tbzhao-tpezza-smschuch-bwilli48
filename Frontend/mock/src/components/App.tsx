import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import MainContainer from "./MainContainer";
import LoginButton from "./auth/LoginButton";
import Profile from "./auth/Profile"; // Import the Profile component

function App() {
	const { isAuthenticated } = useAuth0(); // Get the authentication status
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
			<div className="App-header">
				<h1>Alpine Advisor</h1>
			</div>
			<div>
				{isAuthenticated ? (
					<>
						<Profile className="profile-container" />
					</>
				) : (
					<LoginButton />
				)}
			</div>
			<div className="main-content">
				<MainContainer resortList={resortList} setResortList={setResortList} />
			</div>
		</div>
	);
}

export default App;
