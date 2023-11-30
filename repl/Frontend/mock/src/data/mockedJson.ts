/**
 * this is mocked data as 2d array from the previous sprints
 *
 */

const mockCSVData1: string[][] = [
  [
    "State",
    "Data Type",
    "Average Weekly Earnings",
    "Number of Workers",
    "Earnings Disparity",
    "Employed Percent",
  ],
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
  ["RI", "Asian-Pacific Islander", "$1,080.09", "18956.71657", "$1.02", "4%"],
  ["RI", "Hispanic/Latino", "$673.14", "74596.18851", "$0.64", "14%"],
  ["RI", "Multiracial", "$971.89", "8883.049171", "$0.92", "2%"],
];

const mockCSVData2: string[][] = [
  ["Height", "Weight", "Length", "Width"],
  ["72", "1", "12", "61"],
  ["89", "123", "3", "6"],
];

//this is the return map that holds the paths (strings) to the 2d arrays of data
export const path_to_data: string[][][] = [mockCSVData1, mockCSVData2];
