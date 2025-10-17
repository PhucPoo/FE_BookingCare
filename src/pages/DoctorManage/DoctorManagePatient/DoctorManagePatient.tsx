import { useEffect, useState } from "react";
import {
  doctorSearchPatient,
  getPatientByDoctorId,
  sortPatientByDoctorId,
} from "../../../api/Doctor/DoctorApi";
import type { DoctorManagePatientModel } from "./DoctorManagePatientModel";
import DoctorManagePatientTable from "./DoctorManagePatientTable";
import type { DoctorManagePatientSortKeyModel } from "./DoctorManagePatientSortKey";
import useUserInfoStore from "../../../Zustand/configZustand";
import DoctorManagePatientDetail from "./DoctorManagePatientDetail";
type DataToQuery = {
  phoneNumber: string;
  name: string;
};
const DoctorManagePatient = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalListPatient, setTotalListPatient] = useState<number>(500);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [listPatient, setListPatient] = useState<DoctorManagePatientModel[]>(
    []
  );
  const [medicalRecordSelected, setMedicalRecordSelected] =
    useState<DoctorManagePatientModel>();
  const [checkRender, setCheckRender] = useState<
    Record<DoctorManagePatientSortKeyModel, boolean>
  >({
    patient: false,
    clinic: false,
    id: false,
    specialty: false,
    createAt: false,
  });

  const [dataToQuery, setDataToQuery] = useState<DataToQuery>({
    phoneNumber: "",
    name: "",
  });
  const userInfo = useUserInfoStore((state) => state.userInfo);

  const handleGetPatientByDoctorId = async () => {
    const res = await getPatientByDoctorId(userInfo.actorId, "1", "5");
    setListPatient(res.data.result);
    setPageSize(res.data.meta.pageSize);
    setTotalListPatient(res.data.meta.totals);
    setCurrentPage(res.data.meta.page);
    setDataToQuery({
      name: "",
      phoneNumber: "",
    });
  };

  //handle sort
  const handleSort = async (key: DoctorManagePatientSortKeyModel) => {
    const res = await sortPatientByDoctorId(
      "2",
      key,
      checkRender[key] ? "asc" : "desc"
    );
    setCheckRender({ ...checkRender, [key]: !checkRender[key] });
    setListPatient(res.data.result);
    setPageSize(res.data.meta.page);
    setTotalListPatient(res.data.meta.pageSize);
    setCurrentPage(res.data.meta.page);
  };
  const buildQuery = (data: DataToQuery) => {
    let query = "";

    Object.keys(data).forEach((key) => {
      const typedKey = key as keyof DataToQuery;
      const value = data[typedKey];

      if (value !== undefined && value !== "") {
        query += `&${typedKey}=${encodeURIComponent(String(value))}`;
      }
    });

    return query;
  };
  //handle search
  const handleSearch = async (value: string, key: string) => {
    const nextData = { ...dataToQuery, [key]: value };
    setDataToQuery({ ...dataToQuery, [key]: value });
    const queryString = buildQuery(nextData);
    const res = await doctorSearchPatient(queryString, userInfo.actorId);
    setListPatient(res.data.result);
    setPageSize(res.data.meta.pageSize);
    setTotalListPatient(res.data.meta.totals);
    setCurrentPage(res.data.meta.page);
  };

  const onLog = async (page: number, pageSize: number) => {
    if (dataToQuery.name || dataToQuery.phoneNumber) {
      const nextData = { ...dataToQuery, page: page, size: pageSize };
      const queryString = buildQuery(nextData);
      const res = await doctorSearchPatient(queryString, userInfo.actorId);
      setListPatient(res.data.result);
      setPageSize(res.data.meta.pageSize);
      setTotalListPatient(res.data.meta.totals);
      setCurrentPage(res.data.meta.page);
    } else {
      const res = await getPatientByDoctorId(userInfo.actorId, page, pageSize);
      setListPatient(res.data.result);
      const { meta } = res.data;
      setPageSize(meta.pageSize);
      setTotalListPatient(meta.totals);
      setCurrentPage(meta.page);
    }
  };
  const handleSearchChange = (key: keyof DataToQuery, value: string) => {
    //dùng để controll input
    setDataToQuery((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    handleGetPatientByDoctorId();
  }, []);

  return (
    <div className="p-5 bg-white mx-5">
      <DoctorManagePatientTable
        ListPatient={listPatient}
        currentPage={currentPage}
        pageSize={pageSize}
        totalListPatient={totalListPatient}
        handleGetPatientByDoctorId={handleGetPatientByDoctorId}
        handleSort={handleSort}
        handleSearch={handleSearch}
        onLog={onLog}
        searchValue={dataToQuery}
        setSearchValue={handleSearchChange}
        setIsModalOpen={setIsModalOpen}
        setMedicalRecordSelected={setMedicalRecordSelected}
      />
      <DoctorManagePatientDetail
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        medicalRecordSelected={medicalRecordSelected}
      />
    </div>
  );
};

export default DoctorManagePatient;
