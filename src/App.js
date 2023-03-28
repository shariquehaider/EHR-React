import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import DoctorDetails from './pages/DoctorDetails';
import HospitalRegistration from './pages/HospitalRegistration';
import PatientRegistration from './pages/PatientRegistration';
import ExamineDetails from './pages/ExamineDetails';
import HospitalDetails from './pages/HospitalDetails';
import PatientDetails from './pages/PatientDetails';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Home />}></Route>
      <Route path="/doctordetails" element={<DoctorDetails/>}></Route>
      <Route path="/hospitalregistration" element={<HospitalRegistration/>}></Route>
      <Route path="/patientregistration" element={<PatientRegistration/>}></Route>
      <Route path="/examinedetails" element={<ExamineDetails/>}></Route>
      <Route path="/hospitaldetails" element={<HospitalDetails/>}></Route>
      <Route path="/patientdetails" element={<PatientDetails/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
