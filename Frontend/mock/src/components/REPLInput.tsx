import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
// import { path_to_data, search } from "../data/mockedJson";
import { path_to_data } from "../data/mockedJson";
import { REPLFunction, parseCommand } from "./DefaultFunctions";

interface REPLInputProps {
  history: [string, string | string[][]][];
  setHistory: Dispatch<SetStateAction<[string, string | string[][]][]>>;
  isBrief: boolean;
  setMode: Dispatch<SetStateAction<boolean>>;
  commandMap: Map<string, REPLFunction>;
  setCommandMap: Dispatch<SetStateAction<Map<string, REPLFunction>>>;
}

/**
 * this is the REPLInput function that returns that actual input components with
 * functionality
 *
 * @param props
 * @returns
 */
export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");
  const [selectedHistory, setSelectedHistory] = useState<number>(0);

  /**
   * Function to test if a function is a REPLFunction or undefined
   * @param func a function from the commandMap
   * @returns true if not undefined, false if undefined
   */
  function isFunc(func: REPLFunction | undefined): func is REPLFunction {
    return (func as REPLFunction) !== undefined;
  }

  /**
   * Function to run when submut button is clicked
   * @param commandString input by the user currently in the box when submit is clicked
   */
  function handleSubmit(commandString: string) {
    setSelectedHistory(0);
    if (commandString == "mode") {
      handleMode(commandString);
    } else {
      var args: string[] = [];
      try {
        args = parseCommand(commandString);
        if (props.commandMap.has(args[0])) {
          var func = props.commandMap.get(args[0]);
          if (isFunc(func)) {
            args.shift();
            var output = func(args);
            output.then((res) => {
              props.setHistory([[commandString, res], ...props.history]);
            });
          } else {
            //should never reach
            props.setHistory([
              [
                commandString,
                "Function does not follow REPLFunction interface.",
              ],
              ...props.history,
            ]);
          }
        } else {
          props.setHistory([
            [commandString, "Invalid command"],
            ...props.history,
          ]);
        }
      } catch (error) {
        props.setHistory([
          [
            commandString,
            "Improper input. Follow input style: command, command <arg>, command <arg1> <arg2>, etc.",
          ],
          ...props.history,
        ]);
      }
    }
    setCommandString("");
  }

  /**
   * Function to hand mode command
   * @param command string "mode" since only called after string is checked to be mode
   */
  function handleMode(command: string) {
    var output = "";
    if (props.isBrief) {
      props.setMode(false);
      output = "Mode was set to verbose";
    } else {
      props.setMode(true);
      output = "Mode was set to brief";
    }
    props.setHistory([[commandString, output], ...props.history]);
  }

  return (
    //actually returning the input html dev thing
    <div
      className="repl-input"
      aria-label="Input section, which contains a input box where you can enter the commands you wish to run."
    >
      <fieldset>
        <legend>Enter a command:</legend>
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
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              if (selectedHistory == 0) {
                setCommandString(props.history[selectedHistory][0]);
                setSelectedHistory(1);
              } else if (selectedHistory < history.length - 1) {
                setSelectedHistory(selectedHistory + 1);
                setCommandString(props.history[selectedHistory][0]);
              }
            } else if (event.key === "ArrowDown") {
              event.preventDefault();
              if (selectedHistory == 1) {
                setCommandString(props.history[selectedHistory - 1][0]);
              } else if (selectedHistory > 0) {
                setSelectedHistory(selectedHistory - 1);
                setCommandString(props.history[selectedHistory - 1][0]);
              }
            }
          }}
        />
      </fieldset>
      <button
        onClick={() => handleSubmit(commandString)}
        aria-label="Submit button. Click the Submit button with the mouse or click the return key on your keyboard to enter the command you entered in the input box"
      >
        Submit
      </button>
    </div>
  );
}
