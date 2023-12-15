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

export const AraphoeBasin = new Resort("Araphoe Basin", 5, 5, 5, 5, 5, 5, 5, 5);
export const BigSky = new Resort("Big Sky", 5, 5, 5, 5, 5, 5, 5, 5);
export const JayPeak = new Resort("Jay Peak", 5, 5, 5, 5, 5, 5, 5, 5);
export const JacksonHole = new Resort("Jackson Hole", 5, 5, 5, 5, 5, 5, 5, 5);
export const Killington = new Resort("Killington", 5, 5, 5, 5, 5, 5, 5, 5);
export const SmugglersNotch = new Resort(
  "Smuggler's Notch",
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5
);
export const Snowbird = new Resort("Snowbird", 5, 5, 5, 5, 5, 5, 5, 5);
export const Sugarbush = new Resort("Sugarbush", 5, 5, 5, 5, 5, 5, 5, 5);

export const mockResorts = [
  AraphoeBasin,
  BigSky,
  JacksonHole,
  JayPeak,
  Killington,
  SmugglersNotch,
  Snowbird,
  Sugarbush,
];

export const mockResortsSort = [
  Killington,
  SmugglersNotch,
  Snowbird,
  Sugarbush,
  AraphoeBasin,
  BigSky,
  JacksonHole,
  JayPeak,
];

export const mockResortsSearch = [JayPeak];

export const mockResortsPref = [
  Sugarbush,
  AraphoeBasin,
  BigSky,
  JacksonHole,
  JayPeak,
];

export function getStartResorts(): Resort[] {
  return mockResorts;
}

export function getSearchResort(name: string): Resort[] {
  return mockResortsSearch;
}

export function getSortedResorts(attribute: string): Resort[] {
  return mockResortsSort;
}

export function getRankedResorts(
  prefs: Map<string, PreferenceAndValue>
): Resort[] {
  return mockResortsPref;
}

// Returns a list of resort options
export const resortNames = () => {
  return [
    "Araphoe Basin",
    "Big Sky",
    "Jackson Hole",
    "Jay Peak",
    "Killington",
    "Smuggler's Notch",
    "Snowbird",
    "Sugarbush",
  ];
};
