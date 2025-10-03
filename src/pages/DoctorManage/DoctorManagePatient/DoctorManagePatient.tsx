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
  const [searchValue, setSearchValue] = useState({
    patient: "",
    clinic: "",
  });

  const [filterCreatedAt, setFilterCreatedAt] = useState<{
    from: string;
    to: string;
  }>({
    from: "",
    to: "",
  });
  const [listPatient, setListPatient] = useState<DoctorManagePatientModel[]>(
    []
  );
  const [checkRender, setCheckRender] = useState<
    Record<DoctorManagePatientSortKeyModel, boolean>
  >({
    patient: false,
    clinic: false,
    id: false,
    specialty: false,
    createAt: false,
  });

  const handleGetPatientByDoctorId = async () => {
    const res = await getPatientByDoctorId(2, "1", "5");
    setListPatient(res.data.result);
    setPageSize(res.data.meta.page);
    setTotalListPatient(res.data.meta.totals);
    setCurrentPage(res.data.meta.page);
    setSearchValue({ clinic: "", patient: "" });
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

  //handle search
  const handleSearch = (value: string, key: string) => {
    let PatientListClone = listPatient;
    switch (key) {
      case "patient":
        PatientListClone = PatientListClone.filter((item) => {
          if (item && item.patient?.name)
            return item.patient?.name.includes(value);
        });
        setListPatient(PatientListClone);
        break;
      case "clinic":
        PatientListClone = PatientListClone.filter((item) => {
          if (item && item.clinic?.name)
            return item.clinic?.name.includes(value);
        });
        setListPatient(PatientListClone);
        break;
      default:
        break;
    }
    setSearchValue({ ...searchValue, [key]: value });
  };

  //search by createAt
  const handleFindByDate = () => {
    console.log(filterCreatedAt);

    if (!filterCreatedAt.from || !filterCreatedAt.to) {
      alert("missing parameter");
      return;
    }
    if (filterCreatedAt.from > filterCreatedAt.to) {
      alert("from must be smaller to");
      return;
    }
    const from = new Date(filterCreatedAt.from);
    const to = new Date(filterCreatedAt.to);

    let listPatientClone = listPatient;
    listPatientClone = listPatientClone.filter((item) => {
      return from <= new Date(item.createAt) && new Date(item.createAt) <= to;
    });
    setListPatient(listPatientClone);
  };
  const onLog = (page: number, pageSize: number) => {
    console.log("Đang ở trang:", page, pageSize);
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
        handleFindByDate={handleFindByDate}
        setFilterCreatedAt={setFilterCreatedAt}
        filterCreatedAt={filterCreatedAt}
        onLog={onLog}
        searchData={searchValue}
      />
    </div>
  );
};

export default DoctorManagePatient;
