import Header from "../components/Navbar";
import Input from "../components/input";
import Button from "../components/Button";
import { doctorInput } from "../json/doctorRegistration";
import "../CSS/Home.css";

export default function Home(){
    return (
        <div>
            <Header></Header>
            <div className="page_title">Doctor Registration</div>
            <form className="form_control">
            {doctorInput.map(element => <Input key={element.key} placeHolder={element.placeholder} types={element.types}/>)}
            <Button></Button>
            </form>
        </div>
    )
}