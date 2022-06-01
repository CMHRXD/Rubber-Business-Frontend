import {useState} from 'react'
import {TableService} from '../components/TableService';
import ServiceForm from '../components/ServiceForm';

const ServiceView = () => {
  const [showServiceForm, setShowServiceForm] = useState(false);//button to show form profile in md
  return (
    <div
      className='flex flex-col md:flex-row justify-between'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >

      <button type="button"
        className={` bg-gray-900 hover:bg-slate-800 cursor-pointer transition-colors p-3 mx-10 mt-3 uppercase text-yellow-500 rounded-md md:hidden`}
        onClick={() => { setShowServiceForm(!showServiceForm) }}>
        {`${showServiceForm ? "Ocultar Formulario" : "Mostrar Formulario"}`}
      </button>
      <div className={`${showServiceForm ? "block" : "hidden"} md:block md:w-1/2 lg:w-2/5`}>
        {/* Product Form */}
        <ServiceForm />
      </div>
      {/* Product List */}
      <div className='md:w-1/2 lg:w-3/5'>
        <TableService />
      </div>
    </div>
  )
}

export default ServiceView;