import { PreferenceAndValue } from "../Preferences";

export class Resort {
  name: string;
  snowfallAmount: number;
  lastSnowfall: number;
  baseDepth: number;
  price: number;
  liftsOpen: number;
  summitElevation: number;
  temperature: number;
  windspeed: number;

  constructor(
    name: string,
    snowfallAmount: number,
    lastSnowfall: number,
    baseDepth: number,
    price: number,
    liftsOpen: number,
    summitElevation: number,
    temperature: number,
    windspeed: number
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

export const MockA = new Resort("Mock A", 12, 4, 71, 100, 4, 9000, 12, 21);
export const MockB = new Resort("Mock B", 11, 4, 56, 120, 6, 10000, 15, 30);
export const MockC = new Resort("Mock C", 20, 1, 90, 100, 7, 4612, 10, 5);
export const MockD = new Resort("Mock D", 90, 3, 120, 125, 18, 12500, 30, 11);
export const MockE = new Resort("Mock E", 3, 9, 15, 140, 25, 7129, 40, 2);
export const MockF = new Resort("Mock F", 17, 3, 40, 190, 7, 6732, 31, 18);
export const MockG = new Resort("Mock G", 17, 2, 60, 89, 19, 13789, 13, 31);
export const MockH = new Resort("Mock H", 71, 0, 101, 120, 8, 11771, 16, 11);

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

export function getStartResorts(): Resort[] {
  return [];
}

export function getSearchResort(name: string): Resort[] {
  return [];
}

export function getSortedResorts(attribute: string): Resort[] {
  return [];
}

export function getRankedResorts(
  prefs: Map<string, PreferenceAndValue>
): Resort[] {
  return [];
}

export function getMockStartResorts(): Resort[] {
  return mockResorts;
}

export function getMockSearchResort(name: string): Resort[] {
  mockResorts.forEach((resort) => {
    if (resort.name === "name") {
      return [resort];
    }
  });
  return [new Resort("Resort Not Found", 0, 0, 0, 0, 0, 0, 0, 0)];
}

export function getMockSortedResorts(attribute: string): Resort[] {
  return mockResortsSort;
}

export function getMockRankedResorts(
  prefs: Map<string, PreferenceAndValue>
): Resort[] {
  return mockResortsPref;
}

// Returns a list of resort options
export const resortNames = () => {
  return ["Araphoe Basin"];
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
