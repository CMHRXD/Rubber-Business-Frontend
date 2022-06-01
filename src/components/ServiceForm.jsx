import { useEffect, useState } from 'react';
import useSucursal from '../hooks/useSucursal';
import useServices from '../hooks/useServices';
const ServiceForm = () => {
    const { sucursales } = useSucursal();
    const { oneService,createService } = useServices();

    const [service, setService] = useState({
        name: '',
        description: '',
        price: '',
        sucursal: '',
    });

    useEffect(() => {
        if (oneService.name) {
            setService(oneService);
        }
    }, [oneService]);



    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleServiceForm = (e) => {
        e.preventDefault(); //prevent defualt submit
        //Check Empty Fields
        if ( service.name === '' || !service.name || service.description === '' || !service.description || service.price === '' || !service.price || service.sucursal === '' || !service.sucursal) {
            
            setError(true);
            setErrorMessage('Por favor llene todos los campos');
            return;
        }
        setError(false);
        console.log(service);
        //Save Service
        createService(service); //Create controller and hook
        //resetForm
        setService({name: '',description: '',price: '',sucursal: '',});

    }
    return (
        <div>
            <form className=' shadow-lg bg-gray-900 p-5 m-5 rounded-lg' method='POST' onSubmit={handleServiceForm}>
                <h1 className='text-xl text-yellow-500 border-b-2 border-red-700 p-3 text-center mb-5'>Formulario de Servicios</h1>

                {error ? <p className="p-3 mx-6 flex border-b border-red-500 text-red-500 mb-5"> {errorMessage} </p>
                                    : null}

                <div className='mb-5 border-b-2 flex border-gray-500'>
                    <input type="text" name="name" id="name" placeholder='Nombre del servicio' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
                        value={service.name || ''}
                        onChange={e => setService({ ...service, [e.target.name]: e.target.value })} />
                </div>

                <div className='mb-5 border-b-2 flex border-gray-500'>
                    <input type="text" name="description" id="description" placeholder='Descripcion del servicio' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' 
                        value={service.description || ''}
                        onChange={e => setService({ ...service, [e.target.name]: e.target.value })}
                    />
                </div>

                <div className='mb-5 border-b-2 flex border-gray-500'>
                    <input type="number" name="price" id="price" placeholder='Precio del servicio' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' 
                        value={service.price || ''}
                        onChange={e => setService({ ...service, [e.target.name]: e.target.value })}
                    />
                </div>

                <div className='mb-5 border-b-2 flex border-gray-500'>
                    <select name="sucursal" id="sucursal" className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg flex'
                        value={ service.sucursal || ''}
                        onChange={ e => setService({ ...service, [e.target.name]:e.target.value})}>
                        <option value="" className='bg-gray-900'>Seleccione una sucursal</option>
                        {sucursales.map(sucursal => (
                            <option key={sucursal._id} value={sucursal._id} className='bg-gray-900'>
                                {sucursal.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button className='text-xl text-white border-2 border-yellow-500 p-2 w-full mt-10 rounded-md hover:bg-yellow-500 hover:border-yellow-500'>Guardar</button>
            </form>
        </div>
    )
}

export default ServiceForm;