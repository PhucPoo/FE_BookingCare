import "./LoadingPage.css";
const LoadingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg>
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
};

export default LoadingPage;
