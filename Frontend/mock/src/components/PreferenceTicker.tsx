import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { ResortDropdown } from "./ResortsDropdown";

interface PreferenceTickerProps {
  preferenceMap: Map<string, number>;
  setPreferenceMap: Dispatch<SetStateAction<Map<string, number>>>;
  setReset: Dispatch<number>;
  preference: string;
}

var resetNum = 1;

/**
 * this is the REPLInput function that returns that actual input components with
 * functionality
 *
 * @param props
 * @returns
 */
export function PreferenceTicker(props: PreferenceTickerProps) {
  function up() {
    var currentPref = props.preferenceMap.get(props.preference);
    if (currentPref === undefined) {
      throw console.error();
    }
    if (currentPref < 10) {
      props.setPreferenceMap(
        props.preferenceMap.set(props.preference, currentPref + 1)
      );
    }
    props.setReset(resetNum);
    resetNum += 1;
  }
  function down() {
    var currentPref = props.preferenceMap.get(props.preference);
    if (currentPref === undefined) {
      throw console.error();
    }
    if (currentPref > 0) {
      props.setPreferenceMap(
        props.preferenceMap.set(props.preference, currentPref - 1)
      );
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
