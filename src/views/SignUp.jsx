import {useState} from 'react';
import {Link} from 'react-router-dom';


const SignUp = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();

      //check empty fields
      if(name === '' || email === '' || password === '' || passwordConfirm === '') {
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

      //validate password
      if(password !== passwordConfirm) {
        setError(true);
        setErrorMessage('Las contraseñas no coinciden');
        return;
      }
    }

    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <form method='POST' onSubmit={handleSubmit} className='bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-[600px] h-screen md:h-auto'>
          <div>
            <h1 className='text-yellow-500 text-4xl font-bold uppercase text-center pb-8'>Registro</h1>
          </div>

          { error ? <p className="p-3 mx-6 flex border-b border-red-500 text-red-500 mb-5"> {errorMessage} </p>
                        : null }

          <div className="p-3 mx-6 flex border-b border-gray-500">
            <input placeholder="Nombre" className="bg-transparent text-yellow-500 focus:outline-none focus:rang w-full p-2 text-lg" type="name" autoComplete='true'
              onChange={e => setName(e.target.value)} />
          </div>

          <div className="p-3 mx-6 flex border-b border-gray-500">
            <input placeholder="Email" className="bg-transparent text-yellow-500 focus:outline-none focus:rang w-full p-2 text-lg" type="email" autoComplete='true'
              onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="p-3 mx-6 flex border-b border-gray-500">
            <input placeholder="Password" className="bg-transparent text-yellow-500 focus:outline-none focus:rang w-full p-2 text-lg" type="password" autoComplete='true'
              onChange={e => setPassword(e.target.value)} />
          </div>

          <div className="p-3 mx-6 flex border-b border-gray-500">
            <input placeholder="Confirmar Password" className="bg-transparent text-yellow-500 focus:outline-none focus:rang w-full p-2 text-lg" type="password" autoComplete='true'
              onChange={e => setPasswordConfirm(e.target.value)} />
          </div>

          <button className='text-xl text-white border-2 border-white p-2 w-full mt-10 rounded-md hover:bg-yellow-500 hover:border-yellow-500'>Crear Cuenta</button>

          <div className='flex flex-col md:flex-row justify-between  pt-8'>
              <Link to="/" className="block my-5 text-yellow-500">¿Ya tienes una Cuenta? Inicia Sesion</Link>
              <Link to="/passwordForgot" className="block my-5 text-yellow-500">Olvide mi Password</Link>
          </div>
        </form>
      </div>
    )
}

export default SignUp