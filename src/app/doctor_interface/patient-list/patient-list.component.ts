import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'; 

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  selectedPatient: any;
  patients: any[] | undefined;
  displayedColumns: string[] = ['id', 'name', 'familyName', 'insurance', 'address', 'gender', 'age', 'contraindications', 'allergies', 'contactNumber', 'email'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator; 

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.loadPatients();
  }

  selectPatient(patient: any) {
    this.selectedPatient = patient;
  }
  viewPatient(patient: any) {
    this.selectedPatient = patient;
  }

  loadPatients() {
    this.patientService.getAllPatients().subscribe(
      (patients) => {
        this.patients = patients;
        this.dataSource.data = this.patients;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error loading patients:', error);
      }
    );
  }
}