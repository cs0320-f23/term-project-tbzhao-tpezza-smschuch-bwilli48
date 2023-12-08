import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
// import { path_to_data, search } from "../data/mockedJson";
import { path_to_data } from "../data/mockedJson";
import { SortDropdown } from "./SortDropdown";
import { sortResorts } from "./OrderResorts";

/**
 * Props for the sort function. Includes the array of resorts and a setter for said array.
 */
interface SortProps {
	resortList: string[];
	setResortList: Dispatch<SetStateAction<string[]>>;
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
		return ["Recent Snowfall", "Vertical Drop", "Trail Count", "Ticket Cost", "Skiable Acres"];
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
		props.setResortList(sortResorts(selectSort));
	}

	return (
		//actually returning the input html dev thing
		<div
			className="repl-input"
			aria-label="Input section, which contains a input box where you can enter the commands you wish to run."
		>
			<table>
				<tr>
					<td className="sortTableDatum">
						<button
							id="sortButton"
							onClick={() => handleSubmit()}
							aria-label="Submit button. Click the Submit button with the mouse or click the return key on your keyboard to enter the command you entered in the input box"
						>
							Sort
						</button>
					</td>
					<td className="sortTableDatum">
						<div>
							<button
								id="sortDropdown"
								className={showDropDown ? "active" : undefined}
								onClick={(): void => toggleDropDown()}
								onBlur={(e: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(e)}
							>
								<div>{selectSort ? "Sort by: " + selectSort : "Select ..."} </div>
								{showDropDown && (
									<SortDropdown
										sortOptions={sortOptions()}
										showDropDown={false}
										toggleDropDown={(): void => toggleDropDown()}
										sortOptionsSelection={sortOptionsSelection}
									/>
								)}
							</button>
						</div>
					</td>
				</tr>
			</table>
		</div>
	);
}
