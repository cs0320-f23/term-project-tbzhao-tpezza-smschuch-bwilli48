import { Dispatch, SetStateAction, useState } from "react";
import { PreferenceTicker } from "./PreferenceTicker";
import { mockResortsPref, Resort } from "./resorts/ResortClass";

/**
 * Props for the preference table. Contains the array of resorts and a setter for said array.
 */
interface PreferencesProps {
  resortList: Resort[];
  setResortList: Dispatch<SetStateAction<Resort[]>>;
}

export class PreferenceAndValue {
  weight: number;
  value: number;

  constructor(weight: number, value: number) {
    this.weight = weight;
    this.value = value;
  }

  upWeight() {
    this.weight += 1;
  }

  downWeight() {
    this.weight -= 1;
  }

  upValue() {
    this.value += 1;
  }

  downValue() {
    this.value -= 1;
  }
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
  var initialPrefs = new Map<string, PreferenceAndValue>([
    ["Snowfall Amount", new PreferenceAndValue(5, 5)],
    ["Last Snowfall", new PreferenceAndValue(5, 5)],
    ["Base-depth", new PreferenceAndValue(5, 5)],
    ["Price", new PreferenceAndValue(5, 5)],
    ["Lifts Open", new PreferenceAndValue(5, 5)],
    ["Summit Elevation", new PreferenceAndValue(5, 5)],
    ["Temperature", new PreferenceAndValue(5, 5)],
    ["Windspeed", new PreferenceAndValue(5, 5)],
  ]);

  // State for the map of preference to level.
  const [preferenceMap, setPreferenceMap] =
    useState<Map<string, PreferenceAndValue>>(initialPrefs);

	// State for the reset object.
	const [reset, setReset] = useState<number>(0);

  /**
   * Updates the resort list when the submit button is clicked.
   * @param commandString input by the user currently in the box when submit is clicked
   */
  function handleSubmit(commandString: string) {
    props.setResortList(mockResortsPref);
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
