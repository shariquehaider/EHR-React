import Header from "../components/Navbar";
import Input from "../components/input";
import Button from "../components/Button";
import { investigations, generalExamination, systemicExamination, medicalRecord } from "../json/examineDetails";
import { useEffect, useState } from "react";
import getBodyExamineContract from "../utils/bodyexamine";

const contractAddress = '0xb692fc689FF5A53894847F1D96996B0Fb4149163';
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
        contract = getBodyExamineContract(contractAddress);
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

    async function handleSubmitMedical(event) {  
        await contract.previous_dates(...medicalRecord);
        event.preventDefault();
    }

    async function handleSubmitUpdate(event){ 
        await contract.investigations(...investigation);
        await contract.general_examin(...generalExam);
        await contract.sys_examin(...systemicExam);
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