import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import DoctorDetails from './pages/DoctorDetails';
import HospitalRegistration from './pages/HospitalRegistration';
import PatientRegistration from './pages/PatientRegistration';
import UpdateExamineDetails from './pages/UpdateExamineDetails';
import HospitalDetails from './pages/HospitalDetails';
import PatientDetails from './pages/PatientDetails';
import MedicalRecords from './pages/MedicalRecords';
import ViewExamineDetails from './pages/ViewExamineDetails';
import AddRecords from './pages/AddRecords';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Home />}></Route>
      <Route path="/doctordetails" element={<DoctorDetails/>}></Route>
      <Route path="/hospitalregistration" element={<HospitalRegistration/>}></Route>
      <Route path="/patientregistration" element={<PatientRegistration/>}></Route>
      <Route path="/updateexaminedetails" element={<UpdateExamineDetails/>}></Route>
      <Route path="/hospitaldetails" element={<HospitalDetails/>}></Route>
      <Route path="/patientdetails" element={<PatientDetails/>}></Route>
      <Route path="/medicalrecords" element={<MedicalRecords/>}></Route>
      <Route path="/viewexaminedetails" element={<ViewExamineDetails/>}></Route>
      <Route path="/addrecords" element={<AddRecords/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
