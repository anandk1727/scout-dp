import { computed, inject } from '@angular/core';
import { ScoutObject } from '../types';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { HttpErrorResponse } from '@angular/common/http';
import { ScoutApiService } from '../services/scout.service';

type LoadStatus = 'idle' | 'loading' | 'success' | 'error';

interface ScoutState {
  objects: ScoutObject[];
  status: LoadStatus;
  error: string | null;
  selectedDesignation: string | null;
}

const initialState: ScoutState = {
  objects: [],
  status: 'idle',
  error: null,
  selectedDesignation: null,
};

/**
 * Global Signal Store for managing Scout Near-Earth Object data.
 */
export const scoutStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  // Derived state (computed signals)
  withComputed(({ objects, status, selectedDesignation }) => ({
    isLoading: computed(() => status() === 'loading'),
    count: computed(() => objects().length),
    /** Returns the full ScoutObject that matches the currently selected designation. */
    selected: computed(
      () => objects().find((o) => o.designation === selectedDesignation()) ?? null,
    ),
  })),

  // Actions and side effects
  withMethods((store, api = inject(ScoutApiService)) => ({
    /** Fetches Scout data from the API and updates the state based on the result. */
    load() {
      patchState(store, { status: 'loading', error: null });

      api.getScoutResponse().subscribe({
        next: (objects) => patchState(store, { objects, status: 'success' }),
        error: (err: HttpErrorResponse) =>
          patchState(store, { status: 'error', error: err.message }),
      });
    },
    /** Sets the active object by its designation string. */
    select(designation: string | null) {
      patchState(store, { selectedDesignation: designation });
    },
  })),

  withHooks({
    /** Automatically triggers the API fetch when the store is first injected. */
    onInit(store) {
      store.load();
    },
  }),
);
