import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getClinicSpecialties } from "../../api/Specialties/SpecialtiesApi";
import type {
  ClinicSpecialtiesModel,
  SpecialtyResponse,
} from "./MedicalServiceDetailModel";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

const MedicalServicesDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [clinicSpecialty, setClinicSpecialty] = useState<SpecialtyResponse>({
    specialtyId: -1,
    specialtyName: "",
    specialties: [],
  });
  const handleGetClinicSpecialties = async () => {
    if (id)
      await getClinicSpecialties(id)
        .then((res) => {
          setClinicSpecialty(res.data.result);
        })
        .catch((err) => {
          console.log("🚀 ~ handleGetClinicSpecialties ~ err:", err);
        });
  };
  useEffect(() => {
    window.scroll(0, 0);
    handleGetClinicSpecialties();
  }, []);
  return (
    <div className="container mt-5">
      <Breadcrumb location={location.pathname} />
      <div>
        <p className="font-bold text-xl">{clinicSpecialty.specialtyName}</p>

        <div>
          {clinicSpecialty &&
            clinicSpecialty.specialties &&
            clinicSpecialty.specialties.map((item: ClinicSpecialtiesModel) => {
              return (
                <div
                  className="flex gap-5 medicalFacility_item_contain items-center cursor-pointer"
                  onClick={() => navigate(`/danh-sach/co-so-y-te/${item.id}`)}
                  key={item.id}
                >
                  <img src={item?.image} className="medicalFacility_item-img" />
                  <div className="medicalFacility_item-name text-xl">
                    {item.name}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MedicalServicesDetail;
