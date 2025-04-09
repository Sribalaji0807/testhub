import { CallOverrideSchema, useAddress } from "@thirdweb-dev/react";
import { createContext,useContext, useEffect, useState } from "react";
import {
  createThirdwebClient,
 
  getContract,
} from "thirdweb";
import {
  useContractWrite,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react";
import { prepareContractCall,sendTransaction } from "thirdweb";
import { ethers } from "ethers";
import { defineChain } from "thirdweb/chains";
import web3 from "web3";
const client = createThirdwebClient({
  clientId: import.meta.env.VITE_CLIENT_ID,
});


// const contract = getContract({
//   client,
//   chain: defineChain(11155111),
//   address: "0x466070F4788ABDe5fC391545063Ff83AA8b5514B",
// });


const StateContext=createContext();

export const StateContextProvider=({children})=>{
  //  const account=useAddress();
  //  const { contract } = useContract("0x466070F4788ABDe5fC391545063Ff83AA8b5514B");
  //  const { mutateAsync: getJTTokens } = useContractWrite(contract, "mine_Tokens");
   const [address,setAddress]=useState(null);


    useEffect(() => {
      if (account) {
        console.log(account);
        setAddress(account);
      }
    }, [account]);
const getTokens=async()=>{
  const web=new web3('');

}
    
 //   console.log(getJTTokens);
  // const getTokens=async ()=>{
  //   const data= await getJTTokens({args: [],
  //    overrides:ethers.CallOverrides.,
  //   });
    // const transaction =  prepareContractCall({
    //   contract,
    //   method: "function mine_Tokens() payable",
    //   params: [],
    //   value: ethers.utils.parseEther("0.01").toString(),
    // });
    // console.log(address);
    // const { transactionHash } = await sendTransaction({
    //   transaction,
    //   account:address,
    // });
    // console.log("Transaction hash:", transactionHash);
  // console.log(data);
  // }
     return(
        <StateContext.Provider value={[]}>
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext=()=>{
    const context=useContext(StateContext);
    if(!context){
        throw new Error("useContext must be used within a StateContextProvider");
    }
    return context;
}