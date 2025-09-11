import "../../public/css/banner.css"
export default function Swiper() {
    return (
        <>
            <div className="swiper mySwiper">
                <div className="swiper-wrapper">
                    <div className="swiper-slide"> <img src="../public/img/baner1.png" alt="Banner 1" /> </div>
                    <div className="swiper-slide"> <img src="../public/img/baner2.png" alt="Banner 2" /> </div>
                    <div className="swiper-slide"> <img src="../public/img/baner3.png" alt="Banner 3" /> </div>
                </div>

                {/* Pagination (chấm tròn)  */}
                <div className="swiper-pagination"></div>
            </div>
        </>
    );
}
