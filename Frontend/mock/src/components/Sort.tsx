import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
// import { path_to_data, search } from "../data/mockedJson";
import { path_to_data } from "../data/mockedJson";
import { SortDropdown } from "./SortDropdown";
import { sortResorts } from "./OrderResorts";

interface SortProps {
  resortList: string[];
  setResortList: Dispatch<SetStateAction<string[]>>;
}

export function Sort(props: SortProps) {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectSort, setSelectSort] = useState<string>("");
  const sortOptions = () => {
    return [
      "Recent Snowfall",
      "Vertical Drop",
      "Trail Count",
      "Ticket Cost",
      "Skiable Acres",
    ];
  };

  /**
   * Toggle the drop down menu
   */
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  /**
   * Hide the drop down menu if click occurs
   * outside of the drop-down element.
   *
   * @param event  The mouse event
   */
  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false);
    }
  };

  /**
   * Callback function to consume the
   * sort option
   *
   * @param sortOption  The selected options
   */
  const sortOptionsSelection = (sortOption: string): void => {
    setSelectSort(sortOption);
  };

  /**
   * Function to run when submut button is clicked
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
                onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
                  dismissHandler(e)
                }
              >
                <div>
                  {selectSort ? "Sort by: " + selectSort : "Select ..."}{" "}
                </div>
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
