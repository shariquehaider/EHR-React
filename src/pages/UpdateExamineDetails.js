import Header from "../components/Navbar";
import Input from "../components/input";
import Button from "../components/Button";
import { investigations, generalExamination, systemicExamination, medicalRecord } from "../json/examineDetails";
import { useState } from "react";
import Web3 from "web3";
import abi from "../contracts/Abi/examineAbi.json";

const contractAddress = '0xb692fc689FF5A53894847F1D96996B0Fb4149163';
const examineAbi = abi;

export default function UpdateExamineDetails() {
    const [ medicalRecords, setMedicalRecords ] = useState({
        id: "",
        date: ""
    });

    const [ investigation, setInvestigation ] = useState({
        id: "",
        blood: "",
        urine: "",
        ecg: "",
        mri: "",
        ct: "",
        xray: ""
    });

    const [ generalExam, setGeneralExam ] = useState({
        id: "",
        built: "",
        nourishment: "",
        eyes: "",
        tongue: "",
        pulse: "",
        bp: "",
        temp: "",
        respiratory: ""
    });

    const [ systemicExam, setSystemicExam ] = useState({
        id: "",
        cvs: "",
        cns: "",
        rs: "",
        abdomen: ""
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

    function handleChangeMedical(event) { 
        const { name, value } = event.target;
        setMedicalRecords(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleChangeInvestigation(event){
        const { name, value } = event.target;
        setInvestigation(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleChangeGeneralExam(event) {
        const { name, value } = event.target;
        setGeneralExam(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleChangeSystemicExam(event) { 
        const { name, value } = event.target;
        setSystemicExam(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleSubmitMedical(event) {
        const myContract = new Web3.eth.Contract(examineAbi, contractAddress, { from: currentAccount, gasPrice: '5000000', gas: '5000000' });
        const result = myContract.methods.previous_dates(...medicalRecord).send(function (err, result) {
            if (err) { console.log(err); }
        });   
        event.preventDefault();
    }

    function handleSubmitUpdate(event){ 
        const myContract = new Web3.eth.Contract(examineAbi, contractAddress, { from: currentAccount, gasPrice: '5000000', gas: '5000000' });
        const resultInvestigation = myContract.methods.investigations(...investigation).send((err, result) => {
            if (err) console.log(err);
        });
        const resultGeneral = myContract.methods.general_examin(...generalExam).send((err, result) => {
            if (err) console.log(err);
        });
        const resultSystemic = myContract.methods.sys_examin(...systemicExam).send((err, result) => {
            if (err) console.log(err); 
        });
        console.log(resultGeneral);
        console.log(resultInvestigation);
        console.log(resultSystemic);
        event.preventDefault();
    }
    return (
        <div>
            <Header></Header>
            <div className="page_title">Patient Body examine details</div>
            <form className="form_control">
                <h2>Previous dates of medical record updated</h2>
                { medicalRecord.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={medicalRecords[i]} name={element.name} change={handleChangeMedical}/>) }
                <Button onSubmit={handleSubmitMedical}></Button>
                <hr/><br/>
                <h2>Investigations</h2>
                { investigations.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={investigation[i]} name={element.name} change={handleChangeInvestigation}/>) }
                <hr/><br/>
                <h2>General Examination</h2>
                { generalExamination.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={generalExam[i]} name={element.name} change={handleChangeGeneralExam}/>) }
                <hr/><br/>
                <h2>Systemic Examination</h2>
                { systemicExamination.map((element, i) => <Input key={element.key} placeHolder={element.placeHolder} types={element.types} value={systemicExam[i]} name={element.name} change={handleChangeSystemicExam}/>) }
                <Button onSubmit={handleSubmitUpdate}></Button>
            </form>
        </div>
    )
}