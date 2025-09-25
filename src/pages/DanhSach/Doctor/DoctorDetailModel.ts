export type DoctorDetailModel = {
  id?: number;
  degree?: string;
  account?: {
    id?: number;
    name: string;
    email: string;
    address: string;
    avatar?: string;
  };
  description?: string;
  cost?: number;
  clinic?: {
    id?: number;
    name?: string;
    address?: {
      id?: number;
      city?: string;
    };
  };
};
