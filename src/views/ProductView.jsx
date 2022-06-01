import {useState} from 'react'
import ProductForm from '../components/ProductForm';
import { TableProduct } from '../components/TableProduct';
import { motion } from 'framer-motion';

const ProductView = () => {
  const [showFormProduct, setShowFormProduct] = useState(false);//button to show form profile in md
  return (
    <motion.div
      className='flex flex-col md:flex-row justify-between'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >

      <button type="button"
        className={` bg-gray-900 hover:bg-slate-800 cursor-pointer transition-colors p-3 mx-10 mt-3 uppercase text-yellow-500 rounded-md md:hidden`}
        onClick={() => { setShowFormProduct(!showFormProduct) }}>
        {`${showFormProduct ? "Ocultar Formulario" : "Mostrar Formulario"}`}
      </button>
      <div className={`${showFormProduct ? "block" : "hidden"} md:block md:w-1/2 lg:w-2/5`}>
        {/* Product Form */}
        <ProductForm />
      </div>
      {/* Product List */}
      <div className= 'md:w-1/2 lg:w-3/5'>
        <TableProduct />
      </div>
    </motion.div>
  )
}

export default ProductView;