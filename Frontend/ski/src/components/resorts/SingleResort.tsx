import { Resort } from "./ResortClass";

/**
 * Props for the resorts list. Includes just an array of the resorts.
 */
interface SingleResortProps {
  resort: Resort;
}

/**
 * Function that represents the list of resorts. Functions similiarly to a REPL history box.
 */
export function SingleResort(props: SingleResortProps) {
  return (
    <div
      id="listDiv"
      className="repl-history"
      aria-label="History Section, which lists the outputs of your previous commands"
    >
      {props.resort.name}
    </div>
  );
}
