import { TestBed } from '@angular/core/testing';

import { EmplregService } from './emplreg.service';

describe('EmplregService', () => {
  let service: EmplregService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmplregService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
