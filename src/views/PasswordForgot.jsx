import {useState} from 'react';
import { Link } from 'react-router-dom';


const PasswordForgot = () => {

  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Desde PasswordForgot");
  }

  return (
    <div className='w-full h-screen flex justify-center items-center'>

      <form method='POST' onSubmit={handleSubmit} className='bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-[600px] h-screen md:h-auto'>
        <div>
          <h1 className='text-yellow-500 text-4xl font-bold uppercase text-center pb-8'>Olvidaste tu Contraseña ?</h1>
        </div>

        <div className="p-3 mx-6 flex border-b border-gray-500">
          <input placeholder="Email" className="bg-transparent text-yellow-500 focus:outline-none focus:rang w-full p-2 text-lg" type="email" autoComplete='true'
            onChange={e => setEmail(e.target.value)} />
        </div>

        <button className='text-xl text-white border-2 border-white p-2 w-full mt-10 rounded-md hover:bg-yellow-500 hover:border-yellow-500'>Enviar Email</button>

        <div className='flex flex-col md:flex-row justify-between  pt-8'>
          <Link to="/signUp" className="block my-5 text-yellow-500">¿No tienes una Cuenta? Registrate</Link>
          <Link to="/" className="block my-5 text-yellow-500">¿Ya tienes una Cuenta? Inicia Sesion</Link>
        </div>
      </form>
    </div>
  )
}

export default PasswordForgot