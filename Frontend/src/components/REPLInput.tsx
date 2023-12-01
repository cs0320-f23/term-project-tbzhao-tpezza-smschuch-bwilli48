import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
// import { path_to_data, search } from "../data/mockedJson";
import { path_to_data } from "../data/mockedJson";

/**
 * this is the REPLInput function that returns that actual input components with
 * functionality
 *
 * @param props
 * @returns
 */
export function REPLInput() {
  const [commandString, setCommandString] = useState<string>("");
  const [selectedHistory, setSelectedHistory] = useState<number>(0);

  /**
   * Function to run when submut button is clicked
   * @param commandString input by the user currently in the box when submit is clicked
   */
  function handleSubmit(commandString: string) {
    console.log(commandString);
    setCommandString("");
  }

  return (
    <div
      className="repl-input"
      aria-label="Input section, which contains a input box where you can enter the commands you wish to run."
    >
      <table>
        <tr>
          <td>
            <button
              id="searchButton"
              onClick={() => handleSubmit(commandString)}
              aria-label="Submit button. Click the Submit button with the mouse or click the return key on your keyboard to enter the command you entered in the input box"
            >
              Search
            </button>
          </td>
          <td>
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
        </tr>
      </table>
    </div>
  );
}
