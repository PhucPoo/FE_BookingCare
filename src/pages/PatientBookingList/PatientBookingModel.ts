export type PatientBookingModel = {
  appointmentDate?: string;
  clinic?: Clinic;
  createAt?: string;
  description?: string;
  doctor?: Doctor;
  id?: number;
  patient?: Patient;
  status?: string;
  time?: Time;
  updateAt?: string | null;
};

export interface Clinic {
  id: number;
  name: string;
  description: string;
  phoneNumber: string;
  position: string;
  address: Address;
  createAt: string;
  image: string | null;
}
export interface Address {
  id: number;
  city: string;
}
export interface Doctor {
  id: number;
  degree: string; // "MASTER"
  isActive: boolean;
  cost: number;
  specialtyDescription: string;
  specialtyName: string;
  createAt: string;
  updateAt: string | null;
  account: Account;
  role: Role;
  clinic: Clinic;
}
export interface Account {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address?: string;
  avatar?: string;
  birth?: string | null;
  cccd?: string;
  gender?: string | null;
  createAt: string;
  updateAt?: string | null;
}

export interface Role {
  id: number;
  name: string; // "DOCTOR"
}
export interface Patient {
  id: number;
  bhyt: string; // bảo hiểm y tế
  isActive: boolean | null;
  account: Account;
}
export interface Time {
  id: number;
  start: string; // "08:30"
  end: string; // "09:00"
}
