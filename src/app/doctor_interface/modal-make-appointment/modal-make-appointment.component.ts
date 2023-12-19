import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Patient } from 'src/app/models/patient.model';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-modal-make-appointment',
  templateUrl: './modal-make-appointment.component.html',
  styleUrls: ['./modal-make-appointment.component.css']
})
export class ModalMakeAppointmentComponent {
  @Output() updateCalendar = new EventEmitter<void>();
  patient!: Patient;

  appointmentData: any = {
  appointmentDate: '',
  appointmentTime: ''
  };

  constructor(
    public dialogRef: MatDialogRef<ModalMakeAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private calendarService: CalendarService
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
  
  onSaveClick(): void {
    // Проверка, что все необходимые поля заполнены
    if (!this.appointmentData.appointmentDate || !this.appointmentData.appointmentTime) {
      console.log();
      return;
    }

    const newEvent = {
      title: this.appointmentData.appointmentDate, // Пример использования свойства пациента
      start: this.appointmentData.appointmentTime,
      appointmentInfo: {
        // Добавьте другие данные, которые необходимы для отображения
      },
    };

    // Используйте CalendarService для отправки данных на сервер
    //this.calendarService.createAppointment(newEvent).subscribe(
      //(response) => {
        //console.log('Событие успешно создано:', response);
        // Закрываем модальное окно и обновляем календарь
       // this.dialogRef.close();
       // this.updateCalendar.emit();
      //},
      //(error) => {
       // console.error('Ошибка при создании события:', error);
        // Обработка ошибки
    //  }
    //);
  }
}
