import React, { useState, useEffect } from "react";

type PreferencesProps = {
	preferences: Preferences | null;
	savePreferences: (newPreferences: Preferences) => Promise<void>;
};

const Preferences: React.FC<PreferencesProps> = ({ preferences, savePreferences }) => {
	const [localPreferences, setLocalPreferences] = useState<Preferences | null>(preferences);

	useEffect(() => {
		setLocalPreferences(preferences);
	}, [preferences]);

	// ... rest of the component ...
};

export default Preferences;
