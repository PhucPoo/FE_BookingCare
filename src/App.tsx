
import Sidebar from './components/Sidebar/Sidebar.tsx'
import Header from './components/Header/Header.tsx'



function App() {
  

  return (
    <>
      <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen bg-gray-50">
        <Header />
        {/* Place your main dashboard content here */}
        <div className="p-10">
          <p className="text-gray-500">Your dashboard content...</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
