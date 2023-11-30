import "../styles/main.css";
import { ViewTable } from "./ViewTable";

/**
 * Interface for BriefSingleHistory
 * Takes in a history state
 */
export interface BriefSingleHistoryProps {
  history: [string, string | string[][]];
}

/**
 * Function for designing the individual brief history
 * @param props a history state, a tuple, which has the
 * command and output to be displayed
 * @returns A div with the output in "brief" style
 */
export function BriefSingleHistory(props: BriefSingleHistoryProps) {
  const command: string = props.history[0];
  const output: string | string[][] = props.history[1];
  if (Array.isArray(output)) {
    return <ViewTable tableOutput={output} />;
  } else {
    return (
      <div aria-label="Unique segment of history section">
        {output}
        <hr></hr>
      </div>
    );
  }
}
