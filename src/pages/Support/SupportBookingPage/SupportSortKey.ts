export type SupportSortKey =
  | "createAt"
  | "doctor"
  | "appointmentDate"
  | "status"
  | "patient"
  | "clinic"
  | "time";
export type dataToQueryModel = {
  patientName: string;
  date: string;
  doctorName: string;
  page: number;
  size: number;
};
