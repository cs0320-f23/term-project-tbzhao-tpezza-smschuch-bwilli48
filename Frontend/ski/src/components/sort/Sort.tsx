import "../../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { SortDropdown } from "./SortDropdown";
import { getMockSortedResorts, getSortedResorts, mockResortsSort, Resort } from "../resorts/ResortClass";

// Properties for the Sort component.
interface SortProps {
	resortList: Resort[];
	setResortList: Dispatch<SetStateAction<Resort[]>>;
	mockMode: boolean;
}

/**
 * Allows users to select a sorting method for the list of resorts. Handles the display
 * of sorting options via a dropdown menu and applies the selected sort method.
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

	// Toggles the visibility of the dropdown menu.
	const toggleDropDown = () => {
		setShowDropDown(!showDropDown);
	};

	/**
	 * Handler that hides the dropdown menu if a click occurs outside of the dropdown element.
	 */
	const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
		if (event.currentTarget === event.target) {
			setShowDropDown(false);
		}
	};

	/**
	 * Sets the currently selected sort option.
	 * @param sortOption The selected options
	 */
	const sortOptionsSelection = (sortOption: string): void => {
		setSelectSort(sortOption);
	};

	/**
	 * Updates the resort list based on the selected sort method.
	 */
	function handleSort() {
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
		<div className="sort-container" aria-label="Sort resorts section">
			<h3 className="sort-title">Select a sort method:</h3>
			<button
				id="sortDropdown"
				className={`sort-dropdown ${showDropDown ? "active" : ""}`}
				onClick={() => toggleDropDown()}
				onBlur={dismissHandler}
				aria-label="Sort methods dropdown"
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
				onClick={handleSort}
				aria-label={selectSort ? `Sort resorts by ${selectSort}` : "Sort resorts by selected method"}
			>
				Sort
			</button>
		</div>
	);
}
