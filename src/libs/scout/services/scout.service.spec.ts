import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ScoutApiService } from './scout.service';
import { API_BASE_URL } from '@shared/utils';
import { RawData } from '../constants';

describe('ScoutApiService', () => {
  let service: ScoutApiService;
  let httpMock: HttpTestingController;

  const mockBaseUrl = 'https://api.nasa.gov/neo/rest/v1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScoutApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: mockBaseUrl },
      ],
    });

    service = TestBed.inject(ScoutApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensures that there are no outstanding HTTP requests left over after the test
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch and transform the scout API data successfully', () => {
    const mockApiResponse = {
      signature: { version: 'mock version', source: 'source' },
      count: '1',
      data: [RawData],
    };

    service.getScoutResponse().subscribe((transformedData) => {
      expect(transformedData).toBeTruthy();
      expect(transformedData.length).toBe(1);
    });

    const req = httpMock.expectOne(`${mockBaseUrl}/scout.api`);
    expect(req.request.method).toBe('GET');

    req.flush(mockApiResponse);
  });
});
