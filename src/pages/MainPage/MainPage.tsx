import MainPageDoctor from "./MainPageDoctors/MainPageDoctor";
import MainPageHeader from "./MainPageHeader/MainPageHeader";
import MainPageHospitals from "./MainPagehospitals/MainPageHospitals";
import MainPartnersSwiper from "./MainPartnersSwiper/MainPartnersSwiper";
import MainSectionServicePage from "./MainSectionServicePage/MainSectionServicePage";
import "../../public/css/bookingcare.css";
import "../../public/css/bookingcare2.css";
import "../../public/css/bookingcare3.css";

import "../../public/css/banner.css";
import "../../public/css/hospitals.css";
import "../../public/css/new.css";
import "../../public/css/support.css";
import MainPageSpecialty from "./MainPageSpecialty/MainPageSpecialty";
import MainPageHealthCare from "./MainPageHealthCare/MainPageHealthCare";
import MainPageStatistics from "./MainPageStatistics/MainPageStatistics";
import MainPageNews from "./MainPageNews/MainPageNews";
import Footer from "../../components/Footer/Footer";

const MainPage = () => {
  return (
    <div>
      <MainPageHeader />
      <MainSectionServicePage />
      <MainPartnersSwiper />
      <MainPageHospitals />
      <MainPageDoctor />
      <MainPageHealthCare />
      <MainPageSpecialty />
      <MainPageStatistics />
      <MainPageNews />
      <Footer />
    </div>
  );
};

export default MainPage;
