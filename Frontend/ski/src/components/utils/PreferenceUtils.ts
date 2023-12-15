import { UserPreferences, PreferenceItem } from "../Preferences";

const USER_PREFERENCES_KEY = "userPreferences";

export const savePreferencesToLocalStorage = (userId: string, preferences: UserPreferences): void => {
	const preferencesObject = Object.fromEntries(preferences);
	localStorage.setItem(`${USER_PREFERENCES_KEY}-${userId}`, JSON.stringify(preferencesObject));
};

export const loadPreferencesFromLocalStorage = (userId: string): UserPreferences | null => {
	const preferences = localStorage.getItem(`${USER_PREFERENCES_KEY}-${userId}`);
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
