import doctor1 from "../../../public/img/doctor1.png";
import doctor2 from "../../../public/img/doctor2.png";
import doctor3 from "../../../public/img/doctor3.png";
import doctor4 from "../../../public/img/doctor4.png";
type MainPageDoctorsData = {
  id?: number;
  image: string;
  rate?: number;
  booked?: number;
  name?: string;
  specialty?: string;
  cost?: string;
  title?: string;
  content?: string;
};

export const MainPageDoctorsData: MainPageDoctorsData[] = [
  {
    id: 1,
    image: doctor1,
    rate: 5,
    booked: 30,
    name: "BS CKI. Vũ Thị Hà",
    specialty: "👁 Mắt",
    cost: "💰 150.000đ",
    title: "🏥 Bác sĩ Chuyên Khoa",
    content: "Tư vấn ngay",
  },
  {
    id: 2,
    image: doctor2,
    rate: 4,
    booked: 30,
    name: "Ths BS. Lê Hoàng Thiên",
    specialty: "🫀 Nội tổng quát",
    cost: "💰 150.000đ",
    title: "🏥 Bác sĩ Chuyên Khoa",
    content: "Tư vấn ngay",
  },
  {
    id: 3,
    image: doctor3,
    rate: 4.4,
    booked: 30,
    name: "BS CKI. Đỗ Đăng Khoa",
    specialty: "❤️‍🩹 Tim mạch can thiệp",
    cost: "💰 150.000đ",
    title: "🏥 Bác sĩ Chuyên Khoa",
    content: "Tư vấn ngay",
  },
  {
    id: 4,
    image: doctor4,
    rate: 4.9,
    booked: 30,
    name: "BS CKI. Nguyễn Phúc Thiện",
    specialty: "🫀 Nội tim mạch",
    cost: "💰 150.000đ",
    title: "🏥 Bác sĩ Chuyên Khoa",
    content: "Tư vấn ngay",
  },
];
