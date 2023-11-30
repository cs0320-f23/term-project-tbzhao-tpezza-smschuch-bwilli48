import { test, expect } from "@playwright/test";

/**
 * Function copied from default functions
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
 * Tests parse succes no param
 */
test("parse success no parameter", () => {
  let expected = ["broadband"];
  let actual = parseCommand("broadband");
  expect(expected).toStrictEqual(actual);
});

/**
 * Tests parse succes one param
 */
test("parse success one parameter", () => {
  let expected = ["broadband", "state"];
  let actual = parseCommand("broadband <state>");
  expect(expected).toStrictEqual(actual);
});

/**
 * Tests parse succes two params
 */
test("parse success two parameters", () => {
  let expected = ["broadband", "state", "county"];
  let actual = parseCommand("broadband <state> <county>");
  expect(expected).toStrictEqual(actual);
});
