import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { SortDropdown } from "./SortDropdown";
import {
  getMockSortedResorts,
  getSortedResorts,
  mockResortsSort,
  Resort,
} from "./resorts/ResortClass";

/**
 * Props for the sort function. Includes the array of resorts and a setter for said array.
 */
interface SortProps {
  resortList: Resort[];
  setResortList: Dispatch<SetStateAction<Resort[]>>;
  mockMode: boolean;
}

/**
 * Function that represents the sort menu. Handles a dropdown box with the avaliable
 * sort methods and a button that performs the sorting.
 */
export function Sort(props: SortProps) {
  // State for whether to show the dropdown menu.
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  // State for the text in the select box.
  const [selectSort, setSelectSort] = useState<string>("");

  // The options that users can sort by.
  const sortOptions = () => {
    return [
      "Snowfall Amount",
      "Last Snowfall",
      "Base-depth",
      "Price",
      "Lifts Open",
      "Summit Elevation",
      "Temperature",
      "Windspeed",
    ];
  };

  /**
   * Toggle the select drop down menu
   */
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  /**
   * Handler that hides the dropdown menu if a click occurs outside of the dropdown element.
   * @param event The mouse event
   */
  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false);
    }
  };

  /**
   * Callback function to consume the sort option
   * @param sortOption The selected options
   */
  const sortOptionsSelection = (sortOption: string): void => {
    setSelectSort(sortOption);
  };

  /**
   * Function that updates the resort list when the submut button is clicked
   * @param commandString input by the user currently in the box when submit is clicked
   */
  function handleSubmit() {
    if (selectSort === "") {
    } else {
      if (props.mockMode) {
        props.setResortList(getMockSortedResorts(selectSort));
      } else {
        props.setResortList(getSortedResorts(selectSort));
      }
    }
  }

  return (
    <div className="sort-container">
      <h3 className="sort-title">Select a sort method:</h3>
      <button
        id="sortDropdown"
        className={`sort-dropdown ${showDropDown ? "active" : ""}`}
        onClick={() => toggleDropDown()}
        onBlur={dismissHandler}
      >
        {selectSort ? `Sort by: ${selectSort}` : "See methods..."}
        {showDropDown && (
          <SortDropdown
            sortOptions={sortOptions()}
            showDropDown={false}
            toggleDropDown={toggleDropDown}
            sortOptionsSelection={sortOptionsSelection}
          />
        )}
      </button>
      <button
        id="sortButton"
        className="sort-button"
        onClick={handleSubmit}
        aria-label="Click the Sort button to apply the sorting method"
      >
        Sort
      </button>
    </div>
  );
}
