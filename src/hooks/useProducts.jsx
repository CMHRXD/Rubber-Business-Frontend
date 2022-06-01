import { useContext } from 'react'
import  ProductContext  from '../context/ProductContextProvider'

const useProducts = () => {
    return useContext(ProductContext);
}

export default useProducts;