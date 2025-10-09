export type SupportSortKey =
  | "createdAt"
  | "doctor"
  | "appointmentDate"
  | "status"
  | "patient"
  | "clinic"
  | "time";
export type dataToQueryModel = {
  patientName: string;
  monthYear: string;
  doctorName: string;
  page: number;
  size: number;
};
