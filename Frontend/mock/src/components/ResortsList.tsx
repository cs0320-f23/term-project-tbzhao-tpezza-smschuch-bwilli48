import { unwatchFile } from "fs";
import "../styles/main.css";

interface ResortsListProps {
  resortList: string[];
}
/**
 * This is the REPLHistory function that returns the maps all the things inside of
 * the history into either a brief or verbose single history depending on the mode.
 * @param props
 * @returns
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
