import Input from "../components/input";
import Button from "../components/Button";
import Result from "../components/Result";
import Header from "../components/Navbar";
import { hospitalDetails } from "../json/hosipitalRegistration";
import { useEffect, useState } from "react";
import getCombinedContract from "../utils/combine";
import { contractAddress } from "../contractAddress.js";

let contract;

export default function HospitalDetails(){
    const [ id, setId ] = useState("");
    const [ result,  setResult ] = useState();

    useEffect(() => {
        contract = getCombinedContract(contractAddress);
    });

    function handleChange(event){ 
        const value = event.target.value;
        setId(()=>{
            return {
                [id]: value
            }
        });
    }

    function hanldeSubmit(event){
        setResult(async ()=> {
            await contract.retreive_hospital_details(id).then(res => res.json);
        });
        console.log(result);
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
                { hospitalDetails.map(element => <Result key={element.key} innerText={element.innerText}/>) }
            </div>
        </div>
    )
}