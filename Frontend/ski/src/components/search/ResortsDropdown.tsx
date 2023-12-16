import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "../../styles/main.css";

/**
 * Properties for the ResortDropdown component.
 */
interface ResortDropdownProps {
	resortOptions: string[];
	showDropDown: boolean;
	toggleDropDown: () => void;
	resortOptionsSelection: (resortOption: string) => void;
	setCommandString: Dispatch<SetStateAction<string>>;
}

/**
 * Renders a dropdown menu with resort options. Allows a user to select a resort from
 * the dropdown. The selection is managed through a callback function.
 */
export function ResortDropdown(props: ResortDropdownProps) {
	return (
		<div className={props.showDropDown ? "dropdown-visible" : "dropdown-hidden"} aria-label="Resort options dropdown">
			{props.resortOptions.map((resortOption: string, index: number): JSX.Element => {
				return (
					<div
						key={index}
						onClick={(): void => {
							props.resortOptionsSelection(resortOption);
							props.setCommandString(resortOption);
							props.toggleDropDown();
						}}
						aria-label={`Select resort: ${resortOption}`}
					>
						<hr className="dropdownHR"></hr>
						<p>{resortOption}</p>
					</div>
				);
			})}
		</div>
	);
}
