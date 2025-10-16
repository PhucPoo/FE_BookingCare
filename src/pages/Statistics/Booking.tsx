import { AutoComplete, Button, Select } from "antd/lib";
import { useEffect, useState } from "react";
import {
  adminGetStatistic,
  adminGetStatisticBooking,
  adminSearchClinic,
} from "../../api/Admin/AdminApi";
import type {
  DataToChart,
  PointModel,
  StatisticsModel,
} from "./StatisticModel";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { formatNumber } from "../../utils/constant";
import { searchDoctor } from "../../api/Doctor/DoctorApi";
import type { DoctorSearchModel } from "../DanhSach/MedicalFacility/DoctorSearchModel";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const StatisticBooking = () => {
  const [DataToDisplay, setDataToDisplay] = useState<string>("monthly");
  const [YearlyData, setYearlyData] = useState<{
    startYear: number | string;
    endYear: number | string;
  }>({
    startYear: "",
    endYear: "",
  });
  const [MonthlyData, setMonthlyData] = useState<string>("2025");
  const [DailyData, setDailyData] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const [StatisticsData, setStatisticData] = useState<StatisticsModel>({
    points: [],
    summary: {
      avgOrderValue: 0,
      count: 0,
      total: 0,
    },
    dataToChart: [],
  });

  const [searchDoctorList, setSearchDoctorList] = useState<
    { value: number; label: string }[]
  >([]);
  const [searchDoctorSelectedValue, setSearchDoctorSelectedValue] = useState<
    string | number
  >("");
  const [searchDoctorSelectedLabel, setSearchDoctorSelectedLabel] =
    useState<string>("");

  const [searchClinicList, setSearchClinicList] = useState<
    { value: number; label: string }[]
  >([]);
  const [searchClinicSelectedValue, setSearchClinicSelectedValue] = useState<
    string | number
  >("");
  const [searchClinicSelectedLabel, setSearchClinicSelectedLabel] =
    useState<string>("");
  const monthSelection = [
    { value: "2026", label: "2026" },
    { value: "2025", label: "2025" },
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
  ];
  const buildQuey = () => {
    let query = "";
    switch (DataToDisplay) {
      case "yearly":
        query = `yearly?startYear=${YearlyData.startYear}&endYear=${YearlyData.endYear}`;
        break;
      case "monthly":
        query = `monthly?year=${MonthlyData}`;
        break;
      case "daily":
        query = `daily?start=${DailyData.start}&end=${DailyData.end}`;
        break;

      default:
        break;
    }
    if (searchClinicSelectedValue || searchDoctorSelectedValue) {
      query = `${query}&doctorId=${searchDoctorSelectedValue}&clinicId=${searchClinicSelectedValue}`;
    }
    return query;
  };
  const buildData = async (data: PointModel[]) => {
    let newData: DataToChart[] = [];
    newData = await Promise.all(
      data.map((item) => {
        return {
          name: item.label,
          uv: Number(item.total),
        };
      })
    );
    return newData;
  };
  const handleGetStatistic = async () => {
    const query = buildQuey();
    await adminGetStatisticBooking(query)
      .then(async (res) => {
        const newData = await buildData(res.data.points);

        setStatisticData((prev) => ({
          ...prev,
          points: res.data.points,
          dataToChart: newData,
          summary: res.data.summary,
        }));
      })
      .catch((err) => {
        console.log("🚀 ~ handleGetStatistic ~ err:", err);
      });
  };
  const labels = StatisticsData.dataToChart.map((item) => item.name);
  const values = StatisticsData.dataToChart.map((item) => item.uv);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Lịch khám đã hoàn thành",
        data: values,
        backgroundColor: "#8884d8",
        borderRadius: 8, // bo góc cột
        barPercentage: 0.5, // độ rộng cột
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Thống kê theo tháng",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.parsed.y;
            return `Số đơn: ${value}`;
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1, // mỗi nấc tăng 1 đơn vị
            precision: 0, // không hiện số thập phân
            callback: function (value) {
              return value; // giữ nguyên số
            },
          },
        },
      },
    },
  };

  const buildDoctorData = async (data: DoctorSearchModel[]) => {
    let res: { value: number; label: string }[] = [];
    res = await Promise.all(
      data.map((item) => {
        return {
          label: item.account.name,
          value: Number(item.id),
        };
      })
    );
    return res;
  };
  const handleSearchDoctor = async (e: string) => {
    await searchDoctor("name", e)
      .then(async (res) => {
        console.log("🚀 ~ handleSearchDoctor ~ res:", res);
        const result = await buildDoctorData(res.data.result);
        setSearchDoctorList(result);
      })
      .catch((err) => {
        console.log("🚀 ~ handleSearchDoctor ~ err:", err);
      });
  };

  const buildClinicData = async (data) => {
    let res: { value: number; label: string }[] = [];
    res = await Promise.all(
      data.map((item) => {
        return {
          label: item.name,
          value: Number(item.id),
        };
      })
    );
    return res;
  };
  const handleSearchClinic = async (e: string) => {
    await adminSearchClinic("name", e)
      .then(async (res) => {
        const result = await buildClinicData(res.data.result);
        setSearchClinicList(result);
      })
      .catch((err) => {
        console.log("🚀 ~ handleSearchClinic ~ err:", err);
      });
  };
  useEffect(() => {
    handleGetStatistic();
  }, []);
  return (
    <>
      <div className="statistic-content">
        <div className="text-xl mb-2">Báo cáo lịch khám hoàn thành</div>
        <div className="flex justify-between items-center gap-3">
          <div>
            <Select
              style={{ width: "200px" }}
              allowClear
              defaultValue={DataToDisplay}
              options={[
                { value: "yearly", label: "năm" },
                { value: "monthly", label: "tháng" },
                { value: "daily", label: "ngày" },
              ]}
              placeholder="select it"
              onChange={(e) => {
                setDataToDisplay(e);
              }}
            />
          </div>
          {/* clinic */}
          <div>
            <AutoComplete
              style={{ width: 200 }}
              onSearch={(e) => {
                handleSearchClinic(e);
              }}
              placeholder="Tên cơ sở"
              options={searchClinicList}
              onSelect={(value, option) => {
                setSearchClinicSelectedValue(option.value);
                setSearchClinicSelectedLabel(option.label);
              }}
              onChange={(e) => {
                if (!e || e === undefined || e === "") {
                  setSearchClinicSelectedValue("");
                }
                setSearchClinicSelectedLabel(e);
              }}
              allowClear
              value={searchClinicSelectedLabel}
            />
          </div>
          {/* doctor */}
          <div>
            <AutoComplete
              style={{ width: 200 }}
              onSearch={(e) => {
                handleSearchDoctor(e);
              }}
              placeholder="Tên bác sĩ"
              options={searchDoctorList}
              onChange={(e) => {
                if (!e || e === undefined || e === "") {
                  setSearchDoctorSelectedValue("");
                }
                setSearchDoctorSelectedLabel(e);
              }}
              onSelect={(value, option) => {
                setSearchDoctorSelectedValue(option.value);
                setSearchDoctorSelectedLabel(option.label);
              }}
              allowClear
              value={searchDoctorSelectedLabel}
            />
          </div>
          <div>
            {DataToDisplay === "yearly" && (
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  className="w-full not-only: px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={(e) => {
                    setYearlyData({ ...YearlyData, startYear: e.target.value });
                  }}
                  placeholder="từ năm"
                />
                <input
                  type="number"
                  className="w-full  not-only: px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={(e) => {
                    setYearlyData({ ...YearlyData, endYear: e.target.value });
                  }}
                  placeholder="đến năm"
                />
                <Button onClick={() => handleGetStatistic()}>Tìm</Button>
              </div>
            )}
            {DataToDisplay === "monthly" && (
              <div className="flex items-center gap-3">
                <Select
                  style={{ width: "100px" }}
                  allowClear
                  defaultValue={monthSelection[0].label}
                  options={monthSelection}
                  placeholder="select it"
                  onChange={(e) => {
                    setMonthlyData(e);
                  }}
                />
                <Button onClick={() => handleGetStatistic()}>Tìm</Button>
              </div>
            )}
            {DataToDisplay === "daily" && (
              <div className="flex items-center gap-3">
                <input
                  type="date"
                  className="w-full  not-only: px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={(e) => {
                    setDailyData({ ...DailyData, start: e.target.value });
                  }}
                />
                <input
                  type="date"
                  className="w-full  not-only: px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={(e) => {
                    setDailyData({ ...DailyData, end: e.target.value });
                  }}
                />
                <Button onClick={() => handleGetStatistic()}>Tìm</Button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 w-full flex justify-between items-center ">
          <div
            className=" py-2 px-5 rounded-xs"
            style={{ width: "32%", boxShadow: "0 2px 3px 1px gray" }}
          >
            <p className="text-xs">Tổng lịch khám</p>
            <p className="font-bold text-xl">{StatisticsData?.summary.total}</p>
          </div>
        </div>

        <Bar data={chartData} options={chartOptions} />
        <div>
          <p>chi tiết</p>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default StatisticBooking;
