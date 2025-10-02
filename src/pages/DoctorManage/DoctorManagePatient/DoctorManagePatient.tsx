import { useEffect, useState } from "react";
import {
  getPatientByDoctorId,
  sortPatientByDoctorId,
} from "../../../api/Doctor/DoctorApi";
import type { DoctorManagePatientModel } from "./DoctorManagePatientModel";
import DoctorManagePatientTable from "./DoctorManagePatientTable";
import type { DoctorManagePatientSortKeyModel } from "./DoctorManagePatientSortKey";

const DoctorManagePatient = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalListPatient, setTotalListPatient] = useState<number>(500);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listPatient, setListPatient] = useState<DoctorManagePatientModel[]>(
    []
  );
  const [checkRender, setCheckRender] = useState<
    Record<DoctorManagePatientSortKeyModel, boolean>
  >({
    doctor: false,
    patient: false,
    clinic: false,
    id: false,
    specialty: false,
  });
  const handleGetPatientByDoctorId = async () => {
    const res = await getPatientByDoctorId(2, "1", "5");
    console.log("🚀 ~ handleGetPatientByDoctorId ~ res:", res);
    setListPatient(res.data.result);
    setPageSize(res.data.meta.page);
    setTotalListPatient(res.data.meta.pageSize);
    setCurrentPage(res.data.meta.page);
  };
  //handle sort
  const handleSort = async (key: DoctorManagePatientSortKeyModel) => {
    const res = await sortPatientByDoctorId(
      "2",
      key,
      checkRender[key] ? "asc" : "desc"
    );
    setCheckRender({ ...checkRender, [key]: !checkRender[key] });
    setTotalListPatient(res.data.result);
    setPageSize(res.data.meta.page);
    setTotalListPatient(res.data.meta.pageSize);
    setCurrentPage(res.data.meta.page);
  };
  useEffect(() => {
    handleGetPatientByDoctorId();
  }, [checkRender]);

  return (
    <div className="p-5 bg-white mx-5">
      <DoctorManagePatientTable
        ListPatient={listPatient}
        currentPage={currentPage}
        pageSize={pageSize}
        totalListPatient={totalListPatient}
        handleGetPatientByDoctorId={handleGetPatientByDoctorId}
        handleSort={handleSort}
      />
    </div>
  );
};

export default DoctorManagePatient;
