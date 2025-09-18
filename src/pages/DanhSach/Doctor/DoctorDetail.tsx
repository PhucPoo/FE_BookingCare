type DoctorDetailModel = {
  id?: number;
  degree?: string;
  account?: { id?: number; name: string };
  image?: string;
};

const DoctorDetail = () => {
  return <div>DoctorDetail</div>;
};

export default DoctorDetail;
