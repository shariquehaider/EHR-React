import { Contract, ethers } from "ethers";
import combined from "../contracts/combined.sol/Hospital.json";

export default function getCombinedContract(contractAddress) {
    const provider = new ethers.providers.Web3Provider((window).ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        contractAddress,
        combined.abi,
        signer
    );
    return contract;
}