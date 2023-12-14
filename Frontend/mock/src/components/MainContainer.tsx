import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
import { Preferences } from "./Preferences";
import { ResortsList } from "./ResortsList";
import { Search } from "./Search";
import { Sort } from "./Sort";

/**
 * Props for the main container. Contains the array of resorts and a setter for said
 * array.
 */
interface MainContainerProps {
	resortList: string[];
	setResortList: Dispatch<SetStateAction<string[]>>;
}

/**
 * Function that represents the main component, containing the search bar, the sort
 * dropdown, the preferences table, and the resorts list.
 */
export default function MainContainer(props: MainContainerProps) {
	return (
		<div className="repl">
			<table id="mainTable">
				<tr>
					<td className="sortTableDatum">
						<table className="nested-table">
							<tr>
								<td>
									<Search resortList={props.resortList} setResortList={props.setResortList} />
								</td>
							</tr>
							<tr>
								<td>
									<Sort resortList={props.resortList} setResortList={props.setResortList} />
								</td>
							</tr>
						</table>
					</td>
					<td id="preferenceTableDatum">
						<Preferences resortList={props.resortList} setResortList={props.setResortList} />
					</td>
				</tr>
			</table>
			<br></br>
			<ResortsList resortList={props.resortList} />
		</div>
	);
}
