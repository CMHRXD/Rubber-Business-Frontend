import {useState} from 'react';
import { Link } from 'react-router-dom';

const ConfirmAccount = () => {

  return (
    <div className='w-full h-screen flex justify-center items-center'>

      <form method='' className='bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-[600px] h-screen md:h-auto'>
        <div>
          <h1 className='text-yellow-500 text-4xl font-bold uppercase text-center pb-8'>Cuenta Confirmada</h1>
        </div>

        <button className='text-xl text-white border-2 border-white p-2 w-full mt-10 rounded-md hover:bg-yellow-500 hover:border-yellow-500'>Iniciar Sesion</button>

        <div className='flex flex-col md:flex-row justify-between  pt-8'>
              <Link to="/signUp" className="block my-5 text-yellow-500">¿No tienes una Cuenta? Registrate</Link>
              <Link to="/" className="block my-5 text-yellow-500">¿Ya tienes una Cuenta? Inicia Sesion</Link>
        </div>
      </form>
    </div>
  )
}

export default ConfirmAccount