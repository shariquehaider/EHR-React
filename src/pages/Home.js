import Header from "../components/Navbar";
import Input from "../components/input";
import Button from "../components/Button";
import { doctorInput } from "../json/doctorRegistration";
import "../CSS/Home.css";
import { useState } from "react";
import abi from "../contracts/Abi/combinedAbi.json";
import Web3 from "web3";


const contractaddress = '0x41F8C6987f386d162E0995e17973dd3Ac67a5790';
const doctorAbi = abi;

export default function Home() {

    const [doctor, setDoctor] = useState({
        id: "",
        blockAddress: "",
        name: "",
        specification: "",
        address: "",
        phone: ""
    });

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
    function handleChange(event) {
        const { name, value } = event.target;
        setDoctor(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleClick(event) {
        const myContract = new Web3.eth.Contract(doctorAbi, contractaddress, { from: currentAccount, gasPrice: '5000000', gas: '500000' });
        const output = myContract.methods.store_doctor_details(...doctor).send(function (err, result) {
            if (err) { console.log(err); }
        });
        console.log(output);
        event.preventDefault();
    };

    return (
        <div>
            <Header></Header>
            <div className="page_title">Doctor Registration</div>
            <form className="form_control">
                {doctorInput.map((element, i) => <Input key={element.key} placeHolder={element.placeholder} types={element.types} name={element.name} value={doctor[i]} change={handleChange} />)}
                <Button onSubmit={handleClick}></Button>
            </form>
        </div>
    )
}