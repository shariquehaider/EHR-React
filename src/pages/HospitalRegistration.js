import Header from "../components/Navbar";
import Input from "../components/input";
import Button from "../components/Button";
import { hospitalRegistration } from "../json/hosipitalRegistration";
import { useState } from "react";
import getContract from "../utils/combine";
import { contractAddress } from "../contractAddress.js";

let contract;

export default function HospitalRegistration() {
    const [ hospital, setHospital ] = useState({
        id: "",
        blockAddress: "",
        name: "",
        specification: "",
        address: ""
    });

    function handleChange(event){
        const { name, value } = event.target;
        setHospital(preValue => {
            return {
                ...preValue,
                [name]: value
            }
        });
    } 

    function handleSubmit(event){
        contract = getContract(contractAddress);
        contract.store_hospital_details(hospital.id, hospital.blockAddress, hospital.name, hospital.specification, hospital.address);
        event.preventDefault();
    };

    return (
        <div>
            <Header></Header>
            <div className="page_title">Hospital Registration</div>
            <from className="form_control">
            { hospitalRegistration.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} name={element.name} value={hospital[i]} change={handleChange}/>) }
            <Button onSubmit={handleSubmit}></Button>
            </from>
        </div>
    ) 
}