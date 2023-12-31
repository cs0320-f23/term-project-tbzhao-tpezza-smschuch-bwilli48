import { Resort } from "./ResortClass";
import "../../styles/main.css";

/**
 * Properties for the SingleResort component.
 */
interface SingleResortProps {
  resort: Resort;
}

/**
 * Renders detailed information about a single resort. Displays various statistics and
 * information about the resort, such as snowfall, weather, and mountain information.
 */
export function SingleResort(props: SingleResortProps) {
  return (
    <div id="listDiv" className="repl-history" aria-label="Resort information">
      <h2 id="resortName">{props.resort.name}</h2>
      <table>
        <tr>
          <td className="resortListDatum">
            <h3>Snow Stats</h3>
            <p>Snowfall: {props.resort.snowfallAmount}</p>
            <p>Last Snow: {props.resort.lastSnowfall}</p>
            <p>Base-depth: {props.resort.baseDepth}</p>
          </td>
          <td className="resortListDatum">
            <h3>Weather</h3>
            <p>Temperature: {props.resort.temperature}°F</p>
            <p>Windspeed: {props.resort.windspeed} mph</p>
          </td>
          <td className="resortListDatum">
            <h3>Mountain Info</h3>
            <p>Top Elevation: {props.resort.summitElevation}</p>
            <p>Lifts Open: {props.resort.liftsOpen}</p>
            <p>Price: ${props.resort.price}</p>
          </td>
        </tr>
      </table>
      <hr></hr>
    </div>
  );
}
