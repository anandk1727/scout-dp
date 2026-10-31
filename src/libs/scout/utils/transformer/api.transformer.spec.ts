import { toScoutObject } from './api.transformer';
import { RawData } from '../../constants';

it('keeps missing values as null, not 0', () => {
  expect(toScoutObject(RawData).closeApproachLd).toBeNull();
});

it('parses API times as UTC', () => {
  expect(toScoutObject(RawData)?.lastRun?.toISOString()).toBe('2026-10-30T08:22:00.000Z');
});
