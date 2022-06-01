import { useContext } from "react";
import ClientsContext from "../context/ClientsContextProvider";

const useClients = () => {
  return useContext(ClientsContext);
}

export default useClients;