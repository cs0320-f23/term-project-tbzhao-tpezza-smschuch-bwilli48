import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
import { Preferences } from "./Preferences";
import { ResortsList } from "./ResortsList";
import { Search } from "./Search";
import { Sort } from "./Sort";

interface MainContainerProps {
  resortList: string[];
  setResortList: Dispatch<SetStateAction<string[]>>;
}

/**
 * This is the main component that contains the header, history, and input.
 * Additionally, it holds all the props and state changers that are passed as inputs into the proper
 * components.
 *
 * @returns the actual repl components, with the header, history, and input.
 */

export default function MainContainer(props: MainContainerProps) {
  return (
    <div className="repl">
      <table id="mainTable">
        <tr>
          <td className="sortTableDatum">
            <table>
              <tr>
                <td>
                  <Search
                    resortList={props.resortList}
                    setResortList={props.setResortList}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Sort
                    resortList={props.resortList}
                    setResortList={props.setResortList}
                  />
                </td>
              </tr>
            </table>
          </td>
          <td id="preferenceTableDatum">
            <Preferences
              resortList={props.resortList}
              setResortList={props.setResortList}
            />
          </td>
        </tr>
      </table>
      <br></br>
      <ResortsList resortList={props.resortList} />
    </div>
  );
}
