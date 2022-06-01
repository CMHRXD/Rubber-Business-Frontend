import {useContext} from 'react'
import ServiceContext from '../context/ServiceContextProvider'

const useServices = () => {
  return useContext(ServiceContext);
}

export default useServices;