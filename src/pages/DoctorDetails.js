import Header from "../components/Navbar";
import Input from "../components/input";
import Button from "../components/Button";
import { doctorDetails } from "../json/doctorRegistration";
import Result from "../components/Result";
import "../CSS/Home.css";
import "../CSS/Navbar.css";
import { useEffect, useState } from "react";
import getCombinedContract from "../utils/combine";

const contractAddress = '0x41F8C6987f386d162E0995e17973dd3Ac67a5790';
let contract;

export default function DoctorDetails(){    
    const [ id, setId ] = useState();
    const [ result, setResult ] = useState();

    useEffect(() => {
        contract = getCombinedContract(contractAddress);
    });

    function handleChange(event){ 
        const { name, value } = event.target;
        setId(()=>{
            return {
                [name]: value
            }
        });
    }

    function handleSubmit(event){
        setResult(async ()=>{
            await contract.retreive_doctor_details(id).then(res => res.json);
        });
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
                <Input placeHolder="Enter Hospital Id" types="number" name="id" change={handleChange}/>
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