import Input from "../components/input";
import Button from "../components/Button";
import Header from "../components/Navbar";
import { addInsuranceDetails, addPastIllnessDetails, addPresentIllnessDetails, addProvisionalDiagnosisDetails, addTreatmentSummary } from "../json/medicalRecords";

export default function AddRecords() {
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
                { addInsuranceDetails.map(element => <Input key={element.key} placeHolder={element.placeHolder} types={element.types}/> ) }
                <br/> 
                <h2>Present Illness Details</h2>
                { addPresentIllnessDetails.map(element => <Input key={element.key} placeHolder={element.placeHolder} types={element.types}/> ) }
                <br/>
                <h2>Past Illness Details</h2>
                { addPastIllnessDetails.map(element => <Input key={element.key} placeHolder={element.placeHolder} types={element.types}/> ) }
                <br/>
                <h2>Provisional Diagnosis Details</h2>
                { addProvisionalDiagnosisDetails.map(element => <Input key={element.key} placeHolder={element.placeHolder} types={element.types}/> ) }
                <br/>
                <h2>Treatment Summary</h2>
                { addTreatmentSummary.map(element => <Input key={element.key} placeHolder={element.placeHolder} types={element.types}/> ) }
                <Button></Button>
            </form>
        </div>
    )
}