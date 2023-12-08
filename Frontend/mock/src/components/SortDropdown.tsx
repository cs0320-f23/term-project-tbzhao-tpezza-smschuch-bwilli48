import React, { useEffect, useState } from "react";

/**
 * Props for the sort dropdown. Includes an array of sort options, a boolean for whether to show
 * the dropdown, a function to toggle the dropdown, and a function to sort the options
 */
interface SortDropdownProps {
	sortOptions: string[];
	showDropDown: boolean;
	toggleDropDown: Function;
	sortOptionsSelection: Function;
}

/**
 * Function that represents the sort dropdown menu. Contains a list of the ways that the
 * resorts can be sorted and responds to clicks.
 */
export function SortDropdown(props: SortDropdownProps) {
	// State for whether to show the dropdown.
	const [showDropDown, setShowDropDown] = useState<boolean>(false);

	/**
	 * Handles passing the city name back to the parent component on mouse click.
	 * @param sortOption  The selected city
	 */
	const onClickHandler = (sortOption: string): void => {
		props.sortOptionsSelection(sortOption);
	};

	/**
	 * UseEffect that updates showDropDown on change.
	 */
	useEffect(() => {
		setShowDropDown(showDropDown);
	}, [showDropDown]);

	return (
		<>
			<div>
				{props.sortOptions.map((sortOption: string, index: number): JSX.Element => {
					return (
						<div>
							<hr className="dropdownHR"></hr>
							<p
								key={index}
								onClick={(): void => {
									onClickHandler(sortOption);
								}}
							>
								{sortOption}
							</p>
						</div>
					);
				})}
			</div>
		</>
	);
}
