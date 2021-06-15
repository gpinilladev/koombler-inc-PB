import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSolicitudComponent } from './delete-solicitud.component';

describe('DeleteSolicitudComponent', () => {
  let component: DeleteSolicitudComponent;
  let fixture: ComponentFixture<DeleteSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
