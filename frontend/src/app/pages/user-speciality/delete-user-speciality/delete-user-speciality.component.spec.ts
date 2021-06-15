import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserSpecialityComponent } from './delete-user-speciality.component';

describe('DeleteUserSpecialityComponent', () => {
  let component: DeleteUserSpecialityComponent;
  let fixture: ComponentFixture<DeleteUserSpecialityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUserSpecialityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
