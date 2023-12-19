import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { Patient } from '../models/patient.model';

// Измененная интерфейсная модель
export interface CalendarEvent {
  appointmentId: number;
  appointmentDate: string;
  appointmentTime: string;
  doctorId: number;
  patient: number;
}

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private apiUrl = 'http://localhost:8080/api/appointments';

  constructor(private http: HttpClient) { }

  getAllAppointments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
