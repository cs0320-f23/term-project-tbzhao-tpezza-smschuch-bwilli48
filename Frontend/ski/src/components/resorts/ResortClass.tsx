import { PreferenceAndValue } from "../prefs/Preferences";

/**
 * Represents a resort with various attributes like snowfall amount, price, etc.
 */
export class Resort {
  name: string;
  snowfallAmount: string;
  lastSnowfall: string;
  baseDepth: string;
  price: number | string;
  liftsOpen: number | string;
  summitElevation: string | string;
  temperature: number | string;
  windspeed: number | string;

  constructor(
    name: string,
    snowfallAmount: string | null,
    lastSnowfall: string | null,
    baseDepth: string | null,
    price: number | null,
    liftsOpen: number | null,
    summitElevation: string | null,
    temperature: number | null,
    windspeed: number | null
  ) {
    this.name = name;
    this.snowfallAmount =
      snowfallAmount === null || snowfallAmount === undefined
        ? "N/A"
        : snowfallAmount;
    this.lastSnowfall =
      lastSnowfall === null || lastSnowfall === undefined
        ? "N/A"
        : lastSnowfall;
    this.baseDepth =
      baseDepth === null || baseDepth === undefined ? "N/A" : baseDepth;
    this.price = price === null || price === undefined ? "N/A" : price;
    this.liftsOpen =
      liftsOpen === null || liftsOpen === undefined ? "N/A" : liftsOpen;
    this.summitElevation =
      summitElevation === null || summitElevation === undefined
        ? "N/A"
        : summitElevation;
    this.temperature =
      temperature === null || temperature === undefined ? "N/A" : temperature;
    this.windspeed =
      windspeed === null || windspeed === undefined ? "N/A" : windspeed;
  }
}

// Mock data and utility functions:

export const MockA = new Resort(
  "Mock A",
  "12in",
  "16 Dec 2023",
  "71in",
  100,
  4,
  "9000ft",
  12,
  21
);
export const MockB = new Resort(
  "Mock B",
  "11in",
  "16 Dec 2023",
  "56in",
  60,
  6,
  "10000ft",
  15,
  30
);
export const MockC = new Resort(
  "Mock C",
  "20in",
  "19 Dec 2023",
  "90in",
  100,
  7,
  "4612ft",
  10,
  5
);
export const MockD = new Resort(
  "Mock D",
  "90in",
  "17 Dec 2023",
  "120in",
  125,
  18,
  "12500ft",
  30,
  11
);
export const MockE = new Resort(
  "Mock E",
  "3in",
  "11 Dec 2023",
  "15in",
  140,
  25,
  "7129ft",
  40,
  2
);
export const MockF = new Resort(
  "Mock F",
  "17in",
  "17 Dec 2023",
  "40in",
  190,
  7,
  "6732ft",
  31,
  18
);
export const MockG = new Resort(
  "Mock G",
  "17in",
  "18 Dec 2023",
  "60in",
  80,
  19,
  "13789ft",
  13,
  31
);
export const MockH = new Resort(
  "Mock H",
  "71in",
  "20 Dec 2023",
  "101in",
  110,
  8,
  "11771ft",
  16,
  11
);

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

interface BackendResort {
  name: string;
  liftsOpen: number;
  info: ResortInfo;
  weatherForecast: ResortWeatherForecast;
  snowForecast: ResortSnowForecast;
}

interface ResortInfo {
  resortPrice: number;
}

interface ResortWeatherForecast {
  basicInfo: ResortBasicInfo;
}

interface ResortBasicInfo {
  topLiftElevation: string;
}

interface ResortSnowForecast {
  topSnowDepth: string;
  freshSnowfall: string;
  lastSnowfallDate: string;
}

function backendToResort(backend: BackendResort): Resort {
  return new Resort(
    backend.name,
    backend.snowForecast.freshSnowfall,
    backend.snowForecast.lastSnowfallDate,
    backend.snowForecast.topSnowDepth,
    backend.info.resortPrice,
    backend.liftsOpen,
    backend.weatherForecast.basicInfo.topLiftElevation,
    null,
    null
  );
}

function backendToResortList(backendList: BackendResort[]): Resort[] {
  var resorts: Resort[] = [];
  backendList.forEach(function (backend) {
    resorts = [backendToResort(backend), ...resorts];
  });
  return resorts;
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
      if (!isServerResponseJson(json)) {
        return [
          new Resort(
            "Resort Not Found",
            "0in",
            "20 Dec 2023",
            "0in",
            0,
            0,
            "0ft",
            0,
            0
          ),
        ];
      } else {
        if (json.result == "success") {
          return backendToResortList(json.resorts);
        } else {
          return [
            new Resort(
              "Resort Not Found",
              "0in",
              "20 Dec 2023",
              "0in",
              0,
              0,
              "0ft",
              0,
              0
            ),
          ];
        }
      }
    });
  console.log(output);
  return output;
}

