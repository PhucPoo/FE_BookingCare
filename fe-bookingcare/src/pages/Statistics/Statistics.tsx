import "./Statistics.css";

import Cash from "./Cash";
import Booking from "./Booking";
import Bill from "./Bill";

const Statistics = () => {
  return (
    <div className="container">
      <h1>Hello Admin</h1>

      <Cash />
      <Booking />
      <Bill />
    </div>
  );
};

export default Statistics;
