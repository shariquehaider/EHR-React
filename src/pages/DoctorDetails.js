import Header from "../components/Navbar";
import Input from "../components/input";
import Button from "../components/Button";
import { doctorInput } from "../json/doctorRegistration";
import "../CSS/Home.css";
import "../CSS/Navbar.css";


export default function DoctorDetails(){    

    return (
        <div>
            <Header></Header>
            <div className="page_title">Doctor Details</div>
            <form className="form_control">
                <Input placeHolder="Enter Hospital Id" types="number" />)
                <Button></Button>
            </form>
        </div>
    )
}