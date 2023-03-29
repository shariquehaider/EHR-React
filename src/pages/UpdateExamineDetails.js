import Header from "../components/Navbar";
import Input from "../components/input";
import Button from "../components/Button";
import { investigations, generalExamination, systemicExamination, medicalRecord } from "../json/examineDetails";
import { useState } from "react";

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

    function handleSubmit(event){ 
        event.preventDefault();
    }
    return (
        <div>
            <Header></Header>
            <div className="page_title">Patient Body examine details</div>
            <form className="form_control">
                <h2>Previous dates of medical record updated</h2>
                { medicalRecord.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={medicalRecords[i]} name={element.name} change={handleChangeMedical}/>) }
                <hr/><br/>
                <h2>Investigations</h2>
                { investigations.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={investigation[i]} name={element.name} change={handleChangeInvestigation}/>) }
                <hr/><br/>
                <h2>General Examination</h2>
                { generalExamination.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={generalExam[i]} name={element.name} change={handleChangeGeneralExam}/>) }
                <hr/><br/>
                <h2>Systemic Examination</h2>
                { systemicExamination.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={systemicExam[i]} name={element.name} change={handleChangeSystemicExam}/>) }
                <Button onSubmit={handleSubmit}></Button>
            </form>
        </div>
    )
}