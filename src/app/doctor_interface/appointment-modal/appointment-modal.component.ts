import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-appointment-modal',
    templateUrl: './appointment-modal.component.html',
    styleUrls: ['./appointment-modal.component.css'],
    

})
export class AppointmentModalComponent {


startAppointment() {
throw new Error('Method not implemented.');
}
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
      
     }
}

