export interface ScoutApiData {
  objectName: string;
  rating: number | null;
  nObs: number;
  arc: string;
  H: string;
  Vmag: string;
  tEphem: string;
  lastRun: string;
  ra: string;
  dec: string;
  rate: string;
  elong: string;
  moid: string;
  rmsN: string;
  unc: string;
  uncP1: string;
  caDist: string | null;
  vInf: string | null;
  geocentricScore: number;
  neo1kmScore: number;
  ieoScore: number;
  tisserandScore: number;
  phaScore: number;
  neoScore: number;
}

export interface ScoutApiResponse {
  signature: { version: string; source: string };
  count: string;
  data: ScoutApiData[];
}

export interface ScoutObject {
  designation: string;
  observations: number;
  arcDays: number | null;
  absoluteMagnitude: number | null;
  visualMagnitude: number | null;
  rating: number | null;
  neoScore: number;
  phaScore: number;
  ieoScore: number;
  geocentricScore: number;
  moidAu: number | null;
  closeApproachLd: number | null;
  vInfKms: number | null;
  rightAscension: string;
  declinationDeg: number | null;
  rateArcsecPerMin: number | null;
  elongationDeg: number | null;
  uncertaintyArcmin: number | null;
  uncertaintyP1Arcmin: number | null;
  ephemerisTime: Date | null;
  lastRun: Date | null;
}
