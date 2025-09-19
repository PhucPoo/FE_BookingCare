import { useLocation } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";

type DoctorDetailModel = {
  id?: number;
  degree?: string;
  account?: { id?: number; name: string };
  image?: string;
};

const DoctorDetail = () => {
  const location = useLocation();

  return (
    <div className="container">
      <Breadcrumb location={location.pathname} />
    </div>
  );
};

export default DoctorDetail;
