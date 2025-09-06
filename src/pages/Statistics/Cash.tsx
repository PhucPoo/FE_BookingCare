import React from "react";
import { Statistic } from "antd";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const formatter = (value) => <CountUp end={value} separator="," />;
const Cash = () => {
  const data = [
    {
      name: "Tháng 1",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "Tháng 2",
      uv: 3000,
      pv: 1398,
    },
    {
      name: "Tháng 3",
      uv: 2000,
      pv: 9800,
    },
    {
      name: "Tháng 4",
      uv: 2780,
      pv: 3908,
    },
    {
      name: "Tháng 5",
      uv: 1890,
      pv: 4800,
    },
    {
      name: "Tháng 6",
      uv: 2390,
      pv: 3800,
    },
    {
      name: "Tháng 7",
      uv: 3490,
      pv: 4300,
    },
    {
      name: "Tháng 8",
      uv: 3490,
      pv: 4300,
    },
    {
      name: "Tháng 9",
      uv: 3490,
      pv: 4300,
    },
    {
      name: "Tháng 10",
      uv: 3490,
      pv: 4300,
    },
    {
      name: "Tháng 11",
      uv: 3490,
      pv: 4300,
    },
    {
      name: "Tháng 12",
      uv: 3490,
      pv: 4300,
    },
  ];

  return (
    <>
      <div>
        <h2>Tổng thu nhập hôm nay</h2>
        <Statistic title="Đơn vị vnđ" value={112893} formatter={formatter} />
      </div>
      <div className="statistic-content">
        <div className="statistic-content_title">
          <h2>Thống kê tổng thu (theo tháng)</h2>
          <Link to={"#!"}>Xem thêm</Link>
        </div>

        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="uv" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Cash;
