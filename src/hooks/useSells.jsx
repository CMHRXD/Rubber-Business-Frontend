import {useContext} from 'react'
import SellsContext from '../context/SellsContextProvider';

const useSells = () => {
  return  useContext(SellsContext);
}

export default useSells;