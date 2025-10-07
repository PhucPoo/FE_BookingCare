export interface Clinic {
  id: number;
  name: string;
}

export interface Doctor {
  id: number;
  name: string;
  degree: string;
}

export interface Patient {
  id: number;
  name: string;
}

export interface Specialty {
  id: number;
  name: string;
  updateAt: string | null;
}

export interface DoctorManagePatientModel {
  id: number;
  description: string;
  createAt: string; // ISO date string
  clinic: Clinic;
  doctor: Doctor;
  patient: Patient;
  specialty: Specialty;
}
