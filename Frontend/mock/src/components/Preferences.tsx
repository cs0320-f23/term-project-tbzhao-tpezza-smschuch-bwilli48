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
		["Snowfall", 5],
		["Weather", 5],
		["Affordability", 5],
		["Trail Count", 5],
		["Vertical Drop", 5],
		["Base Snow", 5],
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
		<div className="centerDiv">
			<h2>Preferences</h2>
			<table id="prefTable">
				<tr>
					<td>
						<h4>Snowfall</h4>
					</td>
					<td>
						<PreferenceTicker
							preferenceMap={preferenceMap}
							setPreferenceMap={setPreferenceMap}
							preference={"Snowfall"}
							setReset={setReset}
						/>
					</td>
					<td className="spacerDatum"></td>
					<td>
						<h4>Weather</h4>
					</td>
					<td>
						<PreferenceTicker
							preferenceMap={preferenceMap}
							setPreferenceMap={setPreferenceMap}
							preference={"Weather"}
							setReset={setReset}
						/>
					</td>
				</tr>
				<tr>
					<td>
						<h4>Affordability</h4>
					</td>
					<td>
						<PreferenceTicker
							preferenceMap={preferenceMap}
							setPreferenceMap={setPreferenceMap}
							preference={"Affordability"}
							setReset={setReset}
						/>
					</td>
					<td className="spacerDatum"></td>
					<td>
						<h4>Trail Count</h4>
					</td>
					<td>
						<PreferenceTicker
							preferenceMap={preferenceMap}
							setPreferenceMap={setPreferenceMap}
							preference={"Trail Count"}
							setReset={setReset}
						/>
					</td>
				</tr>
				<tr>
					<td>
						<h4>Vertical Drop</h4>
					</td>
					<td>
						<PreferenceTicker
							preferenceMap={preferenceMap}
							setPreferenceMap={setPreferenceMap}
							preference={"Vertical Drop"}
							setReset={setReset}
						/>
					</td>
					<td className="spacerDatum"></td>
					<td>
						<h4>Base Snow</h4>
					</td>
					<td>
						<PreferenceTicker
							preferenceMap={preferenceMap}
							setPreferenceMap={setPreferenceMap}
							preference={"Base Snow"}
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
