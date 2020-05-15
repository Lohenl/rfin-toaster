import { TestBed } from '@angular/core/testing';

import { PerxService } from './perx.service';

describe('PerxService', () => {
  let service: PerxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
