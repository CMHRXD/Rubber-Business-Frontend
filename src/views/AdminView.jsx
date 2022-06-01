import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useSucursal from '../hooks/useSucursal';
import useRol from '../hooks/useRol';

const AdminView = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        sucursal: '',
        rol: '',
    });

    const [rol, setRol] = useState({
        name: '',
        description: '',
    });

    const [sucursal, setSucursal] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
    });

    const { auth, createUser } = useAuth();
    const { sucursales, createSucursal } = useSucursal();
    const { rols, createRol } = useRol();

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [error2, setError2] = useState(false);
    const [errorMessage2, setErrorMessage2] = useState('');

    const [error3, setError3] = useState(false);
    const [errorMessage3, setErrorMessage3] = useState('');

    const [showUserForm, setShowUserForm] = useState(false);//button to show form user in md
    const [showRolForm, setShowRolForm] = useState(false);//button to show form rol in md
    const [showSucursalForm, setShowSucursalForm] = useState(false);//button to show form sucursal in md



    const handleRolSubmit =  (e) => {
        e.preventDefault();
        if (rol.name === '' || rol.description === '') {
            setError2(true);
            setErrorMessage2('Todos los campos son obligatorios');
            return;

        }

        createRol(rol);
        setRol({rol: '',description: '',});
    }

    const handleUserSubmit = (e) => {
        e.preventDefault(); //Prevent default form submit
        if (user.name === '' || user.email === '' || user.sucursal === '' || user.rol === '') {
            setError(true);
            setErrorMessage('Todos los campos son obligatorios');
            return;
        }
        //validate email
        const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!er.test(user.email)) {
            setError(true);
            setErrorMessage('Email Invalido')
            return;
        }
        //Password Check
        if (user.password !== user.password2) {
            setError(true);
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }
        setError(false);
        //Update Profile
        createUser(user);
        setUser({
            name: '',
            email: '',
            password: '',
            password2: '',
            sucursal: '',
            rol: '',
        });
    }


    const handleSucursalSubmit = (e) => {
        e.preventDefault(); //Prevent default form submit
        if (sucursal.name === '' || sucursal.address === '' || sucursal.phone === '' || sucursal.email === '') {
            setError3(true);
            setErrorMessage3('Todos los campos son obligatorios');
            return;
        }
        //validate email
        const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!er.test(sucursal.email)) {
            setError3(true);
            setErrorMessage3('Email Invalido')
            return;
        }

        setError3(false);
        createSucursal(sucursal);//Create sucursal
        setSucursal({name: '',address: '',phone: '',email: ''});//Clear form
    }
    return (
        <div className='flex justify-center flex-col md:flex-row '>
            {/* Admin Only */}
            {auth.rol === 'ADMIN' ?
                <>
                    <button type="button"
                        className={` bg-gray-900 hover:bg-slate-800 cursor-pointer transition-colors p-3 mx-10 mt-3 uppercase text-yellow-500 rounded-md md:hidden`}
                        onClick={() => { setShowUserForm(!showUserForm) }}>
                        {`${showUserForm ? "Ocultar Formulario" : "Crear Usuario"}`}
                    </button>
                    <div className={`${showUserForm ? "block" : "hidden"} w-auto md:block md:w-[800px]`}>
                        <div>{ /* Create User Form */}
                            <form action="" method="post" className='shadow-lg bg-gray-900 p-5 rounded-lg m-5' onSubmit={handleUserSubmit}>
                                <h1 className='mb-7 text-xl text-yellow-500 border-b-2 border-red-700 p-3 text-center' >Creacion de Usuarios</h1>

                                {error ? <p className="p-3 mx-6 flex border-b border-red-500 text-red-500 mb-5"> {errorMessage} </p>
                                    : null}

                                <div className=' mb-5 flex border-b border-gray-500'>
                                    <input type="text" name="name" id="name" placeholder='Nombre del Usuario' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
                                        value={user.name || ''}
                                        onChange={e => setUser({ ...user, [e.target.name]: e.target.value })} />
                                </div>

                                <div className=' mb-5 flex border-b border-gray-500'>
                                    <input type="text" name="email" id="email" placeholder='Email del Usuario' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
                                        value={user.email || ''}
                                        onChange={e => setUser({ ...user, [e.target.name]: e.target.value })} />
                                </div>

                                <div className=' mb-5 flex border-b border-gray-500'>
                                    <input type="password" name="password" id="password" placeholder='Contraseña' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
                                        value={user.password || ''}
                                        onChange={e => setUser({ ...user, [e.target.name]: e.target.value })} />
                                </div>

                                <div className=' mb-5 flex border-b border-gray-500'>
                                    <input type="password" name="password2" id="password2" placeholder='Repetir Contraseña' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
                                        value={user.password2 || ''}
                                        onChange={e => setUser({ ...user, [e.target.name]: e.target.value })} />
                                </div>


                                <div className=' mb-5 flex border-b border-gray-500'>
                                    <select name="sucursal" id="sucursal" className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg flex'
                                        value={user.sucursal || ''}
                                        onChange={e => setUser({ ...user, [e.target.name]: e.target.value })}>
                                        <option value="" className='bg-gray-900'>Seleccione una sucursal</option>
                                        {sucursales.map(sucursal => (
                                            <option key={sucursal._id} value={sucursal._id} className='bg-gray-900'>
                                                {sucursal.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className=' mb-5 flex border-b border-gray-500'>
                                    <select name="rol" id="role" key={1} className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg flex'
                                        value={user.rol || ''}
                                        onChange={e => setUser({ ...user, [e.target.name]: e.target.value })}>
                                        <option value="" className='bg-gray-900'>Seleccione un rol</option>
                                        {rols.map(role => (
                                            <option key={role._id} value={role._id} className='bg-gray-900'>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button className='text-xl text-white border-2 border-yellow-500 p-2 w-full mt-10 rounded-md hover:bg-yellow-500 hover:border-yellow-500'>Guardar</button>
                            </form>

                        </div>
                    </div>

                    <button type="button"
                        className={` bg-gray-900 hover:bg-slate-800 cursor-pointer transition-colors p-3 mx-10 mt-3 uppercase text-yellow-500 rounded-md md:hidden`}
                        onClick={() => { setShowRolForm(!showRolForm) }}>
                        {`${showRolForm ? "Ocultar Formulario" : "Crear Rol"}`}
                    </button>
                        <div className={`${showRolForm ? "block" : "hidden"} w-auto md:block md:w-[800px]`}>{/* Rol Form */}
                            <form action="" method="post" className='shadow-lg bg-gray-900 p-5 rounded-lg m-5' onSubmit={handleRolSubmit}>
                                <h1 className='mb-7 text-xl text-yellow-500 border-b-2 border-red-700 p-3 text-center' >Creacion de Roles</h1>

                                {error2 ? <p className="p-3 mx-6 flex border-b border-red-500 text-red-500 mb-5"> {errorMessage2} </p>
                                    : null}

                                <div className=' mb-5 flex border-b border-gray-500 '>
                                    <input type="text" name="name" id="rol" placeholder='Nombre del Rol' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
                                        value={rol.name || ''}
                                        onChange={e => setRol({ ...rol, [e.target.name]: (e.target.value).toUpperCase() })} />

                                </div>

                                <div className=' mb-5 flex border-b border-gray-500'>
                                    <input type="text" name="description" id="description" placeholder='Descripcion del Rol' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
                                        value={rol.description || ''}
                                        onChange={e => setRol({ ...rol, [e.target.name]: (e.target.value) })} />
                                </div>
                                <button className='text-xl text-white border-2 border-yellow-500 p-2 w-full mt-10 rounded-md hover:bg-yellow-500 hover:border-yellow-500'>Guardar</button>
                            </form>
                        </div>

                        <button type="button"
                            className={` bg-gray-900 hover:bg-slate-800 cursor-pointer transition-colors p-3 mx-10 mt-3 uppercase text-yellow-500 rounded-md md:hidden`}
                            onClick={() => { setShowSucursalForm(!showSucursalForm) }}>
                            {`${showSucursalForm ? "Ocultar Formulario" : "Crear Sucursal"}`}
                        </button>
                        <div className={`${showSucursalForm ? "block" : "hidden"} w-auto md:block md:w-[800px]`}>{/* Sucursal Form */}
                            <form action="" method="post" className='shadow-lg bg-gray-900 p-5 rounded-lg m-5' onSubmit={handleSucursalSubmit}>
                                <h1 className='mb-7 text-xl text-yellow-500 border-b-2 border-red-700 p-3 text-center' >Creacion de Sucursales</h1>

                                {error3 ? <p className="p-3 mx-6 flex border-b border-red-500 text-red-500 mb-5"> {errorMessage3} </p>
                                    : null}

                                <div className=' mb-5 flex border-b border-gray-500 '>
                                    <input type="text" name="name" id="s" placeholder='Nombre de la Sucursal' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
                                        value={sucursal.name || ''}
                                        onChange={e => setSucursal({ ...sucursal, [e.target.name]: (e.target.value).toUpperCase() })} />
                                </div>

                                <div className=' mb-5 flex border-b border-gray-500'>
                                    <input type="text" name="address" id="address" placeholder='Descripcion de la Sucursal' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
                                        value={sucursal.address || ''}
                                        onChange={e => setSucursal({ ...sucursal, [e.target.name]: (e.target.value) })} />
                                </div>

                                <div className=' mb-5 flex border-b border-gray-500'>
                                    <input type="text" name="phone" id="phone" placeholder='Telefono de la Sucursal' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
                                        value={sucursal.phone || ''}
                                        onChange={e => setSucursal({ ...sucursal, [e.target.name]: (e.target.value) })} />
                                </div>

                                <div className=' mb-5 flex border-b border-gray-500'>
                                    <input type="text" name="email" id="e" placeholder='Email de la Sucursal' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
                                        value={sucursal.email || ''}
                                        onChange={e => setSucursal({ ...sucursal, [e.target.name]: (e.target.value) })} />
                                </div>
                                <button className='text-xl text-white border-2 border-yellow-500 p-2 w-full mt-10 rounded-md hover:bg-yellow-500 hover:border-yellow-500'>Guardar</button>
                            </form>
                        </div>
                </> : null}
        </div>
    )
}

export default AdminView;