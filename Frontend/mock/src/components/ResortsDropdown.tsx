import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

/**
 * Props for ResortDropdown. An array of resort options, whether to show the dropdown,
 * a function to toggle the dropdown, and a function to select a resort, and a state
 * to set the command string.
 */
interface ResortDropdownProps {
  resortOptions: string[];
  showDropDown: boolean;
  toggleDropDown: Function;
  resortOptionsSelection: Function;
  setCommandString: Dispatch<SetStateAction<string>>;
}

/**
 * The dropdown menu of resorts. Passes the city name back to the parent component when
 * it is clicked and handles hiding and showing the menu.
 */
export function ResortDropdown(props: ResortDropdownProps) {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  /**
   * Handler for passing the city name back to the parent component on click.
   * @param resortOption The selected city
   */
  const onClickHandler = (resortOption: string): void => {
    props.resortOptionsSelection(resortOption);
    props.setCommandString(resortOption);
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
        {props.resortOptions.map(
          (resortOption: string, index: number): JSX.Element => {
            return (
              <div>
                <hr className="dropdownHR"></hr>
                <p
                  key={index}
                  onClick={(): void => {
                    onClickHandler(resortOption);
                  }}
                >
                  {resortOption}
                </p>
              </div>
            );
          }
        )}
      </div>
    </>
  );
}
