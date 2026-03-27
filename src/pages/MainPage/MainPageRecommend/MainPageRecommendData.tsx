import recommend1 from "../../../public/img/recommend1.png";
import recommend2 from "../../../public/img/recommend2.png";
import recommend3 from "../../../public/img/recommend3.png";
import recommend4 from "../../../public/img/recommend4.png";
type MainPageRecommendData = {
  id?: number;
  image: string;
  title?: string;
  link?: string;
};
export const MainPageRecommendList: MainPageRecommendData[] = [
  {
    id: 1,
    image: recommend1,
    title: "Cơ sở y tế",
    link: "/co-so-y-te",
  },
  {
    id: 2,
    image: recommend2,
    title: "Bác sĩ",
    link: "/bac-si",
  },
  {
    id: 3,
    image: recommend3,
    title: "Chuyên khoa",
    link: "/chuyen-khoa",
  },
  {
    id: 4,
    image: recommend4,
    title: "Bài viết",
    link: "/bai-viet",
  },
];
