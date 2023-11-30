import "../styles/Header.css";

/**
 * Interface for REPLHeader
 * contains a string for the current loaded csv, and a boolean
 *  representing the mode (true is brief)
 */
interface REPLHeader {
  isBrief: boolean;
}

/**
 * This is the ReplHeader function that returns the table with the information on node /
 * loaded CSV
 * @param props the string of loaded csv and boolean of current mode
 * @returns actual header div / table
 */
export function REPLHeader(props: REPLHeader) {
  var mode = "Brief";
  if (!props.isBrief) {
    mode = "Verbose";
  }
  return (
    <div
      className="Header"
      aria-label="Mode section, which shows what the current mode is set to (either brief or verbose)"
    >
      <table className="Header-Table" aria-label="Mode section">
        <tr>
          <td id="headerData">
            <p className="REPL-header">
              <b>Mode:</b> {mode}
            </p>
          </td>
        </tr>
      </table>
    </div>
  );
}
