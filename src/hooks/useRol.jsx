import {useContext} from 'react'
import RolContext from '../context/RolContextProvider';

const useRol = () => {
  return useContext(RolContext);
}

export default useRol;