import Header from "../components/Navbar";
import Input from "../components/input";
import Button from "../components/Button";
import { doctorDetails } from "../json/doctorRegistration";
import Result from "../components/Result";
import "../CSS/Home.css";
import "../CSS/Navbar.css";


export default function DoctorDetails(){    

    return (
        <div>
            <Header></Header>
            <div className="page_title">Doctor Details</div>
            <form className="form_control">
                <Input placeHolder="Enter Hospital Id" types="number" />
                <Button></Button>
            </form>
            <br/>
            <div className="form_control">
                <h2>Result</h2>
                { doctorDetails.map(element => <Result innerText={element.innerText}/>)}
            </div>
        </div>
    )
}