import Input from "../components/input";
import Button from "../components/Button";
import Header from "../components/Navbar";
import Result from "../components/Result";
import { insuranceDetails, presentIllnessDetails, pastIllnessDetails, provisionalDiagnosisDetails, treatmentSummary } from "../json/medicalRecords";
import { useEffect, useState } from "react";
import getRecordContract from "../utils/record";
import { contractAddress } from "../contractAddress.js";

let contract;

export default function MedicalRecords() {

    const [ prevId, setPrevId ] = useState();
    const [ prevRecord, setPrevRecord ] = useState();
    const [ recordId, setRecordId ] = useState();
    const [ records, setRecords ] = useState();

    useEffect(()=> {
        contract = getRecordContract(contractAddress);
    });

    function handleChange(event){
        const { name, value } = event.target;
        setPrevId(()=>{
            return {
                [name]: value
            }
        });
    }

    function handleRecordChange(event){
        const { name, value } = event.target;
        setRecordId(()=>{
            return {
                [name]: value
            }
        });
    }

    function onSubmit(event) {
        setPrevRecord(async () => {
            await contract.get_previous_dates(prevId).then(res => res.json());
        });
        event.preventDefault();
    }

    function onSubmitRecords(){
        setRecords(async () => {
            await contract.get_insurance(recordId).then(res => res.json());
        });
    }

    return (
        <div>
            <Header></Header>
            <div className="page_title"></div>
            <form className="form_control">
                <h2>Previous dates of medical record updated</h2>
                <Input placeHolder="Enter Patient Id" types="number" change={handleChange}/>
                <Button onSubmit={onSubmit}></Button>
            </form>
            <br/>
            <div className="form_control">
                <h2>Result</h2>
                <Result innerText="Dates:"/>
            </div>
            <br/>
            <form className="form_control">
                <h2>Patient Medical Record Details</h2>
                <Input placeHolder="Enter Record Id:" types="number" change={handleRecordChange}/>
                <Button onSubmit={onSubmitRecords}></Button>
            </form>
            <br/>
            <div className="form_control">
                <h2>Insurance Details</h2>
                { insuranceDetails.map(element => <Result key={element.key} innerText={element.innerText}/>) }
                <br/>
                <h2>Present Illness Details</h2>
                { presentIllnessDetails.map(element => <Result key={element.key} innerText={element.innerText}/>) }
                <br/>
                <h2>Past Illness Details</h2>
                { pastIllnessDetails.map(element => <Result key={element.key} innerText={element.innerText}/>) }
                <br/>
                <h2>Provisional Diagnosis Details</h2>
                { provisionalDiagnosisDetails.map(element => <Result key={element.key} innerText={element.innerText}/>) }
                <br/>
                <h2>Treatment Summary</h2>
                { treatmentSummary.map(element => <Result key={element.key} innerText={element.innerText}/>) }
                <br/>
            </div>
        </div>
    )
}