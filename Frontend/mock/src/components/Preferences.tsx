import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { PreferenceTicker } from "./PreferenceTicker";

interface PreferencesProps {
  resortList: string[];
  setResortList: Dispatch<SetStateAction<string[]>>;
}

/**
 * this is the REPLInput function that returns that actual input components with
 * functionality
 *
 * @param props
 * @returns
 */
export function Preferences(props: PreferencesProps) {
  var initialPrefs = new Map<string, number>([
    ["Snowfall", 5],
    ["Weather", 5],
    ["Affordability", 5],
    ["Trail Count", 5],
    ["Vertical Drop", 5],
    ["Base Snow", 5],
  ]);
  const [preferenceMap, setPreferenceMap] =
    useState<Map<string, number>>(initialPrefs);

  const [resest, setReset] = useState<number>(0);
  /**
   * Function to run when submut button is clicked
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
