import "../../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { ResortDropdown } from "./ResortsDropdown";
import {
  getMockSearchResort,
  getSearchResort,
  mockResortNames,
  mockResortsSearch,
  Resort,
  resortNames,
} from "../resorts/ResortClass";

/**
 * Properties for the Search component.
 */
interface SearchProps {
  resortList: Resort[];
  setResortList: Dispatch<SetStateAction<Resort[]>>;
  mockMode: boolean;
}

/**
 * Provides an interface for searching resorts by name. Includes a text input for
 * entering search commands, a search button, and a dropdown menu that lists resorts.
 */
export function Search(props: SearchProps) {
  // State that manages whether the see resorts dropdown is shown
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  // State that manages the search box.
  const [selectResort, setSelectResort] = useState<string>("");

  // State the manages the command string
  const [commandString, setCommandString] = useState<string>("");

  var resorts: string[] = props.mockMode ? mockResortNames() : resortNames();

  /**
   * Toggles the visibility of the dropdown menu.
   */
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  /**
   * Handles closing the dropdown menu if an outside click is detected.
   */
  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false);
    }
  };

  /**
   * Sets the currently selected resort from the dropdown.
   * @param {string} resortOption - The resort option that was selected.
   */
  const resortOptionsSelection = (resortOption: string): void => {
    setSelectResort(resortOption);
  };

  /**
   * Handles a search button click by updating the resort list accordingly.
   * @param {string} commandString - The resort to search for.
   */
  function handleSearch(commandString: string) {
    if (commandString !== "") {
      if (props.mockMode) {
        props.setResortList(getMockSearchResort(commandString));
      } else {
        var output = getSearchResort(commandString);
        output.then((res) => {
          props.setResortList([res]);
        });
      }
    }
    setCommandString("");
  }

  return (
    <div className="search-container" aria-label="Resort search section">
      <h3 className="search-title">Search for a specific resort:</h3>
      <ControlledInput
        value={commandString}
        setValue={setCommandString}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            handleSearch(commandString);
          }
        }}
      />
      <button
        className="search-button"
        id="searchButton"
        onClick={() => handleSearch(commandString)}
        aria-label="Search for a resort"
      >
        Search
      </button>
      <button
        id="searchDropdown"
        className={`search-dropdown ${showDropDown ? "active" : ""}`}
        onClick={toggleDropDown}
        onBlur={dismissHandler}
        aria-label="Show or hide resort list dropdown"
      >
        {selectResort ? "See resorts ..." : " See full list of resorts..."}
        {showDropDown && (
          <ResortDropdown
            resortOptions={resorts}
            showDropDown={showDropDown}
            toggleDropDown={toggleDropDown}
            resortOptionsSelection={resortOptionsSelection}
            setCommandString={setCommandString}
          />
        )}
      </button>
    </div>
  );
}
