export type AdminBillManageModel = {
  id?: number;
  totalBill?: number;
  status?: string;
  createAt?: string;
  updateAt?: string;
  patient?: {
    id?: number;
    name?: string;
  };
  medicalRecord?: {
    id?: number;
    description?: string;
  };
  support?: {
    id?: number;
    name?: string;
  };
  services?: {
    id?: number;
    service?: {
      id?: number;
      name?: string;
      cost: number;
    };
    quantity?: number;
    serviceCost?: number;
    totalService?: number;
  }[];
};
