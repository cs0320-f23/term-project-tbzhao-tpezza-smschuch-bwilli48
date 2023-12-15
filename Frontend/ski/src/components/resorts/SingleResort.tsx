import { Resort } from "./ResortClass";

import "/Users/tyype1/Desktop/term-project-tbzhao-tpezza-smschuch-bwilli48/Frontend/ski/src/styles/main.css";

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
      <h1 id="resortName">{props.resort.name}</h1>
      <table>
        <tr>
          <td className="resortListDatum">
            <h3>Snow Stats</h3>
            <p>Snowfall: {props.resort.snowfallAmount} in.</p>
            <p>Last Snow: {props.resort.lastSnowfall} days ago</p>
            <p>Base-depth: {props.resort.baseDepth} in.</p>
          </td>
          <td className="resortListDatum">
            <h3>Weather</h3>
            <p>Temperature: {props.resort.temperature}°F</p>
            <p>Windspeed: {props.resort.windspeed}mph</p>
          </td>
          <td className="resortListDatum">
            <h3>Mountain Info</h3>
            <p>Top Elevation: {props.resort.summitElevation}ft</p>
            <p>Lifts Open: {props.resort.liftsOpen}</p>
            <p>Price: ${props.resort.price}</p>
          </td>
        </tr>
      </table>
      <hr></hr>
    </div>
  );
}