export function getSearchResort(name: string): Promise<Resort> {
  var output: Promise<Resort>;
  output = fetch("http://localhost:3232/resorts?type=search&term=" + name)
    .then((response: Response) => response.json())
    .then((json) => {
      if (!isServerResponseJson(json)) {
        return new Resort(
          "Resort Not Found",
          "0in",
          "20 Dec 2023",
          "0in",
          0,
          0,
          "0ft",
          0,
          0
        );
      } else {
        if (json.result == "success") {
          return backendToResort(json.resort);
        } else {
          return new Resort(
            "Resort Not Found",
            "0in",
            "20 Dec 2023",
            "0in",
            0,
            0,
            "0ft",
            0,
            0
          );
        }
      }
    });
  return output;
}

export function getSortedResorts(attribute: string): Promise<Resort[]> {
  var output: Promise<Resort[]>;
  output = fetch("http://localhost:3232/sort?attribute=" + attribute)
    .then((response: Response) => response.json())
    .then((json) => {
      if (!isServerResponseJson(json)) {
        return [
          new Resort(
            "Resort Not Found",
            "0in",
            "20 Dec 2023",
            "0in",
            0,
            0,
            "0ft",
            0,
            0
          ),
        ];
      } else {
        if (json.result == "success") {
          return backendToResortList(json.resorts);
        } else {
          return [
            new Resort(
              "Resort Not Found",
              "0in",
              "20 Dec 2023",
              "0in",
              0,
              0,
              "0ft",
              0,
              0
            ),
          ];
        }
      }
    });
  console.log(output);
  return output;
}

export function getRankedResorts(
  prefs: Map<string, PreferenceAndValue>
): Promise<Resort[]> {
  var prefsJson =
    "{snowfallamount: {weight: " +
    prefs.get("Snowfall Amount")?.weight +
    ", value: " +
    prefs.get("Snowfall Amount")?.value +
    "}, lastsnowfall: {weight: " +
    prefs.get("Last Snowfall")?.weight +
    ", value: " +
    prefs.get("Last Snowfall")?.value +
    "}, basedepth: {weight: " +
    prefs.get("Base-depth")?.weight +
    ", value: " +
    prefs.get("Base-depth")?.value +
    "}, price: {weight: " +
    prefs.get("Price")?.weight +
    ", value: " +
    prefs.get("Price")?.value +
    "}, lifts: {weight: " +
    prefs.get("Lifts Open")?.weight +
    ", value: " +
    prefs.get("Lifts Open")?.value +
    "}, elevation: {weight: " +
    prefs.get("Summit Elevation")?.weight +
    ", value: " +
    prefs.get("Summit Elevation")?.value +
    "}, temperature: {weight: " +
    prefs.get("Temperature")?.weight +
    ", value: " +
    prefs.get("Temperature")?.value +
    "}, windspeed: {weight: " +
    prefs.get("Windspeed")?.weight +
    ", value: " +
    prefs.get("Windspeed")?.value +
    "}}";
  var output: Promise<Resort[]>;
  output = fetch("http://localhost:3232/algo?preferences=" + prefsJson)
    .then((response: Response) => response.json())
    .then((json) => {
      if (!isServerResponseJson(json)) {
        return [
          new Resort(
            "Resort Not Found",
            "0in",
            "20 Dec 2023",
            "0in",
            0,
            0,
            "0ft",
            0,
            0
          ),
        ];
      } else {
        if (json.result == "success") {
          return backendToResortList(json.resorts);
        } else {
          return [
            new Resort(
              "Resort Not Found",
              "0in",
              "20 Dec 2023",
              "0in",
              0,
              0,
              "0ft",
              0,
              0
            ),
          ];
        }
      }
    });
  console.log(output);
  return output;
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
  return [
    new Resort(
      "Resort Not Found",
      "0in",
      "20 Dec 2023",
      "0in",
      0,
      0,
      "0ft",
      0,
      0
    ),
  ];
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
    return [
      new Resort(
        "Resort Not Found",
        "0in",
        "20 Dec 2023",
        "0in",
        0,
        0,
        "0ft",
        0,
        0
      ),
    ];
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
