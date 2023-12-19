import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { StartPageComponent } from './doctor_interface/start-page/start-page.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DoctorNavBarComponent } from './doctor_interface/doctor-nav-bar/doctor-nav-bar.component';
import { AppointmentModalComponent } from './doctor_interface/appointment-modal/appointment-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalMakeAppointmentComponent } from './doctor_interface/modal-make-appointment/modal-make-appointment.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PatientListComponent } from './doctor_interface/patient-list/patient-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    StartPageComponent,
    DoctorNavBarComponent,
    AppointmentModalComponent,
    ModalMakeAppointmentComponent,
    PatientListComponent,
  ],
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
