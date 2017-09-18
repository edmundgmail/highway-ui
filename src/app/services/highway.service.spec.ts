import { TestBed, inject } from '@angular/core/testing';

import { HighwayService } from './highway.service';

describe('HighwayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighwayService]
    });
  });

  it('should ...', inject([HighwayService], (service: HighwayService) => {
    expect(service).toBeTruthy();
  }));
});
