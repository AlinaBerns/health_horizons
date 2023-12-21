import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppointmentProcessComponent } from '../appointment-process/appointment-process.component';
import { CalendarApiService } from '../../services/calendar-api.service';

@Component({
    selector: 'app-appointment-modal',
    templateUrl: './appointment-modal.component.html',
    styleUrls: ['./appointment-modal.component.css'],
    

})
export class AppointmentModalComponent {

    appointmentId: number;
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private dialogRef: MatDialogRef<AppointmentModalComponent>, private calendarApiService: CalendarApiService) {
        // Извлекаем appointmentId из входных данных
        this.appointmentId = data.appointmentId;
      }


      startAppointment() {
        this.calendarApiService.getAppointmentInfo(this.appointmentId).subscribe(appointmentInfo => {
            // Получение идентификатора приема из полученной информации
            const appointmentId = appointmentInfo.id;
        
            // Теперь у вас есть appointmentId, который вы можете использовать
            console.log('Appointment ID:', appointmentId);
        
            // Далее, вы можете использовать appointmentId по своему усмотрению,
            // например, передать его в другой компонент или выполнить другие действия
            // в зависимости от вашей бизнес-логики.
          });
        this.dialogRef.close();
      
        // Передаем appointmentId в компонент AppointmentProcessComponent
        const dialogRef: MatDialogRef<AppointmentProcessComponent> = this.dialog.open(AppointmentProcessComponent, {
          data: { appointmentId: this.appointmentId }, // Передача appointmentId в диалоговое окно
          width: '468px',
          disableClose: true,
        });
      
        dialogRef.afterClosed().subscribe((result) => {
          // Обработка результата после закрытия окна приема
          console.log(result);
        });
      }
}

