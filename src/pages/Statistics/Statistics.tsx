import "./Statistics.css";

import Cash from "./Cash";
import StatisticBooking from "./Booking";

const Statistics = () => {
  return (
    <div className="statistics-container">
      {/* <h1 className="text-2xl">Hello Admin</h1> */}
      <Cash />
      <StatisticBooking></StatisticBooking>
    </div>
  );
};

export default Statistics;
