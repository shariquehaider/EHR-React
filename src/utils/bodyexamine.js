import { Contract, ethers } from "ethers";
import Body_Examine from "../contracts/body_examine.sol/Body_Examine.json";

export default function getBodyExamineContract(contractAddress) {
    const provider = new ethers.providers.Web3Provider((window).ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        contractAddress,
        Body_Examine.abi,
        signer
    );
    return contract;
}

