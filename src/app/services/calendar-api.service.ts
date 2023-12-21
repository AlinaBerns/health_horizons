import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarApiService {

  private apiUrl = 'http://localhost:8080/api/events';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(
        (events) => console.log('Events loaded successfully:', events),
        (error) => console.error('Error loading events:', error)
      )
    );
  }

  getAppointmentStartTime(appointmentId: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/${appointmentId}/start`, { responseType: 'text' });
  }

  getAppointmentEndTime(appointmentId: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/${appointmentId}/end`, { responseType: 'text' });
  }

  getPatientIdByAppointmentId(appointmentId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${appointmentId}/patientId`);
  }

  getAppointmentInfo(appointmentId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${appointmentId}`).pipe(
      map(data => Array.isArray(data) ? data[0] : data)
    );
  }

  createAppointment(newEvent: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newEvent);
  }

  getAppointmentIdByEventId(eventId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${eventId}/appointmentId`);
  }
}
