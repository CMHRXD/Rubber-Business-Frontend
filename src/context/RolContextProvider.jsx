import { createContext, useEffect, useState } from "react";
import swal from "sweetalert";
import AxiosClient from "../config/AxiosClient";

const RolContext = createContext();
export const RolContextProvider = ({ children }) => {
  const [rol, setRol] = useState('');
  const [rols, setRols] = useState([]);

  useEffect(() => {
    getRols();
  }, []);

  const getRol = () => {

  }

  const createRol = async (rol) => {
    const userToken = localStorage.getItem('gomeria_token');
    if (!userToken) {
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      }};

    try {
      const { data } = await AxiosClient.post('roles/create-role', rol, config);
      setRols([...rols, data]);
      swal("Rol creado correctamente", "", "success");
    }
    catch (error) {
      swal(`${error.response.data.msg}`, "", "error");
    }
  }
  const getRols = async () => {
    const userToken = localStorage.getItem('gomeria_token');
    if (!userToken) {
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      }
    };

    try {
      const { data } = await AxiosClient.get('roles/get-roles', config);
      setRols(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <RolContext.Provider value={{ rols, getRols,createRol}}>
      {children}
    </RolContext.Provider>
  )
}

export default RolContext;