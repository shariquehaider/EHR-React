import Header from "../components/Navbar";
import Input from "../components/input";
import Button from "../components/Button";
import { patientRegistration, attendentRegistration } from "../json/patientRegistration";
import { useEffect, useState } from "react";
import Web3 from "web3";
import getBodyExamineContract from "../utils/bodyexamine";

const contractaddress = '0x41F8C6987f386d162E0995e17973dd3Ac67a5790';
let contract;

export default function PatientRegistration() {
    const [patient, setPatient] = useState({
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

    const [attendant, setAttendent] = useState({
        id: "",
        name: "",
        relation: "",
        number: ""
    });

    useEffect(()=> {
        contract = getBodyExamineContract(contractaddress);
    });

    function handleChangePatient(event) {
        const { name, value } = event.target;
        setPatient(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleChangeAttendent(event) {
        const { name, value } = event.target;
        setAttendent(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    async function handleSubmit(event) {
        await contract.store_attendant_details(...attendant);
        event.preventDefault();
    }


    return (
        <div>
            <Header></Header>
            <div className="page_title">Pateint Registration</div>
            <form className="form_control">
                <h2>Register Patient</h2>
                {patientRegistration.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={patient[i]} name={element.name} change={handleChangePatient} />)}
                <br />
                <h2>Patient's Attendant Details</h2>
                {attendentRegistration.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={attendant[i]} name={element.name} change={handleChangeAttendent} />)}
                <Button onSubmit={handleSubmit}></Button>
            </form>
        </div>
    )
}