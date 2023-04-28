import { Contract, ethers } from "ethers";
import records from "../contracts/records.sol/Records.json";

console.log(records);

export default function getRecordContract(contractAddress) {
    const provider = new ethers.providers.Web3Provider( (window).ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      records.abi,
      signer
    );
    return contract;
  }