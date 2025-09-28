export type DoctorListModel = {
  id?: number;
  degree?: string;
  account?: {
    id?: number;
    name: string;
    avatar?: string;
  };
  clinic?: {
    id?: number;
    name: string;
    address?: {
      id?: number;
      city?: string;
    };
  };
};
