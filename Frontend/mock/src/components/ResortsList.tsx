import { unwatchFile } from "fs";
import "../styles/main.css";

/**
 * Props for the resorts list. Includes just an array of the resorts.
 */
interface ResortsListProps {
	resortList: string[];
}

/**
 * Function that represents the list of resorts. Functions similiarly to a REPL history box.
 */
export function ResortsList(props: ResortsListProps) {
	return (
		<div
			id="listDiv"
			className="repl-history"
			aria-label="History Section, which lists the outputs of your previous commands"
		>
			<h1>Resorts</h1>
			{props.resortList.map((command) => (
				<div>{command}</div>
			))}
		</div>
	);
}
