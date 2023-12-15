import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Preferences } from "./Preferences";
import { ResortsList } from "./ResortsList";
import { Search } from "./Search";
import { Sort } from "./Sort";
import LoginButton from "./auth/LoginButton";
import Profile from "./auth/Profile"; // Import the Profile component
import "../styles/App.css";
import "../styles/main.css";
import { mockResorts, Resort } from "./resorts/ResortClass";
import { UserPreferences } from "./Preferences";
import { savePreferencesToLocalStorage, loadPreferencesFromLocalStorage } from "./utils/PreferenceUtils";

function App() {
	// Gets authentication status from Auth0
	const { isAuthenticated, user } = useAuth0();
	const [preferences, setPreferences] = useState<UserPreferences | null>(null);
	const [resortList, setResortList] = useState<Resort[]>(mockResorts);

	// Sets the preferences to whatever the account's preferences are on login.
	useEffect(() => {
		if (isAuthenticated && user?.sub) {
			const loadedPreferences = loadPreferencesFromLocalStorage(user.sub);
			setPreferences(loadedPreferences);
		}
	}, [isAuthenticated, user?.sub]);

	// When a user clicks the save button, saves preferences.
	const handleSavePreferences = (newPreferences: UserPreferences) => {
		if (user?.sub) {
			savePreferencesToLocalStorage(user.sub, newPreferences);
			setPreferences(newPreferences);
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				<h1>Alpine Advisor</h1>
			</header>
			<main>
				<section className="user-panel">
					{isAuthenticated ? (
						<>
							<Profile className="profile-container" />
						</>
					) : (
						<LoginButton className="login-button" />
					)}
				</section>
				<section className="content-panel">
					<div>
						<Preferences
							preferences={preferences}
							onSavePreferences={handleSavePreferences}
							resortList={resortList}
							setResortList={setResortList}
						/>
						<div className="search-sort-resorts">
							<div className="search-sort">
								<div className="sort">
									<Sort resortList={resortList} setResortList={setResortList} />
								</div>
								<div className="search">
									<Search resortList={resortList} setResortList={setResortList} />
								</div>
							</div>
							<div className="resorts">
								<ResortsList resortList={resortList} />
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

export default App;
