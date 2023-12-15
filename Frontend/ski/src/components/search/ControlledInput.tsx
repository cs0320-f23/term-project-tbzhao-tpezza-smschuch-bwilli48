import "../../styles/main.css";
import { Dispatch, SetStateAction } from "react";

/**
 * Properties for the ControlledInput component.
 */
interface ControlledInputProps {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}

/**
 * Renders a text input field which is controlled by React state. Updates the state
 * based on user input and supports keyboard navigation.
 *
 * @param {ControlledInputProps} props - Props for the ControlledInput component.
 * @returns {React.ReactElement} A controlled input element with a specified value and change handler.
 */
export function ControlledInput({ value, setValue, onKeyDown }: ControlledInputProps) {
	return (
		<input
			id="searchInput"
			type="text"
			className="search-box"
			value={value}
			placeholder="Enter resort name here..."
			onChange={(ev) => setValue(ev.target.value)}
			aria-label="Search resorts"
			onKeyDown={onKeyDown}
		/>
	);
}
