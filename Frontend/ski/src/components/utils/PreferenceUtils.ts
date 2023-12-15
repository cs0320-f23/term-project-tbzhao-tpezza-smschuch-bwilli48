import { UserPreferences, PreferenceItem } from "../prefs/Preferences";

/**
 * Saves user preferences to local storage. Converts the UserPreferences map into an object
 * and stores it under a key specific to the user. This allows for persisting user preferences
 * across sessions.
 */
export const savePreferencesToLocalStorage = (userId: string, preferences: UserPreferences): void => {
	const preferencesObject = Object.fromEntries(preferences);
	localStorage.setItem(`$"userPreferences"-${userId}`, JSON.stringify(preferencesObject));
};

/**
 * Loads user preferences from local storage. Retrieves a user's preferences, if they
 * exist, and parses them into an object before converting them back into a Map.
 */
export const loadPreferencesFromLocalStorage = (userId: string): UserPreferences | null => {
	const preferences = localStorage.getItem(`$"userPreferences"-${userId}`);
	if (preferences) {
		const preferencesObject = JSON.parse(preferences) as { [key: string]: PreferenceItem };
		const preferencesMap = new Map<string, PreferenceItem>();

		for (const [key, value] of Object.entries(preferencesObject)) {
			preferencesMap.set(key, value as PreferenceItem);
		}

		return preferencesMap;
	}
	return null;
};
