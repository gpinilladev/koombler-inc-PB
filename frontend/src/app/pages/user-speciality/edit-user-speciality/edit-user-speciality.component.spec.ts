import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserSpecialityComponent } from './edit-user-speciality.component';

describe('EditUserSpecialityComponent', () => {
  let component: EditUserSpecialityComponent;
  let fixture: ComponentFixture<EditUserSpecialityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserSpecialityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
