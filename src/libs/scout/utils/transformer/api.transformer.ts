import { ScoutApiData, ScoutObject } from '../../types';

/** Transforms raw Scout API data into a strictly typed format. */
export function toScoutObject(raw: ScoutApiData): ScoutObject {
  return {
    designation: raw.objectName,
    observations: raw.nObs,
    arcDays: toNumber(raw.arc),
    absoluteMagnitude: toNumber(raw.H),
    visualMagnitude: toNumber(raw.Vmag),
    rating: raw.rating,
    neoScore: raw.neoScore,
    phaScore: raw.phaScore,
    ieoScore: raw.ieoScore,
    geocentricScore: raw.geocentricScore,
    moidAu: toNumber(raw.moid),
    closeApproachLd: toNumber(raw.caDist),
    vInfKms: toNumber(raw.vInf),
    rightAscension: raw.ra,
    declinationDeg: toNumber(raw.dec),
    rateArcsecPerMin: toNumber(raw.rate),
    elongationDeg: toNumber(raw.elong),
    uncertaintyArcmin: toNumber(raw.unc),
    uncertaintyP1Arcmin: toNumber(raw.uncP1),
    ephemerisTime: toUtcDate(raw.tEphem),
    lastRun: toUtcDate(raw.lastRun),
  };
}

/** Safely parses a value to a number, returning null if invalid. */
function toNumber(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(value);
  return n ?? null;
}

/** Converts an API timestamp string into a UTC Date object. */
function toUtcDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const date = new Date(`${value.replace(' ', 'T')}Z`);
  return date;
}

/** Calculates an aggregate risk percentage (0-100) based on object scores. */
export function calculateRiskPercentage(data: ScoutObject) {
  // Scout Rating Normalization (0 - 4 mapped to 0 - 100)
  const scoutRating = ((data.rating || 0) / 4) * 100;

  return (data.phaScore + scoutRating + data.neoScore) / 3;
}
