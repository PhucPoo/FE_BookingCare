import "../../public/css/bookingcare2.css"

export default function Statistics() {
  return (
    <>
      <section className="statistics">
        <h2>THỐNG KÊ</h2>
        <div className="stats-grid">
          <div className="stat">
            <img src="/img/stat1.png" alt="Lượt khám" />
            <h3>3.0M+</h3>
            <p>Lượt khám</p>
          </div>
          <div className="stat">
            <img src="/img/stat2.png" alt="Cơ sở Y tế" />
            <h3>300+</h3>
            <p>Cơ sở Y tế</p>
          </div>
          <div className="stat">
            <img src="/img/stat3.png" alt="Bệnh viện" />
            <h3>50+</h3>
            <p>Bệnh viện</p>
          </div>
          <div className="stat">
            <img src="/img/stat4.png" alt="Bác sĩ" />
            <h3>1000+</h3>
            <p>Bác sĩ</p>
          </div>
          <div className="stat">
            <img src="/img/stat5.png" alt="Lượt truy cập tháng" />
            <h3>850K+</h3>
            <p>Lượt truy cập tháng</p>
          </div>
          <div className="stat">
            <img src="/img/stat6.png" alt="Lượt truy cập ngày" />
            <h3>28.3K+</h3>
            <p>Lượt truy cập ngày</p>
          </div>
        </div>
      </section>
    </>
  );
}
