import "../styles/main.css";
import "../styles/index.css";
import { Dispatch, SetStateAction } from "react";

/**
 * Props for ControlledInput. The value in the input box, a setter for the value, an aria-label
 * for the input box, and an onKeyDown event for pressing Enter.
 */
interface ControlledInputProps {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	ariaLabel: "Command input box. Please enter command here and hit enter or click submit button";
	onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}

/**
 * Function that allows input into a command box in a controlled way. Has an aria-label for
 * accessibility and can be interacted with via the Enter key.
 */
export function ControlledInput({ value, setValue, ariaLabel, onKeyDown }: ControlledInputProps) {
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
