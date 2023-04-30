import Result from "../components/Result";
import Input from "../components/input";
import Button from "../components/Button";
import Header from "../components/Navbar";
import { investigationsDetails, systemicExaminationDetails, generalExaminationDetails } from "../json/examineDetails";
import { useState } from "react";
import getContract from "../utils/combine";
import { contractAddress } from "../contractAddress.js";
import { BigNumber } from "ethers";

let contract;

export default function ViewExamineDetails() {
    let responseOne = [];
    let responseTwo = [];
    let responseThree = [];
    let responseFour = [];
    const [ patientId, setPatientId ] = useState();
    const [ recordId, setRecordId ] = useState();
    const [ date, setDate ] = useState([]);
    const [ investigation, setInvestigation ] = useState([]);
    const [ general, setGeneral ] = useState([]);
    const [ system, setSystem ] = useState([]);

    function handleChangePatient(event){ 
        const value = event.target.value;
        setPatientId(value);
    }
    
    function handleChangeRecord(event){ 
        const value = event.target.value;
        setRecordId(value);
    }

    function handleSubmitPatient(event){
        contract = getContract(contractAddress);
        contract.get_previous_dates(patientId).then(res => {
            for(const ele of res) {
                if(typeof ele === 'object') responseOne.push(BigNumber.from(ele["_hex"]).toString());
                else responseOne.push(ele);
            }
        });
        setDate(responseOne);
        event.preventDefault();
    }

    function handleSubmitRecord(event){
        contract = getContract(contractAddress);
        contract.get_investigations(recordId).then(res => {
            for(const ele of res) {
                if(typeof ele === 'object') responseTwo.push(BigNumber.from(ele["_hex"]).toString());
                else responseTwo.push(ele);
            }
        });
        contract.get_general_examin(recordId).then(res => {
            for(const ele of res) {
                if(typeof ele === 'object') responseThree.push(BigNumber.from(ele["_hex"]).toString());
                else responseThree.push(ele);
            }
        });
        contract.get_sys_examin(recordId).then(res => {
            for(const ele of res) {
                if(typeof ele === 'object') responseFour.push(BigNumber.from(ele["_hex"]).toString());
                else responseFour.push(ele);
            }
        });
        setInvestigation(responseTwo);
        setGeneral(responseThree);
        setSystem(responseFour);
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
                <h2>Dates: </h2>
                <Result key="1" innerText="Dates: " result={date[0]} />
                <h2>Investigations</h2>
                { investigationsDetails.map((element, i) => <div><Result key={element.key} innerText={element.innerText}/><p>{investigation[i]}</p></div>) }
                <br/>
                <h2>General Examination</h2>
                { generalExaminationDetails.map((element, i) => <div><Result key={element.key} innerText={element.innerText}/><p>{general[i]}</p></div>) }
                <br/>
                <h2>Systemic Examination</h2>
                { systemicExaminationDetails.map((element, i) => <div><Result key={element.key} innerText={element.innerText}/><p>{system[i]}</p></div>) }
            </div>
        </div>
    )
}