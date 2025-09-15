import Sidebar from "./components/Sidebar/Sidebar.tsx";
import Header from "./components/Header/Header.tsx";
import AppRoutes from "./routes/AppRoutes.tsx";

function App() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64 min-h-screen bg-gray-50">
          {/* Place your main dashboard content here */}
          <Header />
          <div className="p-10">
            <AppRoutes />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
