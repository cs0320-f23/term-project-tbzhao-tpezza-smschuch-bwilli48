import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
// import { path_to_data, search } from "../data/mockedJson";
import { path_to_data } from "../data/mockedJson";

/**
 * Interface for REPLFunction
 * Changed to return a string array or string, since view and search can return a table
 * but everything else returns only a string
 */
export interface REPLFunction {
  (args: string[]): Promise<string[][] | string>;
}

/**
 *
 * @param args Function parsing an input
 * @returns an array of strings with the command in the first index, then each arg following
 * Throws error if structured invalid, such as arrow issues
 */
export function parseCommand(args: string) {
  let termArray: string[] = [""];
  var isOpen = false;
  var index = 1;
  let chars = args.split("");
  var commandParsed = false;
  chars.map((c) => {
    if (!commandParsed) {
      if (c == " ") {
        commandParsed = true;
      } else {
        termArray[0] = termArray[0].concat(c);
      }
    } else {
      if (c == "<") {
        if (!isOpen) {
          isOpen = true;
          termArray = [...termArray, ""];
        } else {
          //second open arrow
          throw Error;
        }
      } else if (c == ">") {
        if (isOpen) {
          isOpen = false;
          index++;
        } else {
          //second close arrow
          throw Error;
        }
      } else {
        if (isOpen == true) {
          termArray[index] = termArray[index].concat(c);
        } else {
          //characters not in arrows
          if (!(c == " ")) {
            throw Error;
          }
        }
      }
    }
  });
  if (isOpen) {
    //never closed last arrow
    throw Error;
  }
  return termArray;
}

/**
 * Command map mapping command to REPLFunction
 */
export var CommandMap = new Map<string, REPLFunction>();
CommandMap.set("load_file", handleLoadFile);
CommandMap.set("view", handleViewFile);
CommandMap.set("search", handleSearchFile);
CommandMap.set("broadband", handleBroadband);
CommandMap.set("mocked_load_file", handleMockedLoadFile);
CommandMap.set("mocked_view", handleMockedViewFile);
CommandMap.set("mocked_search", handleMockedSearchFile);
CommandMap.set("mocked_broadband", handleMockedBroadband);
CommandMap.set("concat", handleConcat);

/**
 * Interface for a response from our server
 * Just put these value in since these are the only ones we need to acess
 */
export interface ServerResponse {
  result: string;
  csv: string[][];
  rows: string[][];
  ERRORMESSAGE: string;
  percent: string;
}

/**
 * Function testing if response from server is a correct response
 * @param rjson the response from the server
 * @returns true if it is a response, false if not
 */
export function isServerResponseJson(rjson: any): rjson is ServerResponse {
  if (!("result" in rjson)) return false;
  return true;
}

/**
 * Function to hand load_file command
 * @param args parsed args of user after command
 * @returns a string, either describing error or telling if file was loaded
 */
export function handleLoadFile(args: string[]): Promise<string> {
  var output: Promise<string>;
  if (args.length !== 1) {
    output = new Promise((resolve, reject) => {
      resolve(
        "Invalid arguments for load_file. Must follow 'load_file <filepath>'"
      );
    });
  } else {
    output = fetch("http://localhost:1212/loadcsv?path=" + args[0])
      .then((response: Response) => response.json())
      .then((json) => {
        if (!isServerResponseJson(json)) {
          return "not a response";
        } else {
          if (json.result == "success") {
            return "Successfully loaded " + args[0];
          } else {
            return "Path to file does not exist!";
          }
        }
      });
  }
  return output;
}

/**
 * Function to hand view command
 * @param args parsed args of user after command
 * @returns a string for an error or a string[][] of the loaded csv
 */
export function handleViewFile(args: string[]): Promise<string | string[][]> {
  var output: Promise<string | string[][]>;
  if (args.length > 0) {
    output = new Promise((resolve, reject) => {
      resolve("To view, input must be just 'view''");
    });
  } else {
    output = fetch("http://localhost:1212/viewcsv")
      .then((response: Response) => response.json())
      .then((json) => {
        if (!isServerResponseJson(json)) {
          return "not a response";
        } else {
          if (json.result == "success") {
            return json.csv;
          } else {
            return "Currently there is no CSV loaded.";
          }
        }
      });
  }
  return output;
}

