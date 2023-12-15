import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "../ControlledInput";
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
 * Props for the search bar. Includes the array of resorts and a setter for said array.
 */
interface SearchProps {
	resortList: Resort[];
	setResortList: Dispatch<SetStateAction<Resort[]>>;
	mockMode: boolean;
}

/**
 * Function that represents the search component. Handles a command box, a search button,
 * an a dropdown box containing the list of resorts.
 */
export function Search(props: SearchProps) {
	// State that manages whether the see resorts dropdown is shown
	const [showDropDown, setShowDropDown] = useState<boolean>(false);

	// State that manages the search box.
	const [selectResort, setSelectResort] = useState<string>("");

	// State the manages the command string
	const [commandString, setCommandString] = useState<string>("");

	var resorts: string[] = [];
	if (props.mockMode) {
		resorts = mockResortNames();
	} else {
		resorts = resortNames();
	}

	/**
	 * Toggle for the see resorts dropdown menu
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
	 * Callback function to consume the resort option
	 * @param resortOption The selected options
	 */
	const resortOptionsSelection = (resortOption: string): void => {
		setSelectResort(resortOption);
	};

	/**
	 * Function that updates the resort list when the submut button is clicked
	 * @param commandString input by the user currently in the box when submit is clicked
	 */
	function handleSubmit(commandString: string) {
		if (commandString === "") {
		} else {
			if (props.mockMode) {
				props.setResortList(getMockSearchResort(commandString));
			} else {
				props.setResortList(getSearchResort(commandString));
			}
		}
		setCommandString("");
	}

	return (
		<div className="search-container">
			<h3 className="search-title">Search for a specific resort:</h3>
			<ControlledInput
				value={commandString}
				setValue={setCommandString}
				ariaLabel="Command input box. Please enter command here and hit enter or click submit button"
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						event.preventDefault();
						handleSubmit(commandString);
					}
				}}
			/>
			<button
				className="search-button"
				id="searchButton"
				onClick={() => handleSubmit(commandString)}
				aria-label="Click the Search button to perform the search"
			>
				Search
			</button>
			<button
				id="searchDropdown"
				className={`search-dropdown ${showDropDown ? "active" : ""}`}
				onClick={toggleDropDown}
				onBlur={dismissHandler}
			>
				{selectResort ? "See resorts ..." : " See full list of resorts..."}
				{showDropDown && (
					<ResortDropdown
						resortOptions={resorts}
						showDropDown={false}
						toggleDropDown={toggleDropDown}
						resortOptionsSelection={resortOptionsSelection}
						setCommandString={setCommandString}
					/>
				)}
			</button>
		</div>
	);
}
