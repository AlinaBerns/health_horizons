import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalMakeAppointmentComponent } from '../modal-make-appointment/modal-make-appointment.component';
import { CalendarService } from 'src/app/services/calendar.service';
import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';

// Импортируем fullcalendar
import dayGridPlugin from '@fullcalendar/daygrid';
import { AppointmentService } from 'src/app/appointment.service';
import { CalendarApiService } from 'src/app/services/calendar-api.service';
import { PatientService } from 'src/app/services/patient.service';
import { Event } from 'src/app/models/event.model';
import { Patient } from 'src/app/models/patient.model';
@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css'],
})
export class StartPageComponent implements OnInit {
  calendarOptions: any;
  appointments: any[] | undefined;
  todayEvents: any[] = [];
  todayStr: string | undefined;

  constructor(
   
    private calendarApiService: CalendarApiService, // Внедрение нового сервиса
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private patientService: PatientService
  ) {}

  ngOnInit() {
    // Инициализируем fullcalendar
    this.calendarOptions = {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      events: [],
    };

    // Загружаем события при инициализации
    this.loadEvents();
  }

  // Загрузка событий из Spring API
  loadEvents() {
    this.calendarApiService.getAllEvents().subscribe(
      (events: Event[]) => {
        // Установите связанных пациентов для каждого события
        events.forEach((event) => {
          this.loadPatientForEvent(event);
        });

        this.appointments = events;
        this.updateCalendar();
        console.log(this.appointments); // Поместите здесь, чтобы убедиться, что данные получены
      },
      (error: any) => {
        console.error('Error loading events:', error);
        // Обработка ошибки: например, отображение сообщения пользователю
      }
    );
  }

  loadPatientForEvent(event: Event) {
    if (event.patientId) {
      this.patientService.getPatientById(event.patientId).subscribe(
        (patient: Patient) => {
          event.patient = patient;
        },
        (error: any) => {
          console.error('Error loading patient for event:', error);
          // Обработка ошибки: например, отображение сообщения пользователю
        }
      );
    }
  }

  // Остальные методы остаются без изменений

  updateCalendar() {
    // Обновляем календарь
    this.calendarOptions.events = this.appointments;
    this.filterTodayEvents();
    this.cdr.detectChanges();
  }

  filterTodayEvents() {
    const today = new Date();
    this.todayStr = today.toISOString().split('T')[0];

    this.todayEvents = this.calendarOptions.events.filter(
      (event: { start?: string }) => {
        return (
          event.start &&
          typeof event.start === 'string' &&
          event.start.split('T')[0] === this.todayStr
        );
      }
    );
  }

  openAppointmentModal(id: any) {
    console.log('Открытие модального окна для события с ID:', id);
  
    if (id && typeof id === 'number') {
      // Получение времени начала приема
      this.calendarApiService.getAppointmentStartTime(id).subscribe(
        (startTime: string) => {
          console.log('Время начала получено:', startTime);
  
          // Получение времени окончания приема
          this.calendarApiService.getAppointmentEndTime(id).subscribe(
            (endTime: string) => {
              console.log('Время окончания получено:', endTime);
  
              // Получение информации о пациенте
              this.calendarApiService.getPatientIdByAppointmentId(id).subscribe(
                (patientId: number) => {
                  this.patientService.getPatientById(patientId).subscribe(
                    (patientInfo: any) => {
                      console.log('Информация о пациенте:', patientInfo);
  
                      // Открытие модального окна, передавая необходимые данные
                      const dialogRef = this.dialog.open(AppointmentModalComponent, {
                        width: '467px',
                        data: {
                          startTime: startTime,
                          endTime: endTime,
                          patient: patientInfo,
                          data: { appointmentId: id },
                        },
                      });
  
                      // Подписка на событие после закрытия модального окна
                      dialogRef.afterClosed().subscribe(result => {
                        console.log('Модальное окно закрыто с результатом:', result);
                        // Логика при необходимости после закрытия модального окна
                      });
                    },
                    (error: any) => {
                      console.error('Ошибка при загрузке информации о пациенте:', error);
                    }
                  );
                },
                (error: any) => {
                  console.error('Ошибка при загрузке ID пациента:', error);
                }
              );
            },
            (error: any) => {
              console.error('Ошибка при загрузке времени окончания приема:', error);
            }
          );
        },
        (error: any) => {
          console.error('Ошибка при загрузке времени начала приема:', error);
        }
      );
    } else {
      console.error('Неверный идентификатор события:', id);
      // Обработка ситуации, когда ID не является действительным числом (по вашему усмотрению)
    }
    this.loadEvents();
  }
  
  
  
  formatDate(date: Date): string {
    // Ваша логика форматирования даты
    return date.toISOString(); // Например, просто возвращает строку
  }

  openAppointmentModal2() {
    const dialogRef = this.dialog.open(ModalMakeAppointmentComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.componentInstance.updateCalendar.subscribe(() => {
      // Подписываемся на Observable и обрабатываем результат
      this.calendarApiService.getAllEvents().subscribe(
        (events: any[]) => {
          this.appointments = events;
          this.updateCalendar();
        },
        (error: any) => {
          console.error('Error loading events:', error);
          // Обработка ошибки: например, отображение сообщения пользователю
        }
      );
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Appointment details:', result);
        this.addToCalendar(result);
      }
    });
  }

  addToCalendar(appointmentDetails: any): void {
    console.log('Добавлено новое событие:', appointmentDetails);
    
    // Проверяем, определено ли свойство appointments
    if (this.appointments) {
      // Добавляем новое событие в this.appointments
      this.appointments.push(appointmentDetails);
      
      // Обновляем календарь после успешного добавления события
      this.updateCalendar();
      this.loadEvents();
    }
  }

  openModal(startTime: string, endTime: string, patientInfo: any) {
    // Открываем модальное окно, передавая время начала, конца и информацию о пациенте
    const dialogRef = this.dialog.open(AppointmentModalComponent, {
      width: '467px',
      data: {
        startTime: startTime,
        endTime: endTime,
        patient: patientInfo,
      },
    });
  
    // Подписываемся на событие после закрытия модального окна
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal closed with result:', result);
      // Дополнительная логика при необходимости
    });
  }
}
