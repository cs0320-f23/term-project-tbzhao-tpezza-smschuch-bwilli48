type User = {
	sub: string;
	name?: string;
	email?: string;
};

type Preferences = {
	theme: string;
	notifications: boolean;
	// ... other preference types
};

type Database = {
	users: {
		[userId: string]: {
			preferences: Preferences;
		};
	};
};

// Mock backend database
const mockDatabase: Database = {
	users: {
		"auth0|123456": {
			preferences: {
				theme: "dark",
				notifications: true,
				// other preferences
			},
		},
	},
};

// Mocked method that
const savePreferencesToBackend = (userId: string, preferences: Preferences): Promise<boolean> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			mockDatabase.users[userId].preferences = preferences;
			resolve(true);
		}, 500);
	});
};

const loadPreferencesFromBackend = (userId: string): Promise<Preferences | null> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(mockDatabase.users[userId]?.preferences || null);
		}, 500);
	});
};
