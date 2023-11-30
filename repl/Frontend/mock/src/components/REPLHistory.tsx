import { unwatchFile } from "fs";
import { isUndefined } from "util";
import "../styles/main.css";
import { BriefSingleHistory } from "./BriefSingleHistory";
import { VerboseSingleHistory } from "./VerboseSingleHistory";

interface REPLHistoryProps {
  history: [string, string | string[][]][];
  isBrief: boolean;
}
/**
 * This is the REPLHistory function that returns the maps all the things inside of
 * the history into either a brief or verbose single history depending on the mode.
 * @param props
 * @returns
 */
export function REPLHistory(props: REPLHistoryProps) {
  if (props.isBrief == undefined) {
    throw console.error();
  }
  if (props.isBrief) {
    props.history.map(([command, output]) => isUnd(command, output));
    return (
      <div
        className="repl-history"
        aria-label="History Section, which lists the outputs of your previous commands"
      >
        {props.history.map(([command, output]) => (
          <BriefSingleHistory history={[command, output]} />
        ))}
      </div>
    );
  } else {
    return (
      <div
        className="repl-history"
        aria-label="History Section, which lists the outputs of your previous commands"
      >
        {props.history.map(([command, output]) => (
          <VerboseSingleHistory history={[command, output]} />
        ))}
      </div>
    );
  }
}

function isUnd(item1: string, item2: string | string[][]) {
  if (item1 == undefined) {
    throw console.error();
  }
  if (item2 == undefined) {
    throw console.error();
  }
}
