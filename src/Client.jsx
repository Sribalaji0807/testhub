import { createThirdwebClient } from "thirdweb";

export const client= createThirdwebClient({
    clientId:import.meta.env.CLIENT_ID
})