import "../../public/css/bookingcare.css"

export default function ServicesUI() {
  return (
    <>
      <section className="services">
        <div className="service-card">
          <i className="fa fa-calendar-check"></i>
          <p>Đặt khám tại cơ sở</p>
        </div>
        <div className="service-card">
          <i className="fa fa-user-md"></i>
          <p>Đặt khám chuyên khoa</p>
        </div>
        <div className="service-card">
          <i className="fa fa-video"></i>
          <p>Gọi video với bác sĩ</p>
        </div>
        <div className="service-card">
          <i className="fa fa-user-nurse"></i>
          <p>Đặt khám theo bác sĩ</p>
        </div>
        <div className="service-card">
          <i className="fa fa-pills"></i>
          <p>Mua thuốc tại An Khang <span className="badge discount">-15%</span></p>
        </div>
        <div className="service-card">
          <i className="fa fa-users"></i>
          <p>Giúp việc cá nhân <span className="badge new">Mới</span></p>
        </div>
        <div className="service-card">
          <i className="fa fa-briefcase-medical"></i>
          <p>Khám doanh nghiệp <span className="badge new">Mới</span></p>
        </div>

      </section>
    </>
  );
}
