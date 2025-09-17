import { useNavigate } from "react-router-dom";
import "./MainPageRecommend.css";
import { MainPageRecommendList } from "./MainPageRecommendData";
const MainPageRecommend = () => {
  const navigate = useNavigate();
  return (
    <div style={{ margin: "50px 120px" }}>
      <div className="recommend-title">
        <p>Dành cho bạn</p>
      </div>
      <div className="recommend_content">
        {MainPageRecommendList.map((item) => {
          return (
            <div
              className="recommend_content-item"
              key={item.id}
              onClick={() => navigate(`/danh-sach${item.link}`)}
            >
              <img src={item.image} />
              <p>{item.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainPageRecommend;
