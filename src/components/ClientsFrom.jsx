import {useEffect, useState} from 'react'
import useClients from '../hooks/useClients';

const ClientsFrom = () => {

    const {createClient,oneClient} = useClients();

    const [client, setClient] = useState({
        name: '',
        c_i: '',
        email: '',
        phone: '',
        address: '',
    });

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (oneClient.name) {
            setClient(oneClient);
        }
    }, [oneClient]);
    

    const handleClientForm = (e) => {
        e.preventDefault();

        //Check empty fields
        if ([client.name, client.email, client.phone, client.address].includes('')) {
            setError(true);
            setErrorMessage('Por favor llene todos los campos');
            return;
        }

        //check email with Regular Expression
        const emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRE.test(client.email)) {
            setError(true);
            setErrorMessage('Por favor ingrese un email valido');
            return;
        }
        setError(false);

        //Save Client
        createClient(client);
        //resetForm
        setClient({ name: '', email: '', phone: '', address: '' });
    }

    return (
        <div>
            <form className=' shadow-lg bg-gray-900 p-5 m-5 rounded-lg' method='POST' onSubmit={handleClientForm}>
                <h1 className='text-xl text-yellow-500 border-b-2 border-red-700 p-3 text-center mb-5'>Formulario de Clientes</h1>

                {error ? <p className="p-3 mx-6 flex border-b border-red-500 text-red-500 mb-5"> {errorMessage} </p>
                                    : null}

                <div className='mb-5 border-b-2 flex border-gray-500'>
                    <input type="text" name="name" id="name" placeholder='Nombre del cliente' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
                        value={client.name || ''}
                        onChange={e => setClient({ ...client, name: e.target.value })} />
                </div>

                <div className='mb-5 border-b-2 flex border-gray-500'>
                    <input type="number" name="c_i" id="c_i" placeholder='Cedula del cliente' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
                        value={client.c_i || ''}
                        onChange={e => setClient({ ...client, c_i: e.target.value })} />
                </div>



                <div className='mb-5 border-b-2 flex border-gray-500'>
                    <input type="text" name="email" id="email" placeholder='Email del cliente' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
                        value={client.email || ''}
                        onChange={e => setClient({ ...client, email: e.target.value })} />
                </div>

                <div className='mb-5 border-b-2 flex border-gray-500'>
                    <input type="text" name="phone" id="phone" placeholder='Telefono del cliente' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
                        value={client.phone || ''}
                        onChange={e => setClient({ ...client, phone: e.target.value })} />
                </div>

                <div className='mb-5 border-b-2 flex border-gray-500'>
                    <input type="text" name="address" id="address" placeholder='Direccion del cliente' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
                        value={client.address || ''}
                        onChange={e => setClient({ ...client, address: e.target.value })} />
                </div>

                <button className='text-xl text-white border-2 border-yellow-500 p-2 w-full mt-10 rounded-md hover:bg-yellow-500 hover:border-yellow-500'>Guardar</button>
            

            </form>

        </div>
    )
}

export default ClientsFrom;