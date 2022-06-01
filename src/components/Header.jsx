import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaProductHunt } from 'react-icons/fa';
import {HiLogout, HiShoppingCart} from 'react-icons/hi'
import {AiFillDollarCircle} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import icon from '../public/img/icon.jpg';

import useAuth from '../hooks/useAuth';
import useSucursal from '../hooks/useSucursal';
import useSells from '../hooks/useSells';
import useProducts from '../hooks/useProducts';


const Header = () => {
  const [navStatus, setNavStatus] = useState(false)

  const [drop, setDrop] = useState(false)

  const { logout,auth } = useAuth();
  const { setSucursales } = useSucursal();
  const { setSells} = useSells();
  const { setProducts, setCarrito} = useProducts();

  const handleLogout = () => {
    localStorage.removeItem('gomeria_carrito');
    setSucursales([]);
    setCarrito([]);
    setSells([]);
    setProducts([]);
    logout();
  }

  return (
    <div className='w-full h-[100px] bg-gray-900 flex justify-between items-center text-yellow-500 text-lg px-4'>
      {/*Bussines Icon*/}
      <div className='flex justify-between items-center px-5'>
        <img src={icon} alt="Icon" style={{ width: '10%' }} />
        <p className='text-xl px-10 mt-2 font-bold'>Gomeria HS</p>
      </div>

      {/*NavBar Desktop with Icons*/}
      <ul className='hidden'>
        <li><Link to='/admin'><FaProductHunt size={"25px"} className=" rounded-lg text-yellow-500  " /></Link></li>
        <li>
          <Link to='/admin/cart'><HiShoppingCart size={"25px"} className=" rounded-lg text-yellow-500  " /></Link>
        </li>
        <li><Link to='/admin/sells'><AiFillDollarCircle size={"25px"} className=" rounded-lg text-yellow-500  " /></Link></li>
        <li><Link to='/admin/profile'><CgProfile size={"25px"} className=" rounded-lg text-yellow-500  " /></Link></li>
        
        <li onClick={handleLogout}><HiLogout size={"25px"} className=" rounded-lg text-yellow-500  " /></li>
      </ul>

       {/*NavBar Desktop with No Icons*/}
       <ul className='hidden md:flex'>
         <li><Link to={'/admin/clients'}>Clientes</Link></li>
        <li><Link to='/admin'>Productos</Link></li>
        <li><Link to='/admin/services'>Servicios</Link></li>
        <li><Link to='/admin/cart'>Carrito</Link></li>
        <li><Link to='/admin/sells'>Ventas</Link></li>
        <li><Link to='/admin/profile'>Perfil</Link></li>
        {auth.rol == "ADMIN" ?<li><Link to='/admin/administration'>Admin</Link></li>:null}
        <li onClick={handleLogout}><HiLogout size={"25px"} className=" rounded-lg text-yellow-500  " /></li>
      </ul>

      {/*NavBar Movile */}
      <div className='md:hidden z-10'>
        {!navStatus ? <FaBars className='cursor-pointer' onClick={() => setNavStatus(!navStatus)} /> : <FaTimes className='cursor-pointer' onClick={() => setNavStatus(!navStatus)} />}
      </div>

      <ul className={navStatus ? 'absolute top-0 left-0 h-screen bg-gray-900 w-full flex flex-col items-center justify-center' : 'hidden'}>
        <li className='py-6 text-4xl' onClick={() => setNavStatus(!navStatus)}><Link to='/admin'><FaProductHunt size={"50px"} className=" rounded-lg text-yellow-500  " /></Link></li>
        <li className='py-6 text-4xl' onClick={() => setNavStatus(!navStatus)}><Link to='/admin/cart'><HiShoppingCart size={"50px"} className=" rounded-lg text-yellow-500  " /></Link></li>
        <li className='py-6 text-4xl' onClick={() => setNavStatus(!navStatus)}><Link to='/admin/sells'><AiFillDollarCircle size={"50px"} className=" rounded-lg text-yellow-500  " /></Link></li>
        <li className='py-6 text-4xl' onClick={() => setNavStatus(!navStatus)}><Link to='/admin/profile'><CgProfile size={"50px"} className=" rounded-lg text-yellow-500  " /></Link></li>
        <li onClick={handleLogout}><HiLogout size={"50px"} className=" rounded-lg text-yellow-500  " /></li>
      </ul>

    </div>
  )
}

export default Header;