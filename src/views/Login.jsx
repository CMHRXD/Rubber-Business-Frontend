import {useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import AxiosClient from '../config/AxiosClient';
import useAuth from '../hooks/useAuth';
import useClients from '../hooks/useClients';
import useProducts from '../hooks/useProducts';
import useRol from '../hooks/useRol';
import useServices from '../hooks/useServices';
import useSells from '../hooks/useSells';
import useSucursals from '../hooks/useSucursal';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const {setAuth} = useAuth();
    const {getClients} = useClients();
    const {getProducts} = useProducts();
    const {getRols} = useRol();
    const {getServices} = useServices();
    const {getSells} = useSells();
    const {getSucursales} = useSucursals();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        //check regular expresion
        if(email === '' || password === '') {
            setError(true);
            setErrorMessage('Todos los campos son obligatorios');
            return;
        }

        //validate email
        const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!er.test(email)) {
            setError(true);
            setErrorMessage('Email Invalido')
            return;
        }
        //Consult APIs and Validate password
        try {
            const {data} = await AxiosClient.post('/users/Login', {email, password});
            localStorage.setItem('gomeria_token', data.token);
            setAuth(data);
            getClients();
            getProducts();
            getRols();
            getServices();
            getSells();
            getSucursales();

            navigate('/admin'); //Redirect to dashboard
            
        } catch (error) {
            setError(true);
            setErrorMessage(error.response.data.msg);
        }
    
    }
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <form method='POST' onSubmit={handleSubmit} className='bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-[600px] h-screen md:h-auto'>
                <div>
                    <h1 className='text-yellow-500 text-4xl font-bold uppercase text-center pb-8'>Login</h1>
                </div>

                { error ? <p className="p-3 mx-6 flex border-b border-red-500 text-red-500 mb-5"> {errorMessage} </p>
                        : null }
                
                <div className="p-3 mx-6 flex border-b border-gray-500">
                    <input placeholder="Email" className="bg-transparent text-yellow-500 focus:outline-none focus:rang w-full p-2 text-lg" type="email" autoComplete='true' 
                            onChange={e=>setEmail(e.target.value)}/>
                </div>

                <div className="p-3 mx-6 flex border-b border-gray-500 mt-3">
                    <input placeholder="Password" className="bg-transparent text-yellow-500 focus:outline-none focus:rang w-full p-2 text-lg" type="password" autoComplete='true'
                            onChange={e=>setPassword(e.target.value)}/>
                </div>

                <button className='text-xl text-white border-2 border-white p-2 w-full mt-10 rounded-md hover:bg-yellow-500 hover:border-yellow-500'>Acceder</button>

                <div className='flex flex-col md:flex-row justify-between  pt-8'>
                    <Link to="/signUp" className="block my-3 text-yellow-500">¿No tienes una Cuenta? Registrate</Link>
                    <Link to="/passwordForgot" className="block my-3 text-yellow-500">Olvide mi Password</Link>
                </div>
            </form>
        </div>
    )
}

export default Login;