import stat1 from "../../../public/img/stat1.png";
import stat2 from "../../../public/img/stat2.png";
import stat3 from "../../../public/img/stat3.png";
import stat4 from "../../../public/img/stat4.png";
import stat5 from "../../../public/img/stat5.png";
import stat6 from "../../../public/img/stat6.png";
const MainPageStatistics = () => {
  return (
    <div>
      {" "}
      <section className="statistics">
        <h2>THỐNG KÊ</h2>
        <div className="stats-grid">
          <div className="stat">
            <img src={stat1} alt="" />
            <h3>3.0M+</h3>
            <p>Lượt khám</p>
          </div>
          <div className="stat">
            <img src={stat2} alt="" />
            <h3>300+</h3>
            <p>Cơ sở Y tế</p>
          </div>
          <div className="stat">
            <img src={stat3} alt="" />
            <h3>50+</h3>
            <p>Bệnh viện</p>
          </div>
          <div className="stat">
            <img src={stat4} alt="" />
            <h3>1000+</h3>
            <p>Bác sĩ</p>
          </div>
          <div className="stat">
            <img src={stat5} alt="" />
            <h3>850K+</h3>
            <p>Lượt truy cập tháng</p>
          </div>
          <div className="stat">
            <img src={stat6} alt="" />
            <h3>28.3K+</h3>
            <p>Lượt truy cập ngày</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPageStatistics;
