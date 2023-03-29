import Header from "../components/Navbar";
import Input from "../components/input";
import Button from "../components/Button";
import { patientRegistration, attendentRegistration } from "../json/patientRegistration";
import { useState } from "react";


export default function PatientRegistration () {
    const [ patient, setPatient ] = useState({
        id: "",
        blockAddress: "",
        name: "",
        age: "",
        gender: "",
        height: "",
        weight: "",
        address: "",
        phoneNumber: "",
        email: "",
        date: "",
    });

    const [ attendant, setAttendent ] = useState({
        id: "",
        name: "",
        relation: "",
        number: ""
    });

    function handleChangePatient(event){
        const { name, value } = event.target;
        setPatient(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleChangeAttendent(event){
        const { name, value } = event.target;
        setAttendent(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleSubmit(event){
        console.log(patient);
        console.log(attendant);
        event.preventDefault();
    }


    return (
        <div>
            <Header></Header>
            <div className="page_title">Pateint Registration</div>
            <form className="form_control">
            <h2>Register Patient</h2>
            { patientRegistration.map((element,i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={patient[i]} name={element.name} change={handleChangePatient}/>) }
            <br/>
            <h2>Patient's Attendant Details</h2>
            { attendentRegistration.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={attendant[i]} name={element.name} change={handleChangeAttendent}/>) }
            <Button onSubmit={handleSubmit}></Button>
            </form>
        </div>
    )
}