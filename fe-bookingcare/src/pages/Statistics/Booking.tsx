import React from "react";
import { Link } from "react-router-dom";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const Booking = () => {
  const data01 = [
    { name: "Đã hoàn thành", value: 400 },
    { name: "Chưa hoàn thành", value: 300 },
    { name: "Đã huỷ", value: 300 },
  ];

  return (
    <>
      <div className="statistic-container">
        <div className="statistic-container_title">
          <h2>Thống kê đơn khám</h2>
          <Link to={"#!"}>Xem thêm</Link>
        </div>

        <div className="statistic-container_bill">
          <ResponsiveContainer width={"100%"} height={250}>
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data01}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Booking;
