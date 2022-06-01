import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import useSells from '../hooks/useSells';
import useClients from '../hooks/useClients';


const DetailView = () => {
  const { sell } = useSells();
  const products = sell.products;
  const services = sell.services;

  const {tempClientCart } = useClients();

  let totalRow = 0;
  let total = 0;

  return (
    <div className='flex justify-center items-center'>

      <div className='shadow-lg rounded-lg p-3 md:p-8 w-full max-w-[900px] md:w-auto mt-5 border-2 border-gray-600 bg-gray-900 text-yellow-50 overflow-x-auto'>
        <h1 className='text-xl text-center font-bold border-b-2 border-red-500'>Detalle de Venta</h1>
         {/*Client Information*/}
         <div className="flex justify-between mt-5">
          <p className="text-lg font-bold ">Cliente: <span className=" font-normal">{tempClientCart.name}</span></p>
          <p className="text-lg font-bold">Cedula: <span className=" font-normal">{tempClientCart.c_i}</span></p>
        </div>
        <table className="w-full mt-5">
          <thead className="bg-gray-700 border-b-2 border-gray-200">
            <tr className="">
              <th className='p-3 text-sm md:text-lg font-semibold tracking-wide text-left'>Producto</th>
              <th className='p-3 text-sm md:text-lg font-semibold tracking-wide text-left'>Cantidad</th>
              <th className='p-3 text-sm md:text-lg font-semibold tracking-wide text-left'>Precio</th>
              <th className='p-3 text-sm md:text-lg font-semibold tracking-wide text-left'>Total</th>
            </tr>
          </thead>
          {
            products ? products.map(producto => {

              totalRow = producto.cantToSell * producto.price;
              total = total + producto.cantToSell * producto.price;
              return (
                <tbody key={producto._id} className="">
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className='p-3 text-sm md:text-lg'>{producto.name}</td>
                    <td className='p-3 text-sm md:text-lg text-center'>{producto.cantToSell}</td>
                    <td className='p-3 text-sm md:text-lg'>{producto.price}</td>
                    <td className='p-3 text-sm md:text-lg'>{totalRow}</td>
                  </tr>
                </tbody>

              )
            }) : (
              <tbody>
                <tr><td className='text-xl text-center font-bold border-b-2 border-red-500'>No hay productos en el carrito</td></tr>
              </tbody>
            )
          }
        </table>

        <table className="w-full mt-10">
          <thead className="bg-gray-700 border-b-2 border-gray-200">
            <tr className="">
              <th className='p-3 text-sm md:text-lg font-semibold tracking-wide text-left'>Servicio</th>
              <th className='p-3 text-sm md:text-lg font-semibold tracking-wide text-left'>Cantidad</th>
              <th className='p-3 text-sm md:text-lg font-semibold tracking-wide text-left'>Precio</th>
              <th className='p-3 text-sm md:text-lg font-semibold tracking-wide text-left'>Total</th>
            </tr>
          </thead>
          {
            services ? services.map(services => {

              totalRow = 1 * services.price;
              total = total + 1 * services.price;
              return (
                <tbody key={services._id} className="">
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className='p-3 text-sm md:text-lg'>{services.name}</td>
                    <td className='p-3 text-sm md:text-lg text-center'>{1}</td>
                    <td className='p-3 text-sm md:text-lg'>{services.price}</td>
                    <td className='p-3 text-sm md:text-lg'>{totalRow}</td>
                  </tr>
                </tbody>

              )
            }) : (
              <tbody>
                <tr><td className='text-xl text-center font-bold border-b-2 border-red-500'>No hay productos en el carrito</td></tr>
              </tbody>
            )
          }
        </table>
        {products ?
          <div className="">
            <p className="text-lg mt-5 mr-5 text-right"> <span className="font-bold">Total:</span>  {total}</p>
           
          </div>

          : null}
           <Link to="/admin/sells"><button className='text-xl text-white border-2 border-yellow-500 p-2 w-full mt-10 rounded-md hover:bg-yellow-500 hover:border-yellow-500'>
              Atras
            </button></Link>
      </div>
    </div>
  )
}

export default DetailView