import { unwatchFile } from "fs";
import { Dispatch, SetStateAction } from "react";
import "../styles/main.css";
import "../styles/index.css";
import { mockResortsPref, Resort } from "./resorts/ResortClass";
import { SingleResort } from "./resorts/SingleResort";

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
    <div
      className="resorts-list"
      aria-label="History Section, which lists the outputs of your previous commands"
    >
      <p id="resortTitle">Resorts</p>
      {props.resortList.map((resort) => (
        <SingleResort resort={resort} />
      ))}
    </div>
  );
}
