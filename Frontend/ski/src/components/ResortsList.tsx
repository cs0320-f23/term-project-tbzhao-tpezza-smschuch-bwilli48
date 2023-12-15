import { unwatchFile } from "fs";
import { Dispatch, SetStateAction } from "react";
import "../styles/main.css";
import "../styles/index.css";
import { mockResortsPref, Resort } from "./resorts/ResortClass";

/**
 * Props for the resorts list. Includes just an array of the resorts.
 */
interface ResortsListProps {
	resortList: Resort[];
}

/**
 * Function that represents the list of resorts. Functions similiarly to a REPL history box.
 */
export function ResortsList(props: ResortsListProps) {
	return (
		<div className="resorts-list" aria-label="History Section, which lists the outputs of your previous commands">
			<h1>Resorts</h1>
			{props.resortList.map((resort) => (
				<p>{resort.name}</p>
			))}
		</div>
	);
}
