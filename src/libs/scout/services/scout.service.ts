import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

import { ScoutApiResponse } from '../types';
import { map } from 'rxjs';
import { toScoutObject } from '../utils/transformer/api.transformer';
import { API_BASE_URL } from '@shared/utils';

@Service()
/**
 * Service responsible for managing API interactions related to Scout Near Earth Objects Dashboard.
 */
export class ScoutApiService {
  private _http = inject(HttpClient);
  private _baseUrl = inject(API_BASE_URL);

  /**
   * Fetches the Scout data from the API and transforms the raw payload.
   *
   * @returns An Observable emitting an array of strictly typed Scout objects.
   */
  getScoutResponse() {
    return this._http
      .get<ScoutApiResponse>(`${this._baseUrl}/scout.api`)
      .pipe(map((res) => res.data.map(toScoutObject)));
  }
}
