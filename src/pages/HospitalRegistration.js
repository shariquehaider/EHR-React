import Header from "../components/Navbar";
import Input from "../components/input";
import Button from "../components/Button";
import { hospitalRegistration } from "../json/hosipitalRegistration";



export default function HospitalRegistration() {
    return (
        <div>
            <Header></Header>
            <div className="page_title">Hospital Registration</div>
            <from className="form_control">
            { hospitalRegistration.map(element => <Input key={element.key} placeHolder={element.placeHolder} types={element.types}/>) }
            <Button></Button>
            </from>
        </div>
    ) 
}