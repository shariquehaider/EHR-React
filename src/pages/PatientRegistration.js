import Header from "../components/Navbar";
import Input from "../components/input";
import Button from "../components/Button";
import { patientRegistration, attendentRegistration } from "../json/patientRegistration";
import { useState } from "react";
import abi from "../contracts/Abi/combinedAbi.json";
import Web3 from "web3";

const contractaddress = '0x41F8C6987f386d162E0995e17973dd3Ac67a5790';
const patientAbi = abi;

export default function PatientRegistration() {
    const [patient, setPatient] = useState({
        id: "",
        blockAddress: "",
        name: "",
        age: "",
        gender: "",
        height: "",
        weight: "",
        address: "",
        phoneNumber: "",
        email: "",
        date: "",
    });

    const [attendant, setAttendent] = useState({
        id: "",
        name: "",
        relation: "",
        number: ""
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

    function handleChangePatient(event) {
        const { name, value } = event.target;
        setPatient(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleChangeAttendent(event) {
        const { name, value } = event.target;
        setAttendent(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleSubmit(event) {
        const myContract = new Web3.eth.Contract(patientAbi, contractaddress, { from: currentAccount, gasPrice: '5000000', gas: '5000000' });
        const resultPatient = myContract.methods.store_patient_details(...patient).send((err, result) => {
            if (err) { console.log(err); }
        });
        const resultAttendent = myContract.methods.store_attendant_details(...attendant).send((err, result) => {
            if (err) { console.log(err); }
        });
        console.log(resultPatient);
        console.log(resultAttendent);
        event.preventDefault();
    }


    return (
        <div>
            <Header></Header>
            <div className="page_title">Pateint Registration</div>
            <form className="form_control">
                <h2>Register Patient</h2>
                {patientRegistration.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={patient[i]} name={element.name} change={handleChangePatient} />)}
                <br />
                <h2>Patient's Attendant Details</h2>
                {attendentRegistration.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={attendant[i]} name={element.name} change={handleChangeAttendent} />)}
                <Button onSubmit={handleSubmit}></Button>
            </form>
        </div>
    )
}