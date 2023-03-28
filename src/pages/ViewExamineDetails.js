import Result from "../components/Result";
import Input from "../components/input";
import Button from "../components/Button";
import Header from "../components/Navbar";
import { investigationsDetails, systemicExaminationDetails, generalExaminationDetails } from "../json/examineDetails";

export default function ViewExamineDetails() {
    return(
        <div>
            <Header></Header>
            <div className="page_title">View Patient Body Examine Details</div>
            <form className="form_control">
                <h2>Previous dates of medical record updated</h2>
                <Input placeHolder="Enter Patient Id" types="number"/>
                <Button></Button>
            </form>
            <br/>
            <form className="form_control">
                <h2>Patient Body Examine Details</h2>
                <Input placeHolder="Enter Record Id" types="number"/>
                <Button></Button>
            </form>
            <br/>
            <div className="form_control">
                <h2>Investigations</h2>
                { investigationsDetails.map(element => <Result key={element.key} innerText={element.innerText}/>) }
                <br/>
                <h2>General Examination</h2>
                { generalExaminationDetails.map(element => <Result key={element.key} innerText={element.innerText}/>) }
                <br/>
                <h2>Systemic Examination</h2>
                { systemicExaminationDetails.map(element => <Result key={element.key} innerText={element.innerText}/>) }
            </div>
        </div>
    )
}