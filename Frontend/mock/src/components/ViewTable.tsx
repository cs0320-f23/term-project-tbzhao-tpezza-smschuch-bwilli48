import "../styles/main.css";

export interface ViewTableProps {
  tableOutput: string[][];
}

/**
 * Function for creating a table for viewing a csv,
 * or the rows returned from searching
 * @param props history tuple
 * @returns
 */
export function ViewTable(props: ViewTableProps) {
  const output: string[][] = props.tableOutput;
  return (
    <div>
      <table
        className="Output-Table"
        aria-label="Table outputted from entering the view command"
      >
        <tbody>
          {output.map((row) => (
            <tr aria-label="This is a row of the table outputted from entereing the view command">
              {row.map((datum) => (
                <td
                  className="Output-Datum"
                  // aria-label="This is a value in the table"
                >
                  {datum}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <hr></hr>
    </div>
  );
}
