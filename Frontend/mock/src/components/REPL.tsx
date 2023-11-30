import { useState } from "react";
import "../styles/main.css";
import {
  CommandMap,
  handleBroadband,
  handleLoadFile,
  handleSearchFile,
  handleViewFile,
  REPLFunction,
} from "./DefaultFunctions";
import { REPLHeader } from "./REPLHeader";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

/**
 * This is the main component that contains the header, history, and input.
 * Additionally, it holds all the props and state changers that are passed as inputs into the proper
 * components.
 *
 * @returns the actual repl components, with the header, history, and input.
 */

export default function REPL() {
  const [history, setHistory] = useState<[string, string | string[][]][]>([]);
  const [isBrief, setMode] = useState<boolean>(true);
  const [commandMap, setCommandMap] =
    useState<Map<string, REPLFunction>>(CommandMap);

  return (
    <div className="repl">
      <REPLHeader isBrief={isBrief} />
      <br></br>
      <REPLHistory history={history} isBrief={isBrief} />
      <hr></hr>
      <REPLInput
        history={history}
        setHistory={setHistory}
        isBrief={isBrief}
        setMode={setMode}
        commandMap={commandMap}
        setCommandMap={setCommandMap}
      />
    </div>
  );
}
