import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { PreferenceTicker } from "./PreferenceTicker";

/**
 * Props for the preference table. Contains the array of resorts and a setter for said array.
 */
interface PreferencesProps {
	resortList: string[];
	setResortList: Dispatch<SetStateAction<string[]>>;
}

/**
 * Function that represents table of preferences. Current preferences are snowfall, weather,
 * affordability, trail count, vertical drop, and base snow level. Each preference has an
 * integer that represents its level and a set of arrows that controls it.
 */
export function Preferences(props: PreferencesProps) {
	/**
	 * Initial preferences that are set on page load.
	 */
	var initialPrefs = new Map<string, number>([
		["Snowfall Amount", 5],
		["Last Snowfall", 5],
		["Base-depth", 5],
		["Price", 5],
		["Lifts Open", 5],
		["Summit Elevation", 5],
		["Temperature", 5],
		["Windspeed", 5],
	]);

	// State for the map of preference to level.
	const [preferenceMap, setPreferenceMap] = useState<Map<string, number>>(initialPrefs);

	// State for the reset object.
	const [reset, setReset] = useState<number>(0);

	/**
	 * Updates the resort list when the submit button is clicked.
	 * @param commandString input by the user currently in the box when submit is clicked
	 */
	function handleSubmit(commandString: string) {
		props.setResortList([commandString, ...props.resortList]);
	}

	return (
		<div className="preferences-container">
			<h2>Preferences</h2>
			<table id="prefTable">
				<tr>
					<td>
						<h4>Snowfall Amount</h4>
					</td>
					<td>
						<PreferenceTicker
							preferenceMap={preferenceMap}
							setPreferenceMap={setPreferenceMap}
							preference={"Snowfall Amount"}
							setReset={setReset}
						/>
					</td>
					<td className="spacerDatum"></td>
					<td>
						<h4>Last Snowfall</h4>
					</td>
					<td>
						<PreferenceTicker
							preferenceMap={preferenceMap}
							setPreferenceMap={setPreferenceMap}
							preference={"Last Snowfall"}
							setReset={setReset}
						/>
					</td>
				</tr>
				<tr>
					<td>
						<h4>Base-depth</h4>
					</td>
					<td>
						<PreferenceTicker
							preferenceMap={preferenceMap}
							setPreferenceMap={setPreferenceMap}
							preference={"Base-depth"}
							setReset={setReset}
						/>
					</td>
					<td className="spacerDatum"></td>
					<td>
						<h4>Price</h4>
					</td>
					<td>
						<PreferenceTicker
							preferenceMap={preferenceMap}
							setPreferenceMap={setPreferenceMap}
							preference={"Price"}
							setReset={setReset}
						/>
					</td>
				</tr>
				<tr>
					<td>
						<h4>Lifts Open</h4>
					</td>
					<td>
						<PreferenceTicker
							preferenceMap={preferenceMap}
							setPreferenceMap={setPreferenceMap}
							preference={"Lifts Open"}
							setReset={setReset}
						/>
					</td>
					<td className="spacerDatum"></td>
					<td>
						<h4>Summit Elevation</h4>
					</td>
					<td>
						<PreferenceTicker
							preferenceMap={preferenceMap}
							setPreferenceMap={setPreferenceMap}
							preference={"Summit Elevation"}
							setReset={setReset}
						/>
					</td>
				</tr>
				<tr>
					<td>
						<h4>Temperature</h4>
					</td>
					<td>
						<PreferenceTicker
							preferenceMap={preferenceMap}
							setPreferenceMap={setPreferenceMap}
							preference={"Temperature"}
							setReset={setReset}
						/>
					</td>
					<td className="spacerDatum"></td>
					<td>
						<h4>Windspeed</h4>
					</td>
					<td>
						<PreferenceTicker
							preferenceMap={preferenceMap}
							setPreferenceMap={setPreferenceMap}
							preference={"Windspeed"}
							setReset={setReset}
						/>
					</td>
				</tr>
			</table>
			<button
				id="preferenceButton"
				onClick={() => handleSubmit("pr")}
				aria-label="Submit button. Click the Submit button with the mouse or click the return key on your keyboard to enter the command you entered in the input box"
			>
				Search By Preferences
			</button>
		</div>
	);
}
