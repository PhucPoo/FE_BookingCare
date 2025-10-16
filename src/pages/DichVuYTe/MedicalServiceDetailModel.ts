// Địa chỉ của bệnh viện / phòng khám
export interface Address {
  id: number;
  city: string;
}

// Thông tin chi tiết của 1 bệnh viện hoặc phòng khám
export interface ClinicSpecialtiesModel {
  id: number;
  name: string;
  description: string;
  image?: string;
  phoneNumber: string;
  position: string;
  address?: Address;
  specialtyId?: number;
  specialtyName?: string;
}

// Kiểu dữ liệu tổng (nếu bạn nhận từ API)
export interface SpecialtyResponse {
  specialties: ClinicSpecialtiesModel[];
  specialtyId: number;
  specialtyName: string;
}
