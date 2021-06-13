import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSpecialityComponent } from './user-speciality.component';

describe('UserSpecialityComponent', () => {
  let component: UserSpecialityComponent;
  let fixture: ComponentFixture<UserSpecialityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSpecialityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
