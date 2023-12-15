import "../../styles/main.css";
import React, { useEffect, useState } from "react";

/**
 * Properties for the SortDropdown component.
 */
interface SortDropdownProps {
	sortOptions: string[];
	showDropDown: boolean;
	toggleDropDown: Function;
	sortOptionsSelection: Function;
}

/**
 * Renders a dropdown menu with sorting options. Allows a user to select a sorting
 * method for the resort list. The selection is managed through a callback.
 */
export function SortDropdown(props: SortDropdownProps) {
	/**
	 * Calls the sortOptionsSelection function with the chosen sort option.
	 * @param {string} sortOption - The sort option selected by the user.
	 */
	const sortClickHandler = (sortOption: string): void => {
		props.sortOptionsSelection(sortOption);
	};

	return (
		<div className={props.showDropDown ? "dropdown-visible" : "dropdown-hidden"} aria-label="Sort options dropdown">
			{props.sortOptions.map((sortOption: string, index: number): JSX.Element => {
				return (
					<div
						key={index}
						className="dropdown-item"
						onClick={(): void => sortClickHandler(sortOption)}
						aria-label={`Sort by ${sortOption}`}
					>
						<hr className="dropdownHR"></hr>
						<p>{sortOption}</p>
					</div>
				);
			})}
		</div>
	);
}
