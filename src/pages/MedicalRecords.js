import Input from "../components/input";
import Button from "../components/Button";
import Header from "../components/Navbar";
import Result from "../components/Result";
import { insuranceDetails, presentIllnessDetails, pastIllnessDetails, provisionalDiagnosisDetails, treatmentSummary } from "../json/medicalRecords";
import { useState } from "react";
import getContract from "../utils/combine";
import { contractAddress } from "../contractAddress.js";

let contract;

export default function MedicalRecords() {

    const [ prevId, setPrevId ] = useState();
    const [ prevRecord, setPrevRecord ] = useState([]);
    const [ recordId, setRecordId ] = useState();
    const [ records, setRecords ] = useState([]);

    let responseOne = [];
    let responseTwo = [];

    function handleChange(event){
        setPrevId(event.target.value);
    }

    function handleRecordChange(event){
        setRecordId(event.target.value);
    }

    function onSubmit(event) {
        contract = getContract(contractAddress);
        contract.get_previous_dates(prevId).then(res => {
            for(let i = 0; i<res.length; i++) {
                if (i !== 2) responseOne.push(res[i]);
            }
        });
        setPrevRecord(responseOne);
        event.preventDefault();
    }

    function onSubmitRecords(event){
        contract = getContract(contractAddress);
        contract.get_insurance(recordId).then(res => {
            for(let i = 0; i<res.length; i++) {
                if (i !== 2) responseTwo.push(res[i]);
            }
        });
        setRecords(responseTwo);
        event.preventDefault();
    }

    return (
        <div>
            <Header></Header>
            <div className="page_title"></div>
            <form className="form_control">
                <h2>Previous dates of medical record updated</h2>
                <Input placeHolder="Enter Patient Id" types="number" value={prevId} change={handleChange}/>
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
                <Input placeHolder="Enter Record Id:" types="number" value={recordId} change={handleRecordChange}/>
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