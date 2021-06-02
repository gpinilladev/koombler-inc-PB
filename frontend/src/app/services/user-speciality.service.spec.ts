import { TestBed } from '@angular/core/testing';

import { UserSpecialityService } from './user-speciality.service';

describe('UserSpecialityService', () => {
  let service: UserSpecialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSpecialityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
