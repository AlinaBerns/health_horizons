import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';


@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients: any[] | undefined;

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.patientService.getAllPatients().subscribe(
      (patients) => {
        this.patients = patients;
      },
      (error) => {
        console.error('Error loading patients:', error);
        // Обработка ошибки: например, отображение сообщения пользователю
      }
    );
  }
}
