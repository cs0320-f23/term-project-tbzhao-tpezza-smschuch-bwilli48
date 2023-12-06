import React, { useEffect, useState } from "react";

interface SortDropdownProps {
  sortOptions: string[];
  showDropDown: boolean;
  toggleDropDown: Function;
  sortOptionsSelection: Function;
}
export function SortDropdown(props: SortDropdownProps) {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  /**
   * Handle passing the city name
   * back to the parent component
   *
   * @param sortOption  The selected city
   */
  const onClickHandler = (sortOption: string): void => {
    props.sortOptionsSelection(sortOption);
  };

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <>
      <div>
        {props.sortOptions.map(
          (sortOption: string, index: number): JSX.Element => {
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
          }
        )}
      </div>
    </>
  );
}
