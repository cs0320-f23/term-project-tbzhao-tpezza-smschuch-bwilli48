import { PreferenceAndValue } from "../prefs/Preferences";

/**
 * Represents a resort with various attributes like snowfall amount, price, etc.
 */
export class Resort {
  name: string;
  snowfallAmount: number | null;
  lastSnowfall: number | null;
  baseDepth: number | null;
  price: number | null;
  liftsOpen: number | null;
  summitElevation: number | null;
  temperature: number | null;
  windspeed: number | null;

  constructor(
    name: string,
    snowfallAmount: number | null,
    lastSnowfall: number | null,
    baseDepth: number | null,
    price: number | null,
    liftsOpen: number | null,
    summitElevation: number | null,
    temperature: number | null,
    windspeed: number | null
  ) {
    this.name = name;
    this.snowfallAmount = snowfallAmount;
    this.lastSnowfall = lastSnowfall;
    this.baseDepth = baseDepth;
    this.price = price;
    this.liftsOpen = liftsOpen;
    this.summitElevation = summitElevation;
    this.temperature = temperature;
    this.windspeed = windspeed;
  }
}

// Mock data and utility functions:

export const MockA = new Resort("Mock A", 12, 4, 71, 100, 4, 9000, 12, 21);
export const MockB = new Resort("Mock B", 11, 4, 56, 60, 6, 10000, 15, 30);
export const MockC = new Resort("Mock C", 20, 1, 90, 100, 7, 4612, 10, 5);
export const MockD = new Resort("Mock D", 90, 3, 120, 125, 18, 12500, 30, 11);
export const MockE = new Resort("Mock E", 3, 9, 15, 140, 25, 7129, 40, 2);
export const MockF = new Resort("Mock F", 17, 3, 40, 190, 7, 6732, 31, 18);
export const MockG = new Resort("Mock G", 17, 2, 60, 80, 19, 13789, 13, 31);
export const MockH = new Resort("Mock H", 71, 0, 101, 110, 8, 11771, 16, 11);

export const mockResorts = [
  MockA,
  MockB,
  MockD,
  MockC,
  MockE,
  MockF,
  MockG,
  MockH,
];

export const mockResortsSort = [
  MockE,
  MockF,
  MockG,
  MockH,
  MockA,
  MockB,
  MockD,
  MockC,
];

export const mockResortsSearch = [MockC];

export const mockResortsPref = [MockH, MockA, MockB, MockD, MockC];

interface ServerResponse {
  result: string;
  resort: BackendResort;
  resorts: BackendResort[];
}

interface BackendResort {}

function backendToResort(backend: BackendResort): Resort {
  return MockA;
}

function backendToResortList(backend: BackendResort[]): Resort[] {
  return [MockA, MockB];
}

export function isServerResponseJson(rjson: any): rjson is ServerResponse {
  if (!("result" in rjson)) return false;
  return true;
}

export function getStartResorts(): Promise<Resort[]> {
  var output: Promise<Resort[]>;
  output = fetch("http://localhost:3232/resorts?type=list")
    .then((response: Response) => response.json())
    .then((json) => {
      // if (!isServerResponseJson(json)) {
      //   return [MockA];
      // } else {
      //   if (json.result == "success") {
      //     return backendToResortList(json.resorts);
      //   } else {
      //     return [MockB];
      //   }
      // }
      return [MockA];
    });
  //convert
  console.log(output);
  return output;
}

export function getSearchResort(name: string): Promise<Resort> {
  var output: Promise<Resort>;
  output = fetch("http://localhost:3232/resorts?type=search&term=" + name)
    .then((response: Response) => response.json())
    .then((json) => {
      if (!isServerResponseJson(json)) {
        return new Resort("Resort Not Found", 0, 0, 0, 0, 0, 0, 0, 0);
      } else {
        if (json.result == "success") {
          return backendToResort(json.resort);
        } else {
          return new Resort("Resort Not Found", 0, 0, 0, 0, 0, 0, 0, 0);
        }
      }
    });
  //convert
  return output;
}

export function getSortedResorts(attribute: string): Resort[] {
  //call sort
  //convert
  return [];
}

export function getRankedResorts(
  prefs: Map<string, PreferenceAndValue>
): Resort[] {
  //convert prefs to json
  //call prefs
  //convert
  return [];
}

export function getMockStartResorts(): Resort[] {
  return mockResorts;
}

export function getMockSearchResort(name: string): Resort[] {
  if (name === "Mock A") {
    return [MockA];
  }
  if (name === "Mock B") {
    return [MockB];
  }
  if (name === "Mock C") {
    return [MockC];
  }
  if (name === "Mock D") {
    return [MockD];
  }
  if (name === "Mock E") {
    return [MockE];
  }
  if (name === "Mock F") {
    return [MockF];
  }
  if (name === "Mock G") {
    return [MockG];
  }
  if (name === "Mock H") {
    return [MockH];
  }
  return [new Resort("Resort Not Found", 0, 0, 0, 0, 0, 0, 0, 0)];
}

export function getMockSortedResorts(attribute: string): Resort[] {
  if (attribute === "Snowfall Amount") {
    return [MockD, MockC, MockF, MockG, MockA, MockB, MockE];
  } else if (attribute === "Last Snowfall") {
    return [MockH, MockC, MockG, MockF, MockA, MockB, MockE];
  } else if (attribute === "Base-Depth") {
    return [MockC, MockA, MockG, MockB, MockF, MockE];
  } else if (attribute === "Price") {
    return [MockB, MockG, MockA, MockC, MockE, MockF];
  } else if (attribute === "Lifts Open") {
    return [MockA, MockB, MockC, MockF, MockG, MockE];
  } else if (attribute === "Summit Elevation") {
    return [MockC, MockF, MockE, MockA, MockB, MockG];
  } else if (attribute === "Temperature") {
    return [MockE, MockF, MockB, MockG, MockA, MockC];
  } else if (attribute === "Windspeed") {
    return [MockG, MockB, MockA, MockF, MockC, MockE];
  } else {
    return [new Resort("Resort Not Found", 0, 0, 0, 0, 0, 0, 0, 0)];
  }
}

export function getMockRankedResorts(
  prefs: Map<string, PreferenceAndValue>
): Resort[] {
  var sf = prefs.get("Snowfall Amount")?.value;
  if (sf !== undefined) {
    if (sf > 10) {
      return [MockD, MockH, MockC, MockF, MockG, MockE];
    }
  }
  var p = prefs.get("Price")?.weight;
  if (p !== undefined) {
    if (p > 7) {
      return [MockB, MockG, MockC, MockH, MockE, MockF];
    }
  }
  var lo = prefs.get("Lifts Open")?.weight;
  if (lo !== undefined) {
    if (lo > 9) {
      return [MockA, MockC, MockF, MockG, MockE];
    }
  }
  return mockResortsPref;
}

// Returns a list of resort options
export const resortNames = () => {
  return [
    "Valgrande Pajares",
    "​Courchevel",
    "​Thyon",
    "Jackson Hole",
    "Jay Peak",
    "Whistler Blackcomb",
    "Shigakogen Mountain Resort",
    "​Rivisondoli",
    "Kolasportland",
    "Hakuba Iwatake Mountain Resort",
    "Vail",
  ];
};

// Returns a list of resort options
export const mockResortNames = () => {
  return [
    "Mock A",
    "Mock B",
    "Mock C",
    "Mock D",
    "Mock E",
    "Mock F",
    "Mock G",
    "Mock H",
  ];
};
