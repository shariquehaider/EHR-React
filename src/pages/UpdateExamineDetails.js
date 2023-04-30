import Header from "../components/Navbar";
import Input from "../components/input";
import Button from "../components/Button";
import { investigations, generalExamination, systemicExamination, medicalRecord } from "../json/examineDetails";
import { useEffect, useState } from "react";
import getContract from "../utils/combine";
import { contractAddress } from "../contractAddress.js";

let contract;

export default function UpdateExamineDetails() {
    const [ medicalRecords, setMedicalRecords ] = useState({
        id: "",
        date: ""
    });

    const [ investigation, setInvestigation ] = useState({
        id: "",
        blood: "",
        urine: "",
        ecg: "",
        mri: "",
        ct: "",
        xray: ""
    });

    const [ generalExam, setGeneralExam ] = useState({
        id: "",
        built: "",
        nourishment: "",
        eyes: "",
        tongue: "",
        pulse: "",
        bp: "",
        temp: "",
        respiratory: ""
    });

    const [ systemicExam, setSystemicExam ] = useState({
        id: "",
        cvs: "",
        cns: "",
        rs: "",
        abdomen: ""
    });

    useEffect(()=> {
    });

    function handleChangeMedical(event) { 
        const { name, value } = event.target;
        setMedicalRecords(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleChangeInvestigation(event){
        const { name, value } = event.target;
        setInvestigation(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleChangeGeneralExam(event) {
        const { name, value } = event.target;
        setGeneralExam(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleChangeSystemicExam(event) { 
        const { name, value } = event.target;
        setSystemicExam(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleSubmitMedical(event) {  
        contract = getContract(contractAddress);
        contract.previous_dates(medicalRecord.id, medicalRecord.date);
        event.preventDefault();
    }

    function handleSubmitUpdate(event){ 
        contract = getContract(contractAddress);
        contract.investigations(investigation.id, investigation.blood, investigation.urine, investigation.ecg, investigation.mri, investigation.ct, investigation.xray);
        contract.general_examin(generalExam.id, generalExam.built, generalExam.nourishment, generalExam.eyes, generalExam.tongue, generalExam.pulse, generalExam.bp, generalExam.temp, generalExam.respiratory);
        contract.sys_examin(systemicExam.id, systemicExam.cvs, systemicExam.cns, systemicExam.rs, systemicExam.abs, systemicExam.abs);
        event.preventDefault();
    }
    
    return (
        <div>
            <Header></Header>
            <div className="page_title">Patient Body examine details</div>
            <form className="form_control">
                <h2>Previous dates of medical record updated</h2>
                { medicalRecord.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={medicalRecords[i]} name={element.name} change={handleChangeMedical}/>) }
                <Button onSubmit={handleSubmitMedical}></Button>
                <hr/><br/>
                <h2>Investigations</h2>
                { investigations.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={investigation[i]} name={element.name} change={handleChangeInvestigation}/>) }
                <hr/><br/>
                <h2>General Examination</h2>
                { generalExamination.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={generalExam[i]} name={element.name} change={handleChangeGeneralExam}/>) }
                <hr/><br/>
                <h2>Systemic Examination</h2>
                { systemicExamination.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={systemicExam[i]} name={element.name} change={handleChangeSystemicExam}/>) }
                <Button onSubmit={handleSubmitUpdate}></Button>
            </form>
        </div>
    )
}