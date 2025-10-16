import { Button, Select } from "antd/lib";
import { useEffect, useState } from "react";
import { adminGetStatistic } from "../../api/Admin/AdminApi";
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Cash = () => {
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

  const monthSelection = [
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
    await adminGetStatistic(query)
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
        label: "Doanh thu",
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
            if (value >= 1_000_000)
              return `Doanh thu: ${(value / 1_000_000).toFixed(2)}M`;
            if (value >= 1_000)
              return `Doanh thu: ${(value / 1_000).toFixed(0)}K`;
            return `Doanh thu: ${value}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(0)}M`;
            if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
            return value;
          },
        },
      },
    },
  };

  useEffect(() => {
    handleGetStatistic();
  }, []);
  return (
    <>
      <div className="statistic-content">
        <div className="flex justify-between items-center gap-3">
          <div className="text-xl">Báo cáo doanh thu</div>
          <div>
            <Select
              style={{ width: "300px" }}
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

          <div>
            {DataToDisplay === "yearly" && (
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  className="w-full not-only: px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={(e) => {
                    setYearlyData({ ...YearlyData, startYear: e.target.value });
                  }}
                />
                <input
                  type="number"
                  className="w-full  not-only: px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={(e) => {
                    setYearlyData({ ...YearlyData, endYear: e.target.value });
                  }}
                />
                <Button onClick={() => handleGetStatistic()}>Tìm</Button>
              </div>
            )}
            {DataToDisplay === "monthly" && (
              <div className="flex items-center gap-3">
                <Select
                  style={{ width: "300px" }}
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
            <p className="text-xs">Tổng doanh thu</p>
            <p className="font-bold text-xl">
              {formatNumber(StatisticsData?.summary.total)}
            </p>
          </div>
          <div
            className=" py-2 px-5 rounded-xs"
            style={{ width: "32%", boxShadow: "0 2px 3px 1px gray" }}
          >
            <p className="text-xs">Số lịch khám</p>
            <p className="font-bold text-xl">{StatisticsData?.summary.count}</p>
          </div>
          <div
            className=" py-2 px-5 rounded-xs"
            style={{ width: "32%", boxShadow: "0 2px 3px 1px gray" }}
          >
            <p className="text-xs">giá trung bình 1 đơn</p>
            <p className="font-bold text-xl">
              {formatNumber(StatisticsData?.summary.avgOrderValue)}
            </p>
          </div>
        </div>

        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default Cash;
