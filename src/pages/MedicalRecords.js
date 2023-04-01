import Input from "../components/input";
import Button from "../components/Button";
import Header from "../components/Navbar";
import Result from "../components/Result";
import { insuranceDetails, presentIllnessDetails, pastIllnessDetails, provisionalDiagnosisDetails, treatmentSummary } from "../json/medicalRecords";
import Web3 from "web3";
import abi from "../contracts/Abi/records.json";

const contractAddress = '0x0Fd1688a1c54aF5452F448214dB7F1757B7b1FB2';
const recordsAbi = abi;

export default function MedicalRecords() {
    return (
        <div>
            <Header></Header>
            <div className="page_title"></div>
            <form className="form_control">
                <h2>Previous dates of medical record updated</h2>
                <Input placeHolder="Enter Patient Id" types="number"/>
                <Button></Button>
            </form>
            <br/>
            <div className="form_control">
                <h2>Result</h2>
                <Result innerText="Dates:"/>
            </div>
            <br/>
            <form className="form_control">
                <h2>Patient Medical Record Details</h2>
                <Input placeHolder="Enter Record Id:"/>
                <Button></Button>
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