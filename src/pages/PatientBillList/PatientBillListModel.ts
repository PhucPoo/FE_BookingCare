export interface PatientBillListModel {
  id: number;
  createAt: string; // ISO Date string
  medicalRecord: MedicalRecord;
  patient: Patient;
  services: ServiceEntry[];
  status: "PAID" | "UNPAID" | string;
  support: Support;
  totalBill: number;
  updateAt: string | null;
}

export interface MedicalRecord {
  id: number;
  description: string;
}

export interface Patient {
  id: number;
  name: string;
}

export interface ServiceEntry {
  id: number;
  createAt: string;
  quantity: number;
  service: Service;
  serviceCost: number;
  totalService: number;
  updateAt: string | null;
}

export interface Service {
  id: number;
  name: string;
  cost: number;
  des?: string; // optional nếu có thêm description
}

export interface Support {
  id: number;
  name: string;
}
