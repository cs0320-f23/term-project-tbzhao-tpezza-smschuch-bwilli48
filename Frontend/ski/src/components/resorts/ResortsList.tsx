import "../../styles/main.css";
import { Resort } from "./ResortClass";
import { SingleResort } from "./SingleResort";

/**
 * Properties for the ResortsList component.
 */
interface ResortsListProps {
	resortList: Resort[];
}

/**
 * Renders a list of resorts. Displays "Resort Not Found" if the search yields no results,
 * or a list of resorts otherwise. Functions similarly to a REPL history box, listing the
 * outputs of previous commands.
 */
export function ResortsList(props: ResortsListProps) {
	if (props.resortList.length === 1 && props.resortList[0].name === "Resort Not Found") {
		return (
			<div className="resorts-list" aria-label="No resorts found">
				<p id="resortTitle">Resort Not Found</p>
			</div>
		);
	}
	return (
		<div className="resorts-list" aria-label="List of resorts">
			<p id="resortTitle">Resorts</p>
			{props.resortList.map((resort, index) => (
				<SingleResort key={index} resort={resort} />
			))}
		</div>
	);
}
