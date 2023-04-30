import Result from "../components/Result";
import Input from "../components/input";
import Button from "../components/Button";
import Header from "../components/Navbar";
import { investigationsDetails, systemicExaminationDetails, generalExaminationDetails } from "../json/examineDetails";
import { useState } from "react";
import getContract from "../utils/combine";
import { contractAddress } from "../contractAddress.js";

let contract;

export default function ViewExamineDetails() {
    const [ patientId, setPatientId ] = useState("");
    const [ recordId, setRecordId ] = useState("");

    function handleChangePatient(event){ 
        const value = event.target.value;
        setPatientId(()=>{
            return {
                [patientId]: value
            }
        });
    }
    
    function handleChangeRecord(event){ 
        const value = event.target.value;
        setRecordId(()=>{
            return {
                [recordId]: value
            }
        });
    }

    function handleSubmitPatient(event){
        contract = getContract(contractAddress);
        event.preventDefault();
    }

    function handleSubmitRecord(event){
        contract = getContract(contractAddress);
        event.preventDefault();
    }

    return(
        <div>
            <Header></Header>
            <div className="page_title">View Patient Body Examine Details</div>
            <form className="form_control">
                <h2>Previous dates of medical record updated</h2>
                <Input placeHolder="Enter Patient Id" types="number" name="id" value={patientId} change={handleChangePatient}/>
                <Button onSubmit={handleSubmitPatient}></Button>
            </form>
            <br/>
            <form className="form_control">
                <h2>Patient Body Examine Details</h2>
                <Input placeHolder="Enter Record Id" types="number" name="id" value={recordId} change={handleChangeRecord}/>
                <Button onSubmit={handleSubmitRecord}></Button>
            </form>
            <br/>
            <div className="form_control">
                <h2>Investigations</h2>
                { investigationsDetails.map(element => <Result key={element.key} innerText={element.innerText}/>) }
                <br/>
                <h2>General Examination</h2>
                { generalExaminationDetails.map(element => <Result key={element.key} innerText={element.innerText}/>) }
                <br/>
                <h2>Systemic Examination</h2>
                { systemicExaminationDetails.map(element => <Result key={element.key} innerText={element.innerText}/>) }
            </div>
        </div>
    )
}