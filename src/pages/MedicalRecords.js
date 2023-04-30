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
    const [ presentIllness, setPresentIllness ] = useState([]);
    const [ pastIllness, setPastIllness ] = useState([]);
    const [ diagnosis, setDiagnosis ] = useState([]);
    const [ treatment, setTreatment ] = useState([]);

    let responseOne = [];
    let responseTwo = [];
    let responseThree = [];
    let responseFour = [];
    let responseFive = [];
    let responseSix = [];

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
        contract.get_present_illness(recordId).then(res => {
            for(let i = 0; i<res.length; i++) {
                if (i !== 2) responseThree.push(res[i]);
            }
        });
        contract.get_past_illness(recordId).then(res => {
            for(let i = 0; i<res.length; i++) {
                if (i !== 2) responseFour.push(res[i]);
            }
        });
        contract.get_func_diagnosis(recordId).then(res => {
            for(let i = 0; i<res.length; i++) {
                if (i !== 2) responseFive.push(res[i]);
            }
        });
        contract.get_treatment_summary(recordId).then(res => {
            for(let i = 0; i<res.length; i++) {
                if (i !== 2) responseSix.push(res[i]);
            }
        });
        setRecords(responseTwo);
        setPresentIllness(responseThree);
        setPastIllness(responseFour);
        setDiagnosis(responseFive);
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
                <Result innerText="Dates:"/><p>{prevRecord[0]}</p>
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
                { insuranceDetails.map((element, i) => <div><Result key={element.key} innerText={element.innerText}/><p>{records[i]}</p></div>) }
                <br/>
                <h2>Present Illness Details</h2>
                { presentIllnessDetails.map((element, i) => <div><Result key={element.key} innerText={element.innerText}/><p>{presentIllness[i]}</p></div>) }
                <br/>
                <h2>Past Illness Details</h2>
                { pastIllnessDetails.map((element, i) => <div><Result key={element.key} innerText={element.innerText}/><p>{pastIllness[i]}</p></div>) }
                <br/>
                <h2>Provisional Diagnosis Details</h2>
                { provisionalDiagnosisDetails.map((element, i) => <div><Result key={element.key} innerText={element.innerText}/><p>{diagnosis[i]}</p></div>) }
                <br/>
                <h2>Treatment Summary</h2>
                { treatmentSummary.map((element, i) => <div><Result key={element.key} innerText={element.innerText}/><p>{treatment[i]}</p></div>) }
                <br/>
            </div>
        </div>
    )
}