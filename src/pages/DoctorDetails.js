import Header from "../components/Navbar";
import Input from "../components/input";
import Button from "../components/Button";
import { doctorDetails } from "../json/doctorRegistration";
import Result from "../components/Result";
import "../CSS/Home.css";
import "../CSS/Navbar.css";
import { useState } from "react";
import getContract from "../utils/combine";
import { contractAddress } from "../contractAddress.js";
import { BigNumber } from "ethers";

let contract;

export default function DoctorDetails(){   
    const [ id, setId ] = useState(""); 
    const [result, setResult] = useState([]);
    let response = [];

    function handleChange(event){ 
        setId(event.target.value);
    }
   

    function handleSubmit(event){
        contract = getContract(contractAddress);
        contract.retreive_doctor_details(id).then(res=> {
            for(let i = 0; i<res.length; i++) {
                if (i !== 2) response.push(res[i]);
                else response.push(BigNumber.from(res[i]["_hex"]).toString());
            }
        });
        setResult(response)
        console.log(result);
        event.preventDefault();
    }

    return (
        <div>
            <Header></Header>
            <div className="page_title">Doctor Details</div>
            <form className="form_control">
                <Input key="1" placeHolder="Enter Hospital Id" types="number" value={id} change={handleChange}/>
                <Button onSubmit={handleSubmit}></Button>
            </form>
            <br/>
            <div className="form_control">
                <h2>Result</h2>
                {doctorDetails.map((element, i) => <Result key={element.key} innerText={element.innerText} result={result[i]}/>)}
            </div>
        </div>
    )
}