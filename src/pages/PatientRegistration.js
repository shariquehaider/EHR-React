import Header from "../components/Navbar";
import Input from "../components/input";
import Button from "../components/Button";
import { patientRegistration } from "../json/patientRegistration";


export default function PatientRegistration () {
    return (
        <div>
            <Header></Header>
            <div className="page_title">Pateint Registration</div>
            <form className="form_control">
            { patientRegistration.map(element => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} />) }
            <Button></Button>
            </form>
        </div>
    )
}