/**
 * Function to hand search command
 * @param args parsed args of user after command
 * @returns a string for a message or a string[][] of the rows found containg the item
 */
export function handleSearchFile(args: string[]): Promise<string | string[][]> {
  var output: Promise<string | string[][]>;
  if (args.length == 1) {
    let term = args[0];
    let hasHeaders = "false";
    output = fetch(
      "http://localhost:1212/searchcsv?term=" +
        term +
        "&hasHeaders=" +
        hasHeaders
    )
      .then((response: Response) => response.json())
      .then((json) => {
        if (!isServerResponseJson(json)) {
          return "Not a response";
        } else {
          if (json.result == "success") {
            if (json.rows.length !== 0) {
              return json.rows;
            } else {
              return term + " was not found in the CSV.";
            }
          } else {
            var error = json.ERRORMESSAGE;
            if (
              error ==
              "No csv loaded. Use endpoint 'loadcsv' with a path to your csv to load, then search."
            ) {
              return "Currently there is no CSV loaded.";
            } else {
              return error;
            }
          }
        }
      });
  } else if (args.length == 2) {
    let column = args[0];
    let term = args[1];
    let hasHeaders = "false";

    //this checks if it's an integer or can be parsed as an integer

    if (!isNaN(parseInt(column))) {
      output = fetch(
        "http://localhost:1212/searchcsv?term=" +
          term +
          "&hasHeaders=" +
          hasHeaders +
          "&type=index&column=" +
          column
      )
        .then((response: Response) => response.json())
        .then((json) => {
          if (!isServerResponseJson(json)) {
            return "Not a response";
          } else {
            if (json.result == "success") {
              if (json.rows.length !== 0) {
                return json.rows;
              } else {
                return term + " was not found in column " + column + ".";
              }
            } else {
              var error = json.ERRORMESSAGE;
              if (
                error ==
                "No csv loaded. Use endpoint 'loadcsv' with a path to your csv to load, then search."
              ) {
                return "Currently there is no CSV loaded.";
              } else {
                return error;
              }
            }
          }
        });
    } else {
      output = fetch(
        "http://localhost:1212/searchcsv?term=" +
          term +
          "&hasHeaders=" +
          hasHeaders +
          "&type=header&column=" +
          column
      )
        .then((response: Response) => response.json())
        .then((json) => {
          if (!isServerResponseJson(json)) {
            return "Not a response";
          } else {
            if (json.result == "success") {
              if (json.rows.length !== 0) {
                return json.rows;
              } else {
                return (
                  term +
                  " was not found in column with header '" +
                  column +
                  "'."
                );
              }
            } else {
              var error = json.ERRORMESSAGE;
              if (
                error ==
                "No csv loaded. Use endpoint 'loadcsv' with a path to your csv to load, then search."
              ) {
                return "Currently there is no CSV loaded.";
              } else {
                return error;
              }
            }
          }
        });
    }
  } else {
    output = new Promise((resolve, reject) => {
      resolve(
        "To search, input must follow format: 'search <column> <item>' or 'search <item>'"
      );
    });
  }
  return output;
}

/**
 * Function to hand broadband command
 * @param args parsed args of user after command
 * @returns a string of the result
 */
export function handleBroadband(args: string[]): Promise<string> {
  var output: Promise<string>;
  if (args.length !== 2) {
    output = new Promise((resolve, reject) => {
      resolve(
        "Invalid arguments for broadband. Must follow 'broadband <state> <county>'"
      );
    });
  } else {
    let state = args[0];
    let county = args[1];

    output = fetch(
      "http://localhost:1212/broadband?state=" + state + "&county=" + county
    )
      .then((response: Response) => response.json())
      .then((json) => {
        if (!isServerResponseJson(json)) {
          return "Not a response";
        } else {
          if (json.result == "success") {
            return json.percent + "%";
          } else {
            return json.ERRORMESSAGE;
          }
        }
      });
  }
  return output;
}

/**
 * Function to hand mocked_load_file command
 * @param args parsed args of user after command
 * @returns a string of an error or success message
 */
export function handleMockedLoadFile(args: string[]): Promise<string> {
  var output: Promise<string>;
  if (args.length !== 1) {
    output = new Promise((resolve, reject) => {
      resolve(
        "Invalid arguments for load_file. Must follow 'load_file <filepath>'"
      );
    });
  } else {
    output = new Promise((resolve, reject) => {
      if (args[0] == "csv1") {
        resolve("Successfully loaded " + args[0]);
      } else if (args[0] == "csv2") {
        resolve("Successfully loaded " + args[0]);
      } else {
        resolve("Path to file does not exist!");
      }
    });
  }
  return output;
}

