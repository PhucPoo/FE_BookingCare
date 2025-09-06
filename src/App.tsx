
import Sidebar from './components/Sidebar/Sidebar.tsx'
import Header from './components/Header/Header.tsx'
import DoctorManagement from './pages/Accounts/DoctorList/DoctorManagement.tsx'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.tsx'



function App() {


  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64 min-h-screen bg-gray-50">
          {/* Place your main dashboard content here */}
            <Header/>
            <div className='p-10'>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
