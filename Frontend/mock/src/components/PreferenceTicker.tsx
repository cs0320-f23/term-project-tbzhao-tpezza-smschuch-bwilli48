import "../styles/main.css";
import "../styles/index.css";
import { Dispatch, SetStateAction, useState } from "react";

/**
 * Props for the preference ticker. Includes a map from preference name to level, a setter for
 * said map, a setter for the reset number, and the preference name.
 */
interface PreferenceTickerProps {
	preferenceMap: Map<string, number>;
	setPreferenceMap: Dispatch<SetStateAction<Map<string, number>>>;
	setReset: Dispatch<number>;
	preference: string;
}

var resetNum = 1;

/**
 * Function that manages a preference ticker. Contains functions for the up and down arrows
 * and returns a preference next to the two arrows.
 */
export function PreferenceTicker(props: PreferenceTickerProps) {
	/**
	 * Function that manages the up arrow. Increases the count by 1 if it isn't at the max
	 * value already.
	 */
	function up() {
		var currentPref = props.preferenceMap.get(props.preference);
		if (currentPref === undefined) {
			throw console.error();
		}
		if (currentPref < 10) {
			props.setPreferenceMap(props.preferenceMap.set(props.preference, currentPref + 1));
		}
		props.setReset(resetNum);
		resetNum += 1;
	}

	/**
	 * Function that manages the down arrow. Decreases the count by 1 if it isn't at the max
	 * value already.
	 */
	function down() {
		var currentPref = props.preferenceMap.get(props.preference);
		if (currentPref === undefined) {
			throw console.error();
		}
		if (currentPref > 0) {
			props.setPreferenceMap(props.preferenceMap.set(props.preference, currentPref - 1));
		}
		props.setReset(resetNum);
		resetNum += 1;
	}

	return (
		<div>
			<table>
				<tr>
					<td>
						<p>{props.preferenceMap.get(props.preference)}</p>
					</td>
					<td>
						<table>
							<tr>
								<td>
									<button
										id="upButton"
										onClick={() => up()}
										aria-label="Submit button. Click the Submit button with the mouse or click the return key on your keyboard to enter the command you entered in the input box"
									>
										^
									</button>
								</td>
							</tr>
							<tr>
								<td>
									<button
										id="downButton"
										onClick={() => down()}
										aria-label="Submit button. Click the Submit button with the mouse or click the return key on your keyboard to enter the command you entered in the input box"
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
