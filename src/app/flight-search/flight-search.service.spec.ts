import { TestBed, inject } from '@angular/core/testing';

import { FlightSearchServiceService } from './flight-search-service.service';

describe('FlightSearchServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlightSearchServiceService]
    });
  });

  it('should be created', inject([FlightSearchServiceService], (service: FlightSearchServiceService) => {
    expect(service).toBeTruthy();
  }));
});
