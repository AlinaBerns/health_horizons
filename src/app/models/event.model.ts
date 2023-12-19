import { Patient } from "./patient.model";

export interface Event {
    id: number;
    doctor_id: number;
    end: Date; // или можно использовать тип Date
    start: Date; // или можно использовать тип Date
    title: string;
    patientId: number;
    patient?: Patient; // новое свойство, которое может отсутствовать
  }