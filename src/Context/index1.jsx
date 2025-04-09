import { ethers } from "ethers";
import { useState,useEffect } from "react";
import { createContext,useContext } from "react";
import {contractAddress,contractABI} from "./contract";
const StateContext=createContext();




export const StateContextProvider=({children})=>{
const [provider, setProvider] = useState(null);
const [tokencontract, setTokenContract] = useState(null);
const [balance,setBalance]=useState(0);
const [signer,setSigner]=useState(null);


    const [walletAddress, setWalletAddress] = useState(null);

useEffect(() => {
  const initializeContract = async () => {
    if (provider) {
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        setTokenContract(contract);
      
    }
};
initializeContract();
},[provider]);
const switchNetwork = async (desiredChainId) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.utils.hexValue(desiredChainId) }],  });
      console.log(`Switched to chain ID: ${desiredChainId}`);
    } catch (error) {
      if (error.code === 4902) {
        console.error("Network not found in MetaMask. Adding it.");
 
      } else {
        console.error("Failed to switch network:", error);
      }
    }
  };
const sendTransaction=async()=>{
    console.log("Transaction start");
    if(!tokencontract) return;
    if(!signer) return;
    const TokenSigner = tokencontract.connect(signer);
    const amount = ethers.utils.parseEther("0.01", 18);
    console.log(amount);
    const transaction=await TokenSigner.mine_Tokens({value:amount});
    await transaction.wait();
    console.log(transaction);
    const b=await getBalance();
    setBalance(b);
}
const getBalance=async()=>{
    if(!tokencontract) return;
    if(!signer) return;
    const TokenSigner = tokencontract.connect(signer);
    const balance = await TokenSigner.balanceOf(walletAddress).then(balance => {
        const decimalBalance = ethers.BigNumber.from(balance).toString(); // Convert to decimal
        console.log("Balance in decimal: ", decimalBalance);
        return decimalBalance;
      }).catch(err => console.error(err));
      
    return balance;
}

    const connectWallet=async()=>{
        if(!window.ethereum){
            return alert("Please install metamask");
        }
        else{
            await switchNetwork(11155111);
const newProvider=new ethers.providers.Web3Provider(window.ethereum)
setProvider(newProvider);
await newProvider.send("eth_requestAccounts", []);
const signer= newProvider.getSigner();
const address = await signer.getAddress(); // Await the address
console.log("Wallet Address:", address); // Log the resolved address
setWalletAddress(address); 
setSigner(signer);
const b=await getBalance();
setBalance(b);

        }
    }

return(
    <StateContext.Provider value={{walletAddress,connectWallet,sendTransaction,balance}}>
        {children}
    </StateContext.Provider>
)
}
export const useStateContext=()=>{
    const context=useContext(StateContext)
if(!context)
    return  new Error("useContext must be used within a StateContextProvider");
return context;
};
