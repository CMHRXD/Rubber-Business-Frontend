import { useState, createContext, useEffect } from 'react';
import AxiosClient from '../config/AxiosClient';


const SucursalContext = createContext()
export const SucursalContextProvider = ({ children }) => {

  const [sucursales, setSucursales] = useState([])
  const [sucursal, setSucursal] = useState({})

  useEffect(() => {
    getSucursales();
  }, []);

  const getSucursales = async () => {
    const userToken = localStorage.getItem('gomeria_token')
    if (!userToken) {
      return
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      }
    }

    const { data } = await AxiosClient.get('sucursales/get-sucursales', config)
    setSucursales(data)
  }

  const getSucursal = id => {
    const sucursal = sucursales.find(sucursal => sucursal._id === id)
    setSucursal(sucursal)
  }

  const createSucursal = async (sucursal) => {
    const userToken = localStorage.getItem('gomeria_token');
    if (!userToken) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      }
    }
    try {
      const { data } = await AxiosClient.post('sucursales/create-sucursal', sucursal, config)
      setSucursales([...sucursales, data])
      swal("Sucursal creada correctamente", "", "success")
    } catch (error) {
      swal(`${error.response.data.msg}`, "", "error")
    }
    
  }

  return (
    <SucursalContext.Provider value={{ getSucursal,getSucursales, sucursales, sucursal, setSucursales,createSucursal }}>
      {children}
    </SucursalContext.Provider>
  )
}

export default SucursalContext;