import Input from "../components/input";
import Button from "../components/Button";
import Result from "../components/Result";
import Header from "../components/Navbar";
import { patientDetails, attendentDetails } from "../json/patientRegistration";
import { useState } from "react";
import getContract from "../utils/combine";
import { contractAddress } from "../contractAddress.js";
import { BigNumber } from "ethers";

let contract;

export default function PatientDetails() {
    const [ id, setId ] = useState("");
    let responseOne = [];
    let responseTwo = []
    const [ patientResult, setPatientResult ] = useState([]);
    const [ attendantResult, setAttendantResult ] = useState([]);

    function handleChange(event){ 
        setId(event.target.value);
    }

    function hanldeSubmit(event){
        contract = getContract(contractAddress)
        contract.retreive_patient_details(id).then(res => {
            for(const ele of res){
                if(typeof ele === 'object')  responseOne.push(BigNumber.from(ele["_hex"]).toString());
                else responseOne.push(ele)
            }
        });
        contract.retreive_attendant_details(id).then(res => {
            for(let ele of res) {
                if(typeof ele === 'object') responseTwo.push(BigNumber.from(ele["_hex"]).toString());
                else responseTwo.push(ele);
            }
        });
        setPatientResult(responseOne);
        setAttendantResult(responseTwo);
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
                { patientDetails.map((element, i) => <div><Result key={element.key} innerText={element.innerText}/><p>{patientDetails[i]}</p></div>) }
                <h2>Attendant Details</h2>
                { attendentDetails.map((element, i) => <div><Result key={element.key} innerText={element.innerText}/><p>{attendantResult[i]}</p></div>) }
            </div>
        </div>
    )
}