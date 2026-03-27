type accountModel = {
  id?: number;
  name?: string;
  avatar?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  birth?: string;
};
export type Item = {
  id: number;
  doctor_id: string;
  patient_id: string;
  time_id: number;
  clinic_id: number;
  description: string;
  status: string;
  createAt: string;
  doctor?: {
    id?: number;
    account?: accountModel;
    degree?: string;
    specialtyName?: string;
  };
  appointmentDate?: string;
  patient?: {
    id?: number;
    account?: accountModel;
    bhyt?: string;
  };
  time?: {
    id?: number;
    start?: string;
    end?: string;
  };
  clinic?: {
    id?: number;
    name?: string;
  };
};
export type TimeItem = {
  id: number;
  label: string;
};
