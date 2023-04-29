import Header from "../components/Navbar";
import Input from "../components/input";
import Button from "../components/Button";
import { hospitalRegistration } from "../json/hosipitalRegistration";
import { useEffect, useState } from "react";
import getCombinedContract from "../utils/combine";
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

    useEffect(()=>{
        contract = getCombinedContract(contractAddress);
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

    async function handleSubmit(event){
        await contract.store_hospital_details(...hospital);
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