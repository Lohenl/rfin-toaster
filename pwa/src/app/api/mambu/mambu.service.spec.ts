import { TestBed } from '@angular/core/testing';

import { MambuService } from './mambu.service';

describe('MambuService', () => {
  let service: MambuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MambuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
