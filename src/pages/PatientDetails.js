import Input from "../components/input";
import Button from "../components/Button";
import Result from "../components/Result";
import Header from "../components/Navbar";
import { patientDetails, attendentDetails } from "../json/patientRegistration";
import { useState } from "react";
import getContract from "../utils/combine";
import { contractAddress } from "../contractAddress.js";

let contract;

export default function PatientDetails() {
    const [ id, setId ] = useState("");
    const [ patientResult, setPatientResult ] = useState();
    const [ attendantResult, setAttendantResult ] = useState();

    function handleChange(event){ 
        const value = event.target.value;
        setId(()=>{
            return {
                [id]: value
            }
        });
    }

    function hanldeSubmit(event){
        contract = getContract(contractAddress);
        setPatientResult(async ()=> {
            await contract.retreive_patient_details(id).then(res => res.json());
        });
        setAttendantResult(async () => {
            await contract.retreive_attendant_details(id).then(res => res.json());
        })
        event.preventDefault();
    }
    return (
        <div>
            <Header></Header>
            <div className="page_title">Display Patient Details</div>
            <form className="form_control">
                <Input placeHolder="Enter Patient Id" types="number" name="id" value={id} change={handleChange}/>
                <Button onSubmit={hanldeSubmit}></Button>
            </form>
            <br/>
            <div className="form_control">
                <h2>Patient Details</h2>
                { patientDetails.map(element => <Result key={element.key} innerText={element.innerText}/>) }
                <h2>Attendant Details</h2>
                { attendentDetails.map(element => <Result key={element.key} innerText={element.innerText}/>) }
            </div>
        </div>
    )
}