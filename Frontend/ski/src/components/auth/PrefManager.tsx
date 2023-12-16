import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";
import Preferences from "./Preferences";
// ... other imports ...

const App: React.FC = () => {
	const { isAuthenticated, user } = useAuth0<User>();
	const [preferences, setPreferences] = useState<Preferences | null>(null);

	useEffect(() => {
		if (isAuthenticated && user) {
			loadPreferences(user.sub);
		}
	}, [isAuthenticated, user]);

	const loadPreferences = async (userId: string) => {
		const loadedPreferences = await loadPreferencesFromBackend(userId);
		setPreferences(loadedPreferences);
	};

	const savePreferences = async (newPreferences: Preferences) => {
		if (user) {
			await savePreferencesToBackend(user.sub, newPreferences);
			setPreferences(newPreferences);
		}
	};

	return (
		<div className="App">
			{/* ... rest of your components ... */}
			{isAuthenticated && user && (
				<>
					<Profile user={user} />
					<Preferences preferences={preferences} savePreferences={savePreferences} />
				</>
			)}
		</div>
	);
};

export default App;
