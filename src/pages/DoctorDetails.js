import Header from "../components/Navbar";
import Input from "../components/input";
import Button from "../components/Button";
import { doctorDetails } from "../json/doctorRegistration";
import Result from "../components/Result";
import "../CSS/Home.css";
import "../CSS/Navbar.css";
import { useState } from "react";
import Web3 from "web3";
import abi from "../contracts/Abi/combinedAbi.json";

const contractAddress = '0x41F8C6987f386d162E0995e17973dd3Ac67a5790';
const doctorAbi = abi;

export default function DoctorDetails(){    
    const [ id, setId ] = useState("");
    const [ result, setResult ] = useState();
    const [currentAccount, setCurrentAccount] = useState();

    const checkWalletIsConnected = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make Sure You have Meta Mask");
            return;
        } else {
            console.log("Wallet Exist! We are ready to go.");
            window.web3 = new Web3(ethereum);
            ethereum.autoRefreshOnNetworkChange = false;
        }
        const accounts = await ethereum.enable();
        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log(`Found an authorized account: ${account}`);
            setCurrentAccount(account);
        } else {
            console.log("No authorized account found")
        }
    }

    window.onload = checkWalletIsConnected();

    function handleChange(event){ 
        const value = event.target.value;
        setId(()=>{
            return {
                [id]: value
            }
        });
    }

    function hanldeSubmit(event){
        const myContract = new Web3.eth.Contract(doctorAbi, contractAddress, { from: currentAccount, gasPrice: '5000000', gas: '500000' });
        const result = myContract.methods.retreive_doctor_details(id).call((err, result) => {
            if (err) { console.log(err); }
            if (result) {
                setResult(()=>{
                    return result
                });
            }
        });
        event.preventDefault();
    }

    return (
        <div>
            <Header></Header>
            <div className="page_title">Doctor Details</div>
            <form className="form_control">
                <Input placeHolder="Enter Hospital Id" types="number" name="id" value={id} change={handleChange}/>
                <Button onSubmit={hanldeSubmit}></Button>
            </form>
            <br/>
            <div className="form_control">
                <h2>Result</h2>
                { doctorDetails.map(element => <Result key={element.key} innerText={element.innerText}/>)}
            </div>
        </div>
    )
}