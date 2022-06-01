import {useState} from 'react';
import { TableClient } from '../components/TableClient';
import ClientsFrom from '../components/ClientsFrom';

const ClientView = () => {

    const [showFormClient, setShowFormClient] = useState(false);//button to show form profile in md

    return (
        <div className='flex flex-col md:flex-row justify-between'>
            <button type="button"
                className={` bg-gray-900 hover:bg-slate-800 cursor-pointer transition-colors p-3 mx-10 mt-3 uppercase text-yellow-500 rounded-md md:hidden`}
                onClick={() => { setShowFormClient(!showFormClient) }}>
                {`${showFormClient ? "Ocultar Formulario" : "Mostrar Formulario"}`}
            </button>
            <div className={`${showFormClient ? "block" : "hidden"} md:block md:w-1/2 lg:w-2/5`}>
                {/* Product Form */}
                <ClientsFrom />
            </div>
            {/* Product List */}
            <div className='md:w-1/2 lg:w-3/5'>
                <TableClient />
            </div>
        </div>
    )
}

export default ClientView;