import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Preferences } from "./prefs/Preferences";
import { ResortsList } from "./resorts/ResortsList";
import { Search } from "./search/Search";
import { Sort } from "./sort/Sort";
import LoginButton from "./auth/LoginButton";
import Profile from "./auth/Profile"; // Import the Profile component
import "../styles/App.css";
import "../styles/index.css";
import "../styles/main.css";
import { getMockStartResorts, getStartResorts, mockResorts, Resort } from "./resorts/ResortClass";

/**
 * The `App` component serves as the main container for the Alpine Advisor application.
 * It uses Auth0 for authentication, manages state for resort data and mock mode, and
 * renders various components such as `Preferences`, `Search`, `Sort`, `ResortsList`,
 * `LoginButton`, and `Profile`.
 */
function App() {
	// Gets authentication status from Auth0
	const { isAuthenticated } = useAuth0();

	// Manages state for the resort list
	const [resortList, setResortList] = useState<Resort[]>(getStartResorts);

	// Manages state for mock mode
	const [mockMode, setMockMode] = useState<boolean>(false);

	// Manages state for the mock indicator
	const [mockString, setMockString] = useState<string>("Mock Mode: Off");

	// Manages state for the mock ID
	const [mockID, setMockID] = useState<string>("mockOffButton");

	/**
	 * Toggles the mock mode state and updates the resort list accordingly.
	 * Switches between real and mock data for resorts.
	 */
	function handleMockButton() {
		if (mockMode) {
			setMockMode(false);
			setMockString("Mock Mode: Off");
			setMockID("mockOffButton");
			setResortList(getStartResorts);
		} else {
			setMockMode(true);
			setMockString("Mock Mode: On");
			setMockID("mockOnButton");
			setResortList(getMockStartResorts);
		}
	}

	return (
		<div className="App">
			<header className="App-header">
				<h1>Alpine Advisor</h1>
			</header>
			<button
				className="search-button"
				id={mockID}
				onClick={() => handleMockButton()}
				aria-label={mockMode ? "Disable mock mode" : "Enable mock mode"}
			>
				{mockString}
			</button>
			<main>
				<section className="user-panel">
					{isAuthenticated ? (
						<>
							<Profile className="profile-container" aria-label="User profile" />
						</>
					) : (
						<LoginButton className="login-button" aria-label="Login button" />
					)}
				</section>
				<section className="content-panel">
					<div>
						<Preferences resortList={resortList} setResortList={setResortList} mockMode={mockMode} />
						<div className="search-sort-resorts">
							<div className="search-sort">
								<div className="sort">
									<Sort resortList={resortList} setResortList={setResortList} mockMode={mockMode} />
								</div>
								<div className="search">
									<Search resortList={resortList} setResortList={setResortList} mockMode={mockMode} />
								</div>
							</div>
							<div className="resorts">
								<ResortsList resortList={resortList} aria-label="List of resorts" />
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

export default App;
