import Header from "../components/Navbar";
import Input from "../components/input";
import Button from "../components/Button";
import { investigations, generalExamination, systemicExamination, medicalRecord } from "../json/examineDetails";

export default function UpdateExamineDetails() {
    return (
        <div>
            <Header></Header>
            <div className="page_title">Patient Body examine details</div>
            <form className="form_control">
                <h2>Previous dates of medical record updated</h2>
                { medicalRecord.map(element => <Input key={element.key} placeHolder={element.placeHolder} types={element.types}/>) }
                <hr/><br/>
                <h2>Investigations</h2>
                { investigations.map(element => <Input key={element.key} placeHolder={element.placeHolder} types={element.types}/>) }
                <hr/><br/>
                <h2>General Examination</h2>
                { generalExamination.map(element => <Input key={element.key} placeHolder={element.placeHolder} types={element.types}/>) }
                <hr/><br/>
                <h2>Systemic Examination</h2>
                { systemicExamination.map(element => <Input key={element.key} placeHolder={element.placeHolder} types={element.types}/>) }
                <Button></Button>
            </form>
        </div>
    )
}