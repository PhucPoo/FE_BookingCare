export interface Account {
  id: number;
  name: string;
  email: string;
  phoneNumber: string | null;
  gender: "MALE" | "FEMALE" | string;
  address: string | null;
  avatar: string | null;
  birth: string | null;
  cccd: string | null;
  createAt: string;
}

export interface Role {
  id: number;
  name: string;
  updateAt: string;
}

export interface Address {
  id: number;
  city: string;
}

export interface Clinic {
  id: number;
  name: string;
  description: string;
  position: string;
  image: string;
  phoneNumber: string;
  cost: number;
  createAt: string;
  degree: string;
  isActive: boolean;
  address: Address;
}

export interface Specialty {
  id: number;
  name: string;
  description: string | null;
}
export type availableTime = {
  id?: number;
  start?: string;
  end?: string;
};
export interface DoctorSearchModel {
  id: number;
  degree: string;
  isActive: boolean;
  account: Account;
  role: Role;
  clinic: Clinic;
  specialty: Specialty;
  availableTime: availableTime[];
}
