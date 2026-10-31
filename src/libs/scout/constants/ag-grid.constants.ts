import { formatDate } from '@angular/common';
import { ColDef } from 'ag-grid-community';
import { ScoutObject } from '../types';
import { calculateRiskPercentage } from '../utils/transformer/api.transformer';

export const DefaultColRef = {
  sortable: true,
  filter: true,
  resizable: true,
  minWidth: 110,
  width: 150,
};

export const ScoutColDef: ColDef<ScoutObject>[] = [
  {
    field: 'designation',
    headerName: 'Object',
    pinned: 'left',
    cellDataType: 'text',

    lockPinned: true,
  },
  {
    filter: true,
    field: 'rating',
    headerName: 'Rating',
    cellDataType: 'number',
    valueFormatter: (p) => p.value ?? '—',
  },
  { field: 'neoScore', headerName: 'NEO %', cellDataType: 'number', sort: 'desc' },
  { field: 'phaScore', headerName: 'PHA %', cellDataType: 'number' },
  {
    field: 'closeApproachLd',
    headerName: 'CA dist (LD)',
    cellDataType: 'number',
    valueFormatter: (p) => p.value ?? '—',
  },
  {
    field: 'vInfKms',
    headerName: 'V∞ (km/s)',
    cellDataType: 'number',
    valueFormatter: (p) => p.value ?? '—',
  },
  { field: 'absoluteMagnitude', headerName: 'H', cellDataType: 'number' },
  { field: 'visualMagnitude', headerName: 'V mag', cellDataType: 'number' },
  { field: 'observations', headerName: 'Obs', cellDataType: 'number' },
  { field: 'arcDays', headerName: 'Arc (days)', cellDataType: 'number' },
  { field: 'elongationDeg', headerName: 'Elong (°)', cellDataType: 'number' },
  { field: 'rateArcsecPerMin', headerName: 'Rate ("/min)', cellDataType: 'number' },
  { field: 'uncertaintyArcmin', headerName: 'Unc (′)', cellDataType: 'number' },
  {
    field: 'lastRun',
    headerName: 'Last run (UTC)',
    cellDataType: 'date',
    valueFormatter: (p) => (p.value ? formatDate(p.value, 'dd MMM HH:mm', 'en', 'UTC') : '—'),
  },
  {
    colId: 'risk',
    headerName: 'Risk ',
    cellDataType: 'string',

    valueGetter: (p) => (p.data ? calculateRiskPercentage(p.data) : null),
    valueFormatter: (p) => (p.value == null ? '—' : `${Math.round(p.value)}%`),
  },
];
