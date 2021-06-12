import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserSpecialityComponent } from './add-user-speciality.component';

describe('AddUserSpecialityComponent', () => {
  let component: AddUserSpecialityComponent;
  let fixture: ComponentFixture<AddUserSpecialityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserSpecialityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
