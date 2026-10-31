import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { scoutStore } from './scout.store';
import { API_BASE_URL } from '@shared/utils';
import { RawData } from '../constants';

const URL = '/api/scout.api';
const response = { signature: { version: '1.3', source: 'test' }, count: '1', data: [RawData] };

describe('scoutStore', () => {
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: '/api' },
      ],
    });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('starts loading on init', () => {
    const store = TestBed.inject(scoutStore);
    expect(store.isLoading()).toBe(true);
    http.expectOne(URL).flush(response);
  });

  it('stores transformed objects on success', () => {
    const store = TestBed.inject(scoutStore);
    http.expectOne(URL).flush(response);

    expect(store.status()).toBe('success');
    expect(store.count()).toBe(1);
    expect(store.objects()[0].designation).toBe('A11HAVq');
    expect(store.error()).toBeNull();
  });

  it('sets error state and message on server error', () => {
    const store = TestBed.inject(scoutStore);
    http.expectOne(URL).flush('Bad gateway', { status: 502, statusText: 'Bad Gateway' });

    expect(store.status()).toBe('error');
    expect(store.error()).toContain('502');
    expect(store.objects()).toEqual([]);
  });

  it('recovers on reload after an error', () => {
    const store = TestBed.inject(scoutStore);
    http.expectOne(URL).flush('Bad gateway', { status: 502, statusText: 'Bad Gateway' });

    store.load();
    expect(store.isLoading()).toBe(true);
    expect(store.error()).toBeNull(); // cleared when the new load starts

    http.expectOne(URL).flush(response);
    expect(store.status()).toBe('success');
  });

  describe('select', () => {
    it('returns the selected object', () => {
      const store = TestBed.inject(scoutStore);
      http.expectOne(URL).flush(response);

      store.select('A11HAVq');
      expect(store.selected()?.designation).toBe('A11HAVq');
    });

    it('returns null for an unknown id or after clearing', () => {
      const store = TestBed.inject(scoutStore);
      http.expectOne(URL).flush(response);

      store.select('nope');
      expect(store.selected()).toBeNull();

      store.select('A11HAVq');
      store.select(null);
      expect(store.selected()).toBeNull();
    });
  });
});
