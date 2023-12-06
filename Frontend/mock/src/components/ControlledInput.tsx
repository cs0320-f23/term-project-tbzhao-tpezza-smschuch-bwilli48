import "../styles/main.css";
import { Dispatch, SetStateAction } from "react";

// Remember that parameter names don't necessarily need to overlap;
// I could use different variable names in the actual function.
interface ControlledInputProps {
  value: string;
  // This type comes from React+TypeScript. VSCode can suggest these.
  //   Concretely, this means "a function that sets a state containing a string"
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: "Command input box. Please enter command here and hit enter or click submit button";
  // Hitting enter key
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}

// Input boxes contain state. We want to make sure React is managing that state,
//   so we have a special component that wraps the input box.
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
  onKeyDown,
}: ControlledInputProps) {
  return (
    <input
      id="searchInput"
      type="input"
      className="repl-command-box"
      value={value}
      placeholder="Search resort"
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
    ></input>
  );
}
