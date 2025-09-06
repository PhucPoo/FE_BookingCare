import "./Statistics.css";

import Cash from "./Cash";
import Booking from "./Booking";
import Bill from "./BillStatistcs";

const Statistics = () => {
  return (
    <div className="statistics-container ">
      <h1 className="text-2xl">Hello Admin</h1>

      <Cash />
      <Booking />
      <Bill />
    </div>
  );
};

export default Statistics;
