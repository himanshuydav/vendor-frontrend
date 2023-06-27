import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginScreen from './Auth';
import "../assets/style/global.css"
import Layout from './staffdashboard/layout';
import '@mdi/font/css/materialdesignicons.min.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VendorLayout from './vendordashboard/vendorlayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminManager from './staffdashboard/admin-manegerdashboard';
import { ModalContext } from '../Context';
import CommonModal from './CommonModal';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");
  const [modalSize, setModalSize] = useState("");
  const [data, setData] = useState({});
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)


  const handleModalData = (data, size = "xl") => {
    setModalData(data);
    setModalSize(size);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  useEffect(() => {

    if (!user) {
      navigate('/login')
    }
   
  }, [user,navigate])





  return (
    <div>
       <ModalContext.Provider
        value={{
          handleModalData,
          closeModal,
          setData,
          data,
          isModalOpen,
          modalData,
        }}
        >
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
        <Route exact path="/login" element={<LoginScreen />} />

          {
          user?.role === "Vendor" ? 
            <Route path="/*" element={<VendorLayout />}/>
          : 
          user?.role === "Staff" && user?.roles[0]?.RoleName === "Admin Executive"
          ?
          <Route path="/*" element={<Layout/>} /> 
          :
          user?.role === "Staff" && user?.roles[0]?.RoleName === "Admin Manager"
          ?
          <Route path="/*" element={<AdminManager />} /> 
          :
          user?.role === "Staff" && user?.roles[0]?.RoleName === "VP Operations"
          ?
          <Route path="/*" element={<AdminManager />} />
          :
          <Route path="/login" element={<LoginScreen />} />
          }

         <Route
          path="*"
          element={<Navigate to={user ? '/' : '/login'} />}
         />
      </Routes>

       <CommonModal
          handleModalData={handleModalData}
          isModalOpen={isModalOpen}
          modalData={modalData}
          modalSize={modalSize}
          closeModal={closeModal}
        />
      </ModalContext.Provider>
    </div>
  )
}

export default App