import Header from "../components/Navbar";
import Input from "../components/input";
import Button from "../components/Button";
import { doctorDetails } from "../json/doctorRegistration";
import Result from "../components/Result";
import "../CSS/Home.css";
import "../CSS/Navbar.css";
import { useEffect, useState } from "react";
import getCombinedContract from "../utils/combine";
import { contractAddress } from "../contractAddress.js";

let contract;

export default function DoctorDetails(){    
    const [ result, setResult ] = useState([]);
    let id = "";

    useEffect(() => {
        contract = getCombinedContract(contractAddress);
        console.log(contract);
    });

    function handleChange(event){ 
        const { name, value } = event.target;
        id = value;
    }

    async function handleSubmit(event){
        console.log(id)
        // setResult(async ()=>{
        result = await contract.retreive_doctor_details(id);
        // });
        contract.on("acountCreatedEvent", async (event) => {
            console.log("Retreive Data", event);
        })
        console.log(result);
        event.preventDefault();
    }

    return (
        <div>
            <Header></Header>
            <div className="page_title">Doctor Details</div>
            <form className="form_control">
                <Input key="1" placeHolder="Enter Hospital Id" types="number" name="id" change={handleChange}/>
                <Button onSubmit={handleSubmit}></Button>
            </form>
            <br/>
            <div className="form_control">
                <h2>Result</h2>
                { doctorDetails.map((element, i) => <Result key={element.key} innerText={element.innerText} result={result}/>)}
            </div>
        </div>
    )
}