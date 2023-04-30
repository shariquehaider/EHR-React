import { Contract, ethers } from "ethers";
import combined from "../contracts/combined.sol/Hospital.json";

export default function getContract(contractAddress) {
    const provider = new ethers.providers.Web3Provider((window).ethereum);
    // await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        contractAddress,
        combined.abi,
        signer
    );
    return contract;
}