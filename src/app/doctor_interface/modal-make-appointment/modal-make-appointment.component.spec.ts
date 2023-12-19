import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMakeAppointmentComponent } from './modal-make-appointment.component';

describe('ModalMakeAppointmentComponent', () => {
  let component: ModalMakeAppointmentComponent;
  let fixture: ComponentFixture<ModalMakeAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMakeAppointmentComponent]
    });
    fixture = TestBed.createComponent(ModalMakeAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