/**
 * Function to hand mocked_view command
 * @param args parsed args of user after command
 * @returns a string for an error or a string[][] of the loaded csv
 */
export function handleMockedViewFile(
  args: string[]
): Promise<string | string[][]> {
  var output: Promise<string | string[][]>;
  if (args.length > 0) {
    output = new Promise((resolve, reject) => {
      resolve("To view, input must be just 'view''");
    });
  } else {
    output = new Promise((resolve, reject) => {
      resolve(path_to_data[0]);
    });
  }
  return output;
}

/**
 * Function to hand mocked_search command
 * @param args parsed args of user after command
 * @returns a string for an error or a string[][] of the rows with item in it
 */
export function handleMockedSearchFile(
  args: string[]
): Promise<string | string[][]> {
  var output: Promise<string | string[][]>;
  if (args.length !== 2 && args.length !== 1) {
    output = new Promise((resolve, reject) => {
      resolve(
        "To search, input must follow format: 'search <column> <item>' or 'search <item>'"
      );
    });
  } else {
    output = new Promise((resolve, reject) => {
      // no result
      if (args[0] == "0" && args[1] == "234234") {
        resolve(
          args[1] + " was not found in column with header '" + args[0] + "'."
        );
        // one result
      } else if (args[0] == "1" && args[1] == "1") {
        resolve([["72", "1", "12", "61"]]);
        // multi-result
      } else if (args[0] == "State" && args[1] == "RI") {
        resolve([
          ["RI", "White", "$1,058.47", "395773.6521", "$1.00", "75%"],
          ["RI", "Black", "$770.26", "30424.80376", "$0.73", "6%"],
          [
            "RI",
            "Native American/American Indian",
            "$471.07",
            "2315.505646",
            "$0.45",
            "0%",
          ],
          [
            "RI",
            "Asian-Pacific Islander",
            "$1,080.09",
            "18956.71657",
            "$1.02",
            "4%",
          ],
          ["RI", "Hispanic/Latino", "$673.14", "74596.18851", "$0.64", "14%"],
          ["RI", "Multiracial", "$971.89", "8883.049171", "$0.92", "2%"],
        ]);
      } else if (args[0] == "12") {
        resolve([["72", "1", "12", "61"]]);
      }
    });
  }
  return output;
}

/**
 * Function to hand mocked_broadband command
 * @param args parsed args of user after command
 * @returns a string for the result
 */
export function handleMockedBroadband(args: string[]): Promise<string> {
  var output: Promise<string>;
  if (args.length !== 2) {
    output = new Promise((resolve, reject) => {
      resolve(
        "Invalid arguments for broadband. Must follow 'broadband <state> <county>'"
      );
    });
  } else {
    output = new Promise((resolve, reject) => {
      if (args[0] == "California" && args[1] == "Orange County") {
        resolve("93.0%");
      } else if (args[0] == "California" && args[1] == "Alpine County") {
        resolve(
          "County 'Alpine County' does not meet the ACS's population threshold of over 50,000, so its data was not surveyed. We apologize for not being able to give you the desired information."
        );
      } else if (args[0] == "Cali") {
        resolve(
          "State 'Cali' was not found. Make sure it is spaced correctly. Examples: Maine, Rhode Island"
        );
      } else if (args[0] == "California" && args[1] == "Orange Counter") {
        resolve(
          "County 'Orange Counter' was not found. Make sure it is spaced correctly. Example: Orange County"
        );
      } else {
        resolve("Mocked broadband response not found");
      }
    });
  }
  return output;
}

/**
 * Function to hand concat command
 * @param args parsed args of user after command
 * @returns a string of the two args concatted
 */
export function handleConcat(args: string[]): Promise<string> {
  var output: Promise<string>;
  if (args.length !== 2) {
    output = new Promise((resolve, reject) => {
      resolve(
        "Invalid arguments for concat. Must follow 'concat <arg1> <arg2>'"
      );
    });
  } else {
    output = new Promise((resolve, reject) => {
      resolve(args[0] + args[1]);
    });
  }
  return output;
}
