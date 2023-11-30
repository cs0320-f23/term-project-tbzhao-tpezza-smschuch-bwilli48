import "../styles/main.css";
import { ViewTable } from "./ViewTable";

/**
 * Interface for VerboseSingleHistory
 * Takes in a history state
 */
export interface VerboseSingleHistoryProps {
  history: [string, string | string[][]];
}

/**
 * Function for designing the individual verbose history
 * @param props a history state, a tuple, which has the
 * command and output to be displayed
 * @returns A div with the output in "verbose" style
 */
export function VerboseSingleHistory(props: VerboseSingleHistoryProps) {
  const command: string = props.history[0];
  const output: string | string[][] = props.history[1];
  if (Array.isArray(output)) {
    return (
      <div aria-label="Unique segment of history section">
        {"Command : " + command}
        <br></br>
        {"Output: "}
        <br></br>
        <ViewTable tableOutput={output} />
        <hr></hr>
      </div>
    );
  } else {
    return (
      <div aria-label="Unique segment of history section">
        {"Command: " + command}
        <br></br>
        {"Output: " + output}
        <hr></hr>
      </div>
    );
  }
}
