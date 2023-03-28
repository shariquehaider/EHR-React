import Input from "../components/input";
import Button from "../components/Button";
import Result from "../components/Result";
import Header from "../components/Navbar";
import { hospitalDetails } from "../json/hosipitalRegistration";


export default function HospitalDetails(){
    return(
        <div>
            <Header></Header>
            <div className="page_title">Display Hospital Details</div>
            <form className="form_control">
                <h2>Hospital Details:</h2>
                <Input placeHolder="Enter Hospital Id" types="number"/>
                <Button></Button>
            </form>
            <br/>
            <div className="form_control">
                <h2>Result</h2>
                { hospitalDetails.map(element => <Result key={element.key} innerText={element.innerText}/>) }
            </div>
        </div>
    )
}