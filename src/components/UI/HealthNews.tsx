import "../../public/css/new.css"
export default function HealthNews() {
  return (
    <>
      <section className="news">
        <h2>TIN TỨC Y TẾ</h2>
        <div className="news-grid">
          {/* Card lớn */}
          <div className="news-card big">
            <img src="/img/new1.png" alt="Giải pháp Partner+" />
            <div className="news-content">
              <h3>
                Giải pháp Hỗ trợ truyền thông & chuyển đổi số Y tế - bookingcare
                Partner+
              </h3>
              <p className="date">08/09/2025, 10:14</p>
              <p>
                bookingcare Partner+ | Hỗ trợ truyền thông & chuyển đổi số Y tế
                là giải pháp giúp các cơ sở y tế có thêm nhiều cơ hội tiếp cận
                khách hàng tiềm năng mới.
              </p>
            </div>
          </div>

          {/* Card nhỏ */}
          <div className="news-card">
            <img src="/img/new2.png" alt="Dịch vụ hỗ trợ người lớn tuổi" />
            <div className="news-content">
              <h3>Dịch vụ hỗ trợ đưa người lớn tuổi đi khám trọn gói từ A-Z</h3>
              <p className="date">08/09/2025, 01:31</p>
            </div>
          </div>

          <div className="news-card">
            <img src="/img/new3.png" alt="Dịch vụ hỗ trợ tại TP.HCM" />
            <div className="news-content">
              <h3>
                Dịch vụ hỗ trợ đi khám bệnh tại TP.HCM: Giúp việc cá nhân Care247
              </h3>
              <p className="date">07/09/2025, 10:47</p>
            </div>
          </div>

          <div className="news-card">
            <img src="/img/new4.png" alt="Bệnh viêm hô hấp ở trẻ em" />
            <div className="news-content">
              <h3>Bệnh viêm hô hấp ở trẻ em: dấu hiệu và nguyên nhân</h3>
              <p className="date">30/10/2024, 10:30 - Thanh Ngân</p>
            </div>
          </div>

          <div className="news-card">
            <img src="/img/new5.png" alt="Bướu máu ở trẻ sơ sinh" />
            <div className="news-content">
              <h3>
                Bướu máu ở trẻ sơ sinh: từ nguyên nhân cho đến cách điều trị
              </h3>
              <p className="date">29/10/2024, 04:23 - Uyên Nhi</p>
            </div>
          </div>
        </div>

        <a href="#" className="see-more">
          Xem tất cả »
        </a>
      </section>
    </>
  );
}
