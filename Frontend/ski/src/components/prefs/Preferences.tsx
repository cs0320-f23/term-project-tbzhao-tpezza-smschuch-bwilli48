import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { PreferenceTicker } from "./PreferenceTicker";
import {
  getMockRankedResorts,
  getRankedResorts,
  Resort,
} from "../resorts/ResortClass";
import "../../styles/main.css";

// Properties for the Preferences component.
interface PreferencesProps {
  resortList: Resort[];
  setResortList: Dispatch<SetStateAction<Resort[]>>;
  preferences: UserPreferences | null;
  onSavePreferences: (newPreferences: UserPreferences) => void;
  mockMode: boolean;
}

// Types used for account preference saving.
export type UserPreferences = Map<string, PreferenceItem>;
export type PreferenceItem = {
  weight: number;
  value: number;
};

// Class representing a weight-value pair for a preference.
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
  upValue(jump: number) {
    this.value += jump;
  }
  downValue(jump: number) {
    this.value -= jump;
  }
}

/**
 * Renders a table of user preferences regarding resort conditions. Users can adjust the
 * weight and value of each preference, which is used to sort the list of resorts.
 */
export function Preferences(props: PreferencesProps) {
  // Initial preferences that are set for a new user.
  var initialPrefs = new Map<string, PreferenceAndValue>([
    ["Snowfall Amount", new PreferenceAndValue(5, 6)],
    ["Last Snowfall", new PreferenceAndValue(5, 2)],
    ["Base-depth", new PreferenceAndValue(5, 40)],
    ["Price", new PreferenceAndValue(5, 110)],
    ["Lifts Open", new PreferenceAndValue(5, 6)],
    ["Summit Elevation", new PreferenceAndValue(5, 9000)],
    ["Temperature", new PreferenceAndValue(5, 25)],
    ["Windspeed", new PreferenceAndValue(5, 10)],
  ]);

  /**
   * Converts the UserPreferences object to a map of string to PreferenceAndValue.
   * @param userPrefs The UserPreferences object to convert.
   * @returns map representing the user preferences.
   */
  const convertUserPrefsToMap = (
    userPrefs: UserPreferences | null
  ): Map<string, PreferenceAndValue> => {
    const map = new Map<string, PreferenceAndValue>();
    if (userPrefs) {
      userPrefs.forEach((prefItem, key) => {
        map.set(key, new PreferenceAndValue(prefItem.weight, prefItem.value));
      });
    } else {
      // Populate map with initial preferences if userPrefs is null
      initialPrefs.forEach((value, key) => {
        map.set(key, new PreferenceAndValue(value.weight, value.value));
      });
    }
    return map;
  };

  // State for the preference map.
  const [preferenceMap, setPreferenceMap] = useState<
    Map<string, PreferenceAndValue>
  >(() => convertUserPrefsToMap(props.preferences));

  // State for the reset object.
  const [reset, setReset] = useState<number>(0);

  /**
   * Updates the resort list based on a user's custom preferences.
   */
  function handlePrefSearch() {
    if (props.mockMode) {
      props.setResortList(getMockRankedResorts(preferenceMap));
    } else {
      props.setResortList(getRankedResorts(preferenceMap));
    }
  }

  /**
   * Handles saving the current state of user preferences. Triggered when the
   * 'Save to Account' button is clicked.
   */
  const handleSaveClick = () => {
    const updatedPreferences: UserPreferences = new Map(preferenceMap);
    props.onSavePreferences(updatedPreferences);
  };

  /**
   * useEffect hook to update the preferenceMap state whenever the props.preferences changes.
   */
  useEffect(() => {
    if (props.preferences !== null) {
      setPreferenceMap(convertUserPrefsToMap(props.preferences));
    }
  }, [props.preferences]);

  return (
    <div className="preferences-container">
      <div className="preferences-header">
        <h2>Preferences</h2>
        <button
          id="savePreferencesButton"
          onClick={handleSaveClick}
          aria-label="Save preferences to your account"
        >
          Save to Account
        </button>
      </div>
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
              valueJump={1}
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
              valueJump={1}
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
              valueJump={5}
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
              valueJump={5}
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
              valueJump={1}
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
              valueJump={100}
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
              valueJump={1}
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
              valueJump={1}
            />
          </td>
        </tr>
      </table>
      <button
        id="preferenceButton"
        onClick={() => handlePrefSearch()}
        aria-label="Search resorts based on preferences"
      >
        Search By Preferences
      </button>
    </div>
  );
}
