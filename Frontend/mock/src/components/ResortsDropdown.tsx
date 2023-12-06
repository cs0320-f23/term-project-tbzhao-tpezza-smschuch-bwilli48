import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ResortDropdownProps {
  resortOptions: string[];
  showDropDown: boolean;
  toggleDropDown: Function;
  resortOptionsSelection: Function;
  setCommandString: Dispatch<SetStateAction<string>>;
}
export function ResortDropdown(props: ResortDropdownProps) {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  /**
   * Handle passing the city name
   * back to the parent component
   *
   * @param resortOption  The selected city
   */
  const onClickHandler = (resortOption: string): void => {
    props.resortOptionsSelection(resortOption);
    props.setCommandString(resortOption);
  };

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
