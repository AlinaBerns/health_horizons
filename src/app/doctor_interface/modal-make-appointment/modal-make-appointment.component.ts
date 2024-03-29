import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Patient } from 'src/app/models/patient.model';
import { CalendarApiService } from 'src/app/services/calendar-api.service';
import { CalendarService } from 'src/app/services/calendar.service';
import { PatientService } from 'src/app/services/patient.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal-make-appointment',
  templateUrl: './modal-make-appointment.component.html',
  styleUrls: ['./modal-make-appointment.component.css']
})
export class ModalMakeAppointmentComponent implements OnInit {
  patients: Patient[] = [];
  selectedPatientId: number | undefined;

  @Output() updateCalendar = new EventEmitter<void>();
  patient!: Patient;

  appointmentData: any = {
    appointmentDate: Date,
    appointmentStartTime: Date,
    appointmentEndTime: Date
  };

  constructor(
    public dialogRef: MatDialogRef<ModalMakeAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private calendarService: CalendarService,
    private calendarApiService: CalendarApiService,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Загрузите список пациентов при инициализации компонента
    this.patientService.getAllPatients().subscribe(
      (patients) => {
        this.patients = patients;
      },
      (error) => {
        console.error('Ошибка при загрузке пациентов:', error);
      }
    );
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (!this.appointmentData.appointmentDate || !this.appointmentData.appointmentStartTime) {
      console.log('Не все поля заполнены');
      return;
    }

    // Проверьте, что пациент выбран
    if (!this.selectedPatientId) {
      console.log('Пациент не выбран');
      return;
    }

    // Получите выбранную дату и время
    const selectedDate = this.appointmentData.appointmentDate;
    const selectedTime = this.appointmentData.appointmentStartTime;
    const durationInMilliseconds = 15 * 60 * 1000;
    // Создайте объект Date для начала и конца приема
    const startDateTime = new Date(`${selectedDate} ${selectedTime}`);
    const endDateTime = new Date(startDateTime.getTime() + durationInMilliseconds); // Замените durationInMilliseconds на продолжительность приема в миллисекундах

    // Подготовьте данные для создания события
    const newEvent = {
      title: '',
      start: startDateTime,
      end: endDateTime,
      patientId: this.selectedPatientId,
      appointmentInfo: {},
    };

    this.calendarApiService.createAppointment(newEvent).subscribe(
      (response) => {
        console.log('Событие успешно создано:', response);
        const appointmentId = response.id;
        this.appointmentData.appointmentId = appointmentId;
        this.calendarApiService.getAppointmentInfo(appointmentId).subscribe(
          (appointmentInfo) => {
            console.log('Информация о событии получена:', appointmentInfo);
            // Здесь вы можете обрабатывать полученные данные
          },
          (error) => {
            console.error('Ошибка при получении информации о событии:', error);
          }
        );
        this.updateCalendar.emit();
        this.dialogRef.close();
        this.snackBar.open('Event added successfully', 'Close', {
          duration: 3000, // Время отображения уведомления в миллисекундах
        });
        this.router.navigate([], { relativeTo: this.route, skipLocationChange: true }).then(() => {
          this.router.navigate([this.router.url]);
        });

      },
      (error) => {
        console.error('Ошибка при создании события:', error);
      }
    );
  }

  onPatientSelectionChange(event: any): void {
    this.selectedPatientId = event.value;
  }
}
