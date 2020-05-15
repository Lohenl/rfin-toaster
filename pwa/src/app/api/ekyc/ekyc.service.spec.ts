import { TestBed } from '@angular/core/testing';

import { EkycService } from './ekyc.service';

describe('EkycService', () => {
  let service: EkycService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EkycService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
