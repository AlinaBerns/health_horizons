// appointment-process.component.ts
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarApiService } from 'src/app/services/calendar-api.service';
import { PatientService } from 'src/app/services/patient.service';


@Component({
    selector: 'app-appointment-process',
    templateUrl: './appointment-process.component.html',
    styleUrls: ['./appointment-process.component.css'],
})
export class AppointmentProcessComponent implements OnInit, OnDestroy {
 
    appointmentId!: number; // добавьте поле для хранения ID приема
    remainingTime: number = 900; // 15 минут в секундах
    countdownInterval: any;

    // Инпуты для анамнеза
    chiefComplaint: string = ''; // Жалобы
    pastIllnesses: string = ''; // Предыдущие заболевания
    surgicalHistory: string = ''; // История хирургических вмешательств
    currentMedications: string = ''; // Текущие лекарства

    // Информация о пациенте
    patientName: string = '';
    patientLastName: string = '';
    patientAge: string | null = null;
    patientGender: string = '';
  dialogConfig: any;
    // Добавьте другие поля о пациенте по необходимости

    constructor(
      public dialogRef: MatDialogRef<AppointmentProcessComponent>,
      private calendarApiService: CalendarApiService,
      private patientService: PatientService,
      @Inject(MAT_DIALOG_DATA) public data: any // Используйте @Inject(MAT_DIALOG_DATA)
    ) {}

    ngOnInit(): void {
        // Получите ID приема из входных данных (data)
        this.appointmentId = this.data.appointmentId;
        

        // Запустить отсчет времени
        this.startCountdown();

        // Получите информацию о текущем приеме
        this.calendarApiService.getAppointmentInfo(this.appointmentId).subscribe(appointmentInfo => {
            // Используйте полученные данные о приеме по своему усмотрению
            // Например:
            this.chiefComplaint = appointmentInfo.chiefComplaint;
            this.pastIllnesses = appointmentInfo.pastIllnesses;
            this.surgicalHistory = appointmentInfo.surgicalHistory;
            this.currentMedications = appointmentInfo.currentMedications;

            // Получите информацию о пациенте по ID
            this.patientService.getPatientById(appointmentInfo.patientId).subscribe(patientInfo => {
                this.patientName = patientInfo.name;
                this.patientLastName = patientInfo.familyName;
                this.patientAge = patientInfo.age;
                this.patientGender = patientInfo.gender;
                // Добавьте другие поля о пациенте по необходимости
            });
        });
    }

    formatTime(timeInSeconds: number): string {
        const minutes: string = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
        const seconds: string = (timeInSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    startCountdown() {
        this.countdownInterval = setInterval(() => {
            this.remainingTime--;

            if (this.remainingTime <= 0) {
                // Если время вышло, завершить прием
                this.endAppointment();
            }
        }, 1000); // Обновление каждую секунду
    }

    endAppointment() {
        // Остановить отсчет времени
        clearInterval(this.countdownInterval);

        // Логика для завершения приема
        // Здесь вы можете использовать собранную информацию, например,
        // this.chiefComplaint, this.pastIllnesses, this.surgicalHistory, this.currentMedications
        this.dialogRef.close('Appointment Ended');
    }

    ngOnDestroy() {
        // Убедитесь, что интервал очищается при уничтожении компонента
        clearInterval(this.countdownInterval);
    }
}
