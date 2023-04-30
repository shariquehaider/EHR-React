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
import Web3 from 'web3';
import { useState } from 'react';

let acc;

function App() {
  const [currentAccount, setCurrentAccount] = useState();

    const checkWalletIsConnected = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make Sure You have Meta Mask");
            return;
        } else {
            console.log("Wallet Exist! We are ready to go.");
            window.web3 = new Web3(ethereum);
            window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
            ethereum.autoRefreshOnNetworkChange = false;
        }
        const accounts = await ethereum.enable();
        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log(`Found an authorized account: ${account}`);
            setCurrentAccount(account);
            acc = currentAccount;
        } else {
            console.log("No authorized account found")
        }
    }

    window.onload = checkWalletIsConnected();

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
export { acc };
