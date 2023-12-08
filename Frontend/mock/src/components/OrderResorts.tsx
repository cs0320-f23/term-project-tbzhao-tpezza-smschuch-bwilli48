/**
 * Function that sorts the resorts in the resort list. Currently mocked.
 */
export function sortResorts(sortMethod: string): string[] {
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
	if (sortMethod === "Recent Snowfall") {
		resortsAlph = [
			"Jackson Hole",
			"Killington",
			"Smuggler's Notch",
			"Snowbird",
			"Sugarbush",
			"Araphoe Basin",
			"Big Sky",
			"Jay Peak",
		];
	} else {
		resortsAlph = [
			"Snowbird",
			"Jackson Hole",
			"Killington",
			"Sugarbush",
			"Araphoe Basin",
			"Big Sky",
			"Jay Peak",
			"Smuggler's Notch",
		];
	}

	return resortsAlph;
}
