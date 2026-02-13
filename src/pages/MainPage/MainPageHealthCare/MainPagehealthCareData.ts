import service1 from "../../../public/img/service1.png";
import service2 from "../../../public/img/service2.png";
import service3 from "../../../public/img/service3.png";
import service4 from "../../../public/img/service4.png";

type MainPageHealthCareData = {
  id?: number;
  image: string;
  title?: string;
  content?: string;
  cost?: string;
  sentence?: string;
};
export const MainPageHealthCareData: MainPageHealthCareData[] = [
  {
    id: 1,
    image: service1,
    title: "Đặt khám Bệnh Dạ dày - Đại tràng",
    content: "🏥 Trung Tâm Nội Soi Tiêu Hoá Doctor Check",
    cost: "💰 200.000đ",
    sentence: "Đặt khám ngay",
  },
  {
    id: 2,
    image: service2,
    title: "Đặt khám Bệnh Tiêu Hoá - Gan Mật",
    content: "🏥 Trung Tâm Nội Soi Tiêu Hoá Doctor Check",
    cost: "💰 200.000đ",
    sentence: "Đặt khám ngay",
  },
  {
    id: 3,
    image: service3,
    title: "Gói khám mắt tổng quát",
    content: "🏥 Trung Tâm Mắt Quốc Tế Phương Đông",
    cost: "💰 200.000đ",
    sentence: "Đặt khám ngay",
  },
  {
    id: 4,
    image: service4,
    title: "Gói khám tiểu đường",
    content: "🏥 Phòng Khám Đa khoa Quốc Tế Golden Healthcare",
    cost: "💰 200.000đ",
    sentence: "Đặt khám ngay",
  },
];
