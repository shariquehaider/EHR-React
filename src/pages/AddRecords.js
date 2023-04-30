import Input from "../components/input";
import Button from "../components/Button";
import Header from "../components/Navbar";
import { addInsuranceDetails, addPastIllnessDetails, addPresentIllnessDetails, addProvisionalDiagnosisDetails, addTreatmentSummary } from "../json/medicalRecords";
import { useEffect, useState } from "react";
import getContract from "../utils/combine";
import { contractAddress } from "../contractAddress.js";
import { type } from "@testing-library/user-event/dist/type";

let contract;

export default function AddRecords() {

    const [ insurance, setInsurance ] = useState({
        id: "",
        applicable: "",
        policy: "",
        insurer: "",
        type: "",
        limit: ""
    });

    const [ presentIllness, setPresentIllness ] = useState({
        id: "",
        complaints: "",
        duration: ""
    });

    const [ pastIllness, setPastIllness ] = useState({
        id: "",
        familyHistory: "",
        personalHistory: "",
        drugHistory: ""
    });

    const [ provisionalDiagnosis, setProvisionalDiagnosis ] = useState({
        id: "",
        summary: "",
        presciption: ""
    });

    const [ treatment, setTreatment ] = useState({
        id: "",
        treatment: "",
        treatmentDate: "",
        doctorId: "",
        hospitalId: "",
        discharge: "",
        follow: ""
    });

    function handleChangeInsurance(event){
        const { name, value } = event.target;
        setInsurance(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleChangePresentIllness(event) { 
        const { name, value } = event.target;
        setPresentIllness(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleChangePastIllness(event) { 
        const { name, value } = event.target;
        setPastIllness(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleChangeProvisional(event) {
        const { name, value } = event.target;
        setProvisionalDiagnosis(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleChangeTreatment(event) { 
        const { name, value } = event.target;
        setTreatment(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handlePostSubmit(event){
        contract = getContract(contractAddress);
        contract.insurance_details(insurance.id, insurance.applicable, insurance.policy, insurance.insurer, insurance.type, insurance.limit);
        contract.present_illness(presentIllness.id, presentIllness.complaints, presentIllness.duration);
        contract.past_illness(pastIllness.id, pastIllness.familyHistory, pastIllness.personalHistory, pastIllness.drugHistory);
        contract.func_diagnosis(provisionalDiagnosis.id, provisionalDiagnosis.summary, provisionalDiagnosis.presciption);
        contract.treatment_summary(treatment.id, treatment.treatment, treatment.treatmentDate, treatment.doctorId, treatment.hospitalId, treatment.discharge, treatment.follow);
        event.preventDefault();
    }

    return (
        <div>
            <Header></Header>
            <div className="page_title">Patient Medical Record</div>
            <form className="form_control">
                <h2>Previous dates of medical record updated</h2>
                <Input placeHolder="Enter Patient Id" types="number"/>
                <Button></Button>
            </form>
            <br/>
            <form className="form_control">
                <h2>Insurance Details</h2>
                { addInsuranceDetails.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={insurance[i]} name={element.name} change={handleChangeInsurance}/> ) }
                <br/> 
                <h2>Present Illness Details</h2>
                { addPresentIllnessDetails.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={presentIllness[i]} name={element.name} change={handleChangePresentIllness}/> ) }
                <br/>
                <h2>Past Illness Details</h2>
                { addPastIllnessDetails.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={pastIllness[i]} name={element.name} change={handleChangePastIllness}/> ) }
                <br/>
                <h2>Provisional Diagnosis Details</h2>
                { addProvisionalDiagnosisDetails.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={provisionalDiagnosis[i]} name={element.name} change={handleChangeProvisional}/> ) }
                <br/>
                <h2>Treatment Summary</h2>
                { addTreatmentSummary.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={treatment[i]} name={element.name} change={handleChangeTreatment}/> ) }
                <Button onSubmit={handlePostSubmit}></Button>
            </form>
        </div>
    )
}