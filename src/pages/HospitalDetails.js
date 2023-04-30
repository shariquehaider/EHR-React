import Input from "../components/input";
import Button from "../components/Button";
import Result from "../components/Result";
import Header from "../components/Navbar";
import { hospitalDetails } from "../json/hosipitalRegistration";
import { useState } from "react";
import getContract from "../utils/combine";
import { contractAddress } from "../contractAddress.js";

let contract;

export default function HospitalDetails(){
    const [ id, setId ] = useState("");
    const [ result,  setResult ] = useState([]);
    let response = [];

    function handleChange(event){ 
        setId(event.target.value)
    }

    function hanldeSubmit(event){
        contract = getContract(contractAddress);
        contract.retreive_hospital_details(id).then(res => {
            console.log(res);
            for(let i = 0; i<res.length; i++) {
                response.push(res[i]);
            }
        });
        setResult(response);
        event.preventDefault();
    }
    
    return(
        <div>
            <Header></Header>
            <div className="page_title">Display Hospital Details</div>
            <form className="form_control">
                <h2>Hospital Details:</h2>
                <Input placeHolder="Enter Hospital Id" types="number" name="id" value={id} change={handleChange}/>
                <Button onSubmit={hanldeSubmit}></Button>
            </form>
            <br/>
            <div className="form_control">
                <h2>Result</h2>
                { hospitalDetails.map((element, i) => <div><Result key={element.key} innerText={element.innerText} /><p>{result[i]}</p></div>) }
            </div>
        </div>
    )
}