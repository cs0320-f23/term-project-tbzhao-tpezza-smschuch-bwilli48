import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { ResortDropdown } from "./ResortsDropdown";

interface SearchProps {
  resortList: string[];
  setResortList: Dispatch<SetStateAction<string[]>>;
}

/**
 * this is the REPLInput function that returns that actual input components with
 * functionality
 *
 * @param props
 * @returns
 */
export function Search(props: SearchProps) {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectResort, setSelectResort] = useState<string>("");
  const resortOptions = () => {
    return [
      "Araphoe Basin",
      "Big Sky",
      "Jay Peak",
      "Jackson Hole",
      "Killington",
      "Smuggler's Notch",
      "Snowbird",
      "Sugarbush",
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
   * resort option
   *
   * @param resortOption  The selected options
   */
  const resortOptionsSelection = (resortOption: string): void => {
    setSelectResort(resortOption);
  };

  const [commandString, setCommandString] = useState<string>("");

  /**
   * Function to run when submut button is clicked
   * @param commandString input by the user currently in the box when submit is clicked
   */
  function handleSubmit(commandString: string) {
    props.setResortList([commandString, ...props.resortList]);
    setCommandString("");
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
              id="searchButton"
              onClick={() => handleSubmit(commandString)}
              aria-label="Submit button. Click the Submit button with the mouse or click the return key on your keyboard to enter the command you entered in the input box"
            >
              Search
            </button>
          </td>
          <td className="sortTableDatum">
            <ControlledInput
              value={commandString}
              setValue={setCommandString}
              ariaLabel={
                "Command input box. Please enter command here and hit enter or click submit button"
              }
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === "Enter") {
                  // This will prevent the default behvior of enter/return
                  event.preventDefault();

                  // Will execute handle submit when enter is pressed
                  handleSubmit(commandString);
                }
              }}
            />
          </td>
          <td className="sortTableDatum">
            <div>
              <button
                id="searchDropdown"
                className={showDropDown ? "active" : undefined}
                onClick={(): void => toggleDropDown()}
                onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
                  dismissHandler(e)
                }
              >
                <div>
                  {selectResort ? "See resorts ..." : " See resorts ..."}{" "}
                </div>
                {showDropDown && (
                  <ResortDropdown
                    resortOptions={resortOptions()}
                    showDropDown={false}
                    toggleDropDown={(): void => toggleDropDown()}
                    resortOptionsSelection={resortOptionsSelection}
                    setCommandString={setCommandString}
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
