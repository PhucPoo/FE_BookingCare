import { Outlet } from "react-router-dom";
import MainPageHeader from "../MainPage/MainPageHeader/MainPageHeader";
import "./CommonListCss.css";
import Footer from "../../components/Footer/Footer";
const List = () => {
  return (
    <div>
      <MainPageHeader />

      <Outlet />

      <Footer />
    </div>
  );
};

export default List;
