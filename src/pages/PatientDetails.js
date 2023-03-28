import Input from "../components/input";
import Button from "../components/Button";
import Result from "../components/Result";
import Header from "../components/Navbar";
import { patientDetails, attendentDetails } from "../json/patientRegistration";


export default function PatientDetails() {
    return (
        <div>
            <Header></Header>
            <div className="page_title">Display Patient Details</div>
            <form className="form_control">
                <Input placeHolder="Enter Patient Id" types="number"/>
                <Button></Button>
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