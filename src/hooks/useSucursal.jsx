import {useContext} from 'react'
import SucursalContext from '../context/SucursalContextProvider'

const useSucursal = () => {
  return  useContext(SucursalContext)
}

export default useSucursal;