import { TestBed } from '@angular/core/testing';

import { EspecialityService } from './especiality.service';

describe('EspecialityService', () => {
  let service: EspecialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspecialityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
