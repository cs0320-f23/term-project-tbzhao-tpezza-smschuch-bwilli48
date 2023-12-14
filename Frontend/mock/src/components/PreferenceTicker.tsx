import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { PreferenceAndValue } from "./Preferences";

/**
 * Props for the preference ticker. Includes a map from preference name to level, a setter for
 * said map, a setter for the reset number, and the preference name.
 */
interface PreferenceTickerProps {
  preferenceMap: Map<string, PreferenceAndValue>;
  setPreferenceMap: Dispatch<SetStateAction<Map<string, PreferenceAndValue>>>;
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
  function upWeight() {
    var currentPref = props.preferenceMap.get(props.preference);
    if (currentPref === undefined) {
      throw console.error();
    }
    if (currentPref.weight < 10) {
      props.preferenceMap.get(props.preference)?.upWeight();
    }
    props.setReset(resetNum);
    resetNum += 1;
  }

  /**
   * Function that manages the down arrow. Decreases the count by 1 if it isn't at the max
   * value already.
   */
  function downWeight() {
    var currentPref = props.preferenceMap.get(props.preference);
    if (currentPref === undefined) {
      throw console.error();
    }
    if (currentPref.weight > 0) {
      props.preferenceMap.get(props.preference)?.downWeight();
    }
    props.setReset(resetNum);
    resetNum += 1;
  }

  /**
   * Function that manages the up arrow. Increases the count by 1 if it isn't at the max
   * value already.
   */
  function upValue() {
    var currentPref = props.preferenceMap.get(props.preference);
    if (currentPref === undefined) {
      throw console.error();
    }
    props.preferenceMap.get(props.preference)?.upValue();
    props.setReset(resetNum);
    resetNum += 1;
  }

  /**
   * Function that manages the down arrow. Decreases the count by 1 if it isn't at the max
   * value already.
   */
  function downValue() {
    var currentPref = props.preferenceMap.get(props.preference);
    if (currentPref === undefined) {
      throw console.error();
    }
    props.preferenceMap.get(props.preference)?.downValue();
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
                    onClick={() => downWeight()}
                    aria-label="Submit button. Click the Submit button with the mouse or click the return key on your keyboard to enter the command you entered in the input box"
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
                  <button
                    id="upButton"
                    onClick={() => upValue()}
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
                    onClick={() => downValue()}
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
