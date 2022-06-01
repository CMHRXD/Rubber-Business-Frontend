import { useState } from 'react'
import useSucursal from '../hooks/useSucursal';
import useAuth from '../hooks/useAuth';
import useRol from '../hooks/useRol';
import { motion } from 'framer-motion';

const ProfileView = () => {

  const { auth, updateUser, updatePassword } = useAuth();
  const { sucursales } = useSucursal();
  const [name, setName] = useState('' || auth.name);
  const [email, setEmail] = useState('' || auth.email);
  const [sucursal, setSucursal] = useState('' || auth.sucursal);
  const [password, setPassword] = useState({
    pa: '',
    pn: '',
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [error2, setError2] = useState(false);
  const [errorMessage2, setErrorMessage2] = useState('');

  const [showFormProfile, setShowFormProfile] = useState(false);//button to show form profile in md
  const [showFormPass, setShowFormPass] = useState(false);//button to show form password in md

  const handleProfileSubmit = (e) => {
    e.preventDefault(); //Prevent default form submit
    if (name === '' || email === '' || sucursal === '') {
      setError(true);
      setErrorMessage('Todos los campos son obligatorios');
      return;
    }
    //validate email
    const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!er.test(email)) {
      setError(true);
      setErrorMessage('Email Invalido')
      return;
    }
    setError(false);
    //Update Profile

    //Consult API and Validate password
    updateUser(auth._id, { name, email, sucursal })

  }

  const handlePassSubmit = (e) => {
    e.preventDefault(); //Prevent default form submit
    if (password.pa === '' || password.pn === '') {
      setError2(true);
      setErrorMessage2('Todos los campos son obligatorios');
      return;
    }
    setError2(false);// Delete Errors
    updatePassword(password); //Update password
    //reset form
    setPassword({
      pa: '',
      pn: '',
    });
  }

  return (
    <motion.div className='flex justify-center flex-col md:flex-row '
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}  >

      <button type="button"
        className={` bg-gray-900 hover:bg-slate-800 cursor-pointer transition-colors p-3 mx-10 mt-3 uppercase text-yellow-500 rounded-md md:hidden`}
        onClick={() => { setShowFormProfile(!showFormProfile) }}>
        {`${showFormProfile ? "Ocultar Formulario" : "Editar Perfil"}`}
      </button>
      <div className={`${showFormProfile ? "block" : "hidden"} w-auto md:block md:w-[800px]`}>{/* Profile Information */}
        <form action="" method="post" className='shadow-lg bg-gray-900 p-5 rounded-lg m-5 ' onSubmit={handleProfileSubmit}>
          <h1 className='mb-7 text-xl text-yellow-500 border-b-2 border-red-700 p-3 text-center' >Perfil de Usuario</h1>

          {error ? <p className="p-3 mx-6 flex border-b border-red-500 text-red-500 mb-5"> {errorMessage} </p>
            : null}

          <div className=' mb-5 flex border-b border-gray-500'>
            <input type="text" name="name" id="name" placeholder='Nombre del Usuario' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
              value={name}
              onChange={e => setName(e.target.value)} />
          </div>

          <div className=' mb-5 flex border-b border-gray-500'>
            <input type="text" name="brand" id="brand" placeholder='Email del Usuario' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
              value={email}
              onChange={e => setEmail(e.target.value)} />
          </div>


          <div className=' mb-5 flex border-b border-gray-500'>
            <select name="sucursal" id="sucursal" className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg flex'
              value={sucursal}
              onChange={e => setSucursal(e.target.value)}>
              <option value="" className='bg-gray-900'>Seleccione una sucursal</option>
              {sucursales.map(sucursal => (
                <option key={sucursal._id} value={sucursal._id} className='bg-gray-900'>
                  {sucursal.name}
                </option>
              ))}
            </select>
          </div>

          <button className='text-xl text-white border-2 border-yellow-500 p-2 w-full mt-10 rounded-md hover:bg-yellow-500 hover:border-yellow-500'>Actualizar Perfil</button>
        </form>
      </div>


      <button type="button"
        className={` bg-gray-900 hover:bg-slate-800 cursor-pointer transition-colors p-3 mx-10 mt-3 uppercase text-yellow-500 rounded-md md:hidden`}
        onClick={() => { setShowFormPass(!showFormPass) }}>
        {`${showFormPass ? "Ocultar Formulario" : "Cambiar Contraseña"}`}
      </button>
      <div className={`${showFormPass ? "block" : "hidden"} w-auto md:block md:w-[800px]`}>{/* Change Password */}
        <form action="" method="post" className='shadow-lg bg-gray-900 p-5 rounded-lg m-5' onSubmit={handlePassSubmit}>
          <h1 className='mb-7 text-xl text-yellow-500 border-b-2 border-red-700 p-3 text-center' >Cambiar Contraseña</h1>

          {error2 ? <p className="p-3 mx-6 flex border-b border-red-500 text-red-500 mb-5"> {errorMessage2} </p>
            : null}


          <div className=' mb-5 flex border-b border-gray-500'>
            <input type="password" name="pa" id="password" placeholder='Contraseña Actual' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
              value={password.pa || ''}
              onChange={e => setPassword({ ...password, [e.target.name]: e.target.value })} />
          </div>
          <div className='mb-5 flex border-b border-gray-500'>
            <input type="password" name="pn" id="passwordConfirm" placeholder='Nueva Contraseña' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
              value={password.pn || ''}
              onChange={e => setPassword({ ...password, [e.target.name]: e.target.value })} />
          </div>

          <button className='text-xl text-white border-2 border-yellow-500 p-2 w-full mt-10 rounded-md hover:bg-yellow-500 hover:border-yellow-500'>Cambiar Contraseña</button>
        </form>



      </div>
    </motion.div>
  )
}

export default ProfileView;