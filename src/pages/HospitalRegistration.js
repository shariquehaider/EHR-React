import Header from "../components/Navbar";
import Input from "../components/input";
import Button from "../components/Button";
import { hospitalRegistration } from "../json/hosipitalRegistration";
import { useState } from "react";
import abi from "../contracts/Abi/combinedAbi.json";
import Web3 from "web3";

const contractAddress = '0x41F8C6987f386d162E0995e17973dd3Ac67a5790';
const hospitalAbi = abi;

export default function HospitalRegistration() {
    const [ hospital, setHospital ] = useState({
        id: "",
        blockAddress: "",
        name: "",
        specification: "",
        address: ""
    });

    const [currentAccount, setCurrentAccount] = useState();

    const checkWalletIsConnected = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make Sure You have Meta Mask");
            return;
        } else {
            console.log("Wallet Exist! We are ready to go.")
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
    };

    window.onload = checkWalletIsConnected();

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
        const myContract = new Web3.eth.Contract(hospitalAbi, contractAddress, { from: currentAccount, gasPrice: '5000000', gas: '500000' });
        const result = myContract.methods.store_hospital_details(...hospital).send((err, result) => {
            if (err) { console.log(err); }
        });
        console.log(result);
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