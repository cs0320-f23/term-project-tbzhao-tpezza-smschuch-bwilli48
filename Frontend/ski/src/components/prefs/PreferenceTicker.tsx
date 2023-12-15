import "../../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { PreferenceAndValue } from "./Preferences";

// Properties for the PreferenceTicker component.
interface PreferenceTickerProps {
	preferenceMap: Map<string, PreferenceAndValue>;
	setPreferenceMap: Dispatch<SetStateAction<Map<string, PreferenceAndValue>>>;
	setReset: Dispatch<number>;
	preference: string;
}

var resetNum = 1;

/**
 * Allows users to increase or decrease the weight and value of a particular preference.
 * Renders a set of controls for adjusting these attributes associated with a user's preference.
 */
export function PreferenceTicker(props: PreferenceTickerProps) {
	// Manages the up arrow. Increases the count by 1 if it isn't at the max value already.
	function upWeight() {
		var currentPref = props.preferenceMap.get(props.preference);
		if (currentPref === undefined) {
			throw console.error();
		}
		if (currentPref.weight < 10) {
			const newMap = new Map(props.preferenceMap);
			newMap.get(props.preference)?.upWeight();
			props.setPreferenceMap(newMap);
		}
		props.setReset(resetNum);
		resetNum += 1;
	}

	// Manages the down arrow. Decreases the count by 1 if it isn't at the max.
	function downWeight() {
		var currentPref = props.preferenceMap.get(props.preference);
		if (currentPref === undefined) {
			throw console.error();
		}
		if (currentPref.weight > 0) {
			const newMap = new Map(props.preferenceMap);
			newMap.get(props.preference)?.downWeight();
			props.setPreferenceMap(newMap);
		}
		props.setReset(resetNum);
		resetNum += 1;
	}

	// Manages the up arrow. Increases the count by 1 if it isn't at the max
	function upValue() {
		var currentPref = props.preferenceMap.get(props.preference);
		if (currentPref === undefined) {
			throw console.error();
		}
		if (currentPref.value < 10) {
			const newMap = new Map(props.preferenceMap);
			newMap.get(props.preference)?.upValue();
			props.setPreferenceMap(newMap);
		}
		props.setReset(resetNum);
		resetNum += 1;
	}

	// Manages the down arrow. Decreases the count by 1 if it isn't at the max
	function downValue() {
		var currentPref = props.preferenceMap.get(props.preference);
		if (currentPref === undefined) {
			throw console.error();
		}
		if (currentPref.value > 0) {
			const newMap = new Map(props.preferenceMap);
			newMap.get(props.preference)?.downValue();
			props.setPreferenceMap(newMap);
		}
		props.setReset(resetNum);
		resetNum += 1;
	}

	return (
		<div>
			<table>
				<tr>
					<td>
						<p>Weight: {props.preferenceMap.get(props.preference)?.weight}</p>
					</td>
					<td>
						<table>
							<tr>
								<td>
									<button
										id="upButton"
										onClick={() => upWeight()}
										aria-label={`Increase weight for ${props.preference}`}
									>
										^
									</button>
								</td>
							</tr>
							<tr>
								<td>
									<button
										id="downButton"
										onClick={() => downWeight()}
										aria-label={`Decrease weight for ${props.preference}`}
									>
										v
									</button>
								</td>
							</tr>
						</table>
					</td>
					<td>
						<p>Value: {props.preferenceMap.get(props.preference)?.value}</p>
					</td>
					<td>
						<table>
							<tr>
								<td>
									<button id="upButton" onClick={() => upValue()} aria-label={`Increase value for ${props.preference}`}>
										^
									</button>
								</td>
							</tr>
							<tr>
								<td>
									<button
										id="downButton"
										onClick={() => downValue()}
										aria-label={`Decrease value for ${props.preference}`}
									>
										v
									</button>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</div>
	);
}
