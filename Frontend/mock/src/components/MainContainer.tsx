import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
import "../styles/index.css";
import { Preferences } from "./Preferences";
import { Resort } from "./resorts/ResortClass";
import { ResortsList } from "./ResortsList";
import { Search } from "./Search";
import { Sort } from "./Sort";

/**
 * Props for the main container. Contains the array of resorts and a setter for said
 * array.
 */
interface MainContainerProps {
	resortList: Resort[];
	setResortList: Dispatch<SetStateAction<Resort[]>>;
}

/**
 * Function that represents the main component, containing the search bar, the sort
 * dropdown, the preferences table, and the resorts list.
 */
export default function MainContainer(props: MainContainerProps) {}
