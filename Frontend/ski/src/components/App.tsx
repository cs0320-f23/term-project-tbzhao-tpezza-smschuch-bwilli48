import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Preferences } from "./prefs/Preferences";
import { ResortsList } from "./resorts/ResortsList";
import { Search } from "./search/Search";
import { Sort } from "./sort/Sort";
import LoginButton from "./auth/LoginButton";
import Profile from "./auth/Profile";
import "../styles/App.css";
import "../styles/main.css";
import { UserPreferences } from "./prefs/Preferences";
import { savePreferencesToLocalStorage, loadPreferencesFromLocalStorage } from "./utils/PreferenceUtils";
import { getMockStartResorts, getStartResorts, mockResorts, Resort } from "./resorts/ResortClass";

/**
 * The `App` component serves as the main container for the Alpine Advisor application.
 * It uses Auth0 for authentication, manages state for resort data and mock mode, and
 * renders various components such as `Preferences`, `Search`, `Sort`, `ResortsList`,
 * `LoginButton`, and `Profile`.
 */
function App() {
	// Manages state for the resort list
	const [resortList, setResortList] = useState<Resort[]>(getStartResorts);

	// Gets authentication status and user info from Auth0
	const { isAuthenticated, user } = useAuth0();

	// Manages state for user preferences
	const [preferences, setPreferences] = useState<UserPreferences | null>(null);

	/**
	 * useEffect hook to load user preferences from local storage when the user logs in.
	 * It checks if the user is authenticated and if so, it loads preferences associated
	 * with that user and sets them in state.
	 */
	useEffect(() => {
		if (isAuthenticated && user?.sub) {
			const loadedPreferences = loadPreferencesFromLocalStorage(user.sub);
			setPreferences(loadedPreferences);
		}
	}, [isAuthenticated, user?.sub]);

	/**
	 * Saves new user preferences. First checks if the user is authenticated and
	 * if so, saves the new preferences to local storage and updates the state.
	 */
	const handleSavePreferences = (newPreferences: UserPreferences) => {
		if (user?.sub) {
			savePreferencesToLocalStorage(user.sub, newPreferences);
			setPreferences(newPreferences);
		}
	};

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
						<Preferences
							preferences={preferences}
							onSavePreferences={handleSavePreferences}
							resortList={resortList}
							setResortList={setResortList}
							mockMode={mockMode}
						/>
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
