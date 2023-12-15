import { unwatchFile } from "fs";
import { Dispatch, SetStateAction } from "react";
import "../../styles/main.css";
import { mockResortsPref, Resort } from "./ResortClass";
import { SingleResort } from "./SingleResort";

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
	if (props.resortList.length === 1) {
		if (props.resortList[0].name === "Resort Not Found") {
			return (
				<div className="resorts-list" aria-label="History Section, which lists the outputs of your previous commands">
					<p id="resortTitle">Resort Not Found</p>
				</div>
			);
		}
	}
	return (
		<div className="resorts-list" aria-label="History Section, which lists the outputs of your previous commands">
			<p id="resortTitle">Resorts</p>
			{props.resortList.map((resort) => (
				<SingleResort resort={resort} />
			))}
		</div>
	);
}
