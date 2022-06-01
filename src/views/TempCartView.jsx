import { useEffect, useState } from 'react'
import useProducts from '../hooks/useProducts';
import useAuth from '../hooks/useAuth';
import useSells from '../hooks/useSells';
import swal from 'sweetalert';
import { useNavigate, Link } from 'react-router-dom';


const TempCartView = () => {

  const { checkStock, updateStockSelled } = useProducts();
  const { auth } = useAuth();
  const { tempSell, setTempSell, createSell } = useSells();
  const navigate = useNavigate();

  let totalRow = 0;
  let total = 0;

  const setCantidad = (id, cant) => {
    if (cant <= 0) return swal('Error', 'La cantidad debe ser mayor a 0', 'error');
    const newCarrito = tempSell.products.map(product => {
      if (product._id === id) {
        if (checkStock(id, cant)) product.cantToSell = Number(cant);

      }
      return product;
    });
    setTempSell({ ...tempSell, products: newCarrito });
    localStorage.setItem('gomeria_carrito_temp', JSON.stringify(tempSell));
  }
  const deleteProduct = (product) => {
    if (tempSell.products.length === 1) return swal('Error', 'No puede quedar vacio la Venta', 'error');
    const { _id, actCantSelled } = product;
    //Delete from localStorage
    const newCarrito = tempSell.products.filter(product => product._id !== _id);
    setTempSell({ ...tempSell, products: newCarrito });
    localStorage.setItem('gomeria_carrito_temp', JSON.stringify({ ...tempSell, products: newCarrito }));

    //Return products to stock
    updateStockSelled(_id, actCantSelled * -1);

  }
  const deleteService = (service) => {
    tempSell.services = tempSell.services.filter(serv => serv._id !== service._id);
    setTempSell({ ...tempSell });
    localStorage.setItem('gomeria_carrito_temp', JSON.stringify(tempSell));
  }

  const handleSell = () => {
    //update stock 
    let products = [];
    let services = [];
    tempSell.services.forEach(service => {
      services.push({ _id : service._id, cantToSell : service.cantToSell });
    });

    tempSell.products.forEach(product => {
      let newCant = 0;
      if (product.cantToSell > product.actCantSelled) {
        newCant = product.cantToSell - product.actCantSelled;
      } else {
        newCant = (product.actCantSelled - product.cantToSell) * -1;
      }
      updateStockSelled(product._id, newCant);
      products.push({ _id: product._id, cantTosell: product.cantToSell });
    });


    //Create sell
    const sell = {
      _id: tempSell._id,
      products,
      services,
      user: auth._id,
      sucursal: tempSell.sucursal,
      cant: tempSell.products.length+tempSell.services.length,
      total,
    }
    setTempSell({});//delete temp sell
    localStorage.setItem('gomeria_carrito_temp', JSON.stringify({})); //delete temp sell from local storage
    createSell(sell); //update sell
    navigate('/admin/sells');

  }



  return (
    <div className=' flex justify-center items-center'>

      <div className='shadow-lg rounded-lg p-8 w-full max-w-[900px] md:w-auto mt-5 border-2 border-gray-600 bg-gray-900 text-yellow-50 overflow-x-auto'>
        <h1 className='text-xl text-center font-bold border-b-2 border-red-500'>Editar Venta</h1>
        <table className="w-full mt-10">
          <thead className="bg-gray-700 border-b-2 border-gray-200">
            <tr className="">
              <th className='p-3 text-sm md:text-lg font-semibold tracking-wide text-left'>Producto</th>
              <th className='p-3 text-sm md:text-lg font-semibold tracking-wide text-left'>Cantidad</th>
              <th className='p-3 text-sm md:text-lg font-semibold tracking-wide text-left'>Precio</th>
              <th className='p-3 text-sm md:text-lg font-semibold tracking-wide text-left'>Total</th>
              <th className='p-3 text-sm md:text-lg font-semibold tracking-wide text-left'>Opcion</th>
            </tr>
          </thead>
          {
            tempSell.products ? tempSell.products.map(producto => {

              totalRow = producto.cantToSell * producto.price;
              total = total + producto.cantToSell * producto.price;
              return (

                <tbody key={producto._id} className="">
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className='p-3 text-sm md:text-lg'>{producto.name}</td>
                    <td className='p-3 text-sm md:text-lg'>
                      <input type="number" value={producto.cantToSell} className="w-10 bg-transparent border-gray-300 rounded-lg text-center border-2" onChange={e => setCantidad(producto._id, e.target.value)} />
                    </td>

                    <td className='p-3 text-sm md:text-lg'>{producto.price}</td>
                    <td className='p-3 text-sm md:text-lg'>{totalRow}</td>
                    <td className='p-3 text-sm md:text-lg text-red-500 hover: cursor-pointer'><a onClick={() => deleteProduct(producto)} >Eliminar</a></td>
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
              <th className='p-3 text-sm md:text-lg font-semibold tracking-wide text-left'>Servicios</th>
              <th className='p-3 text-sm md:text-lg font-semibold tracking-wide text-left'>Cantidad</th>
              <th className='p-3 text-sm md:text-lg font-semibold tracking-wide text-left'>Precio</th>
              <th className='p-3 text-sm md:text-lg font-semibold tracking-wide text-left'>Total</th>
              <th className='p-3 text-sm md:text-lg font-semibold tracking-wide text-left'>Opcion</th>
            </tr>
          </thead>
          {
            tempSell.services ? tempSell.services.map(service => {

              totalRow = service.cantToSell * service.price;
              total = total + service.cantToSell * service.price;
              return (

                <tbody key={service._id} className="">
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className='p-3 text-sm md:text-lg'>{service.name}</td>
                    <td className='p-3 text-sm md:text-lg'>
                      <input type="text" readOnly value={service.cantToSell} className="w-10 bg-transparent border-gray-300 rounded-lg text-center border-2" onChange={e => setCantidad(producto._id, e.target.value)} />
                    </td>

                    <td className='p-3 text-sm md:text-lg'>{service.price}</td>
                    <td className='p-3 text-sm md:text-lg'>{totalRow}</td>
                    <td className='p-3 text-sm md:text-lg text-red-500 hover: cursor-pointer'><a onClick={() => deleteService(service)} >Eliminar</a></td>
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
        {tempSell.products ?
          <div className="">
            <p className="text-lg mt-5 text-right"> <span className="font-bold">Total:</span>  {total}</p>
            <button className='text-xl text-white border-2 border-yellow-500 p-2 w-full mt-10 rounded-md hover:bg-yellow-500 hover:border-yellow-500'
              onClick={handleSell}>
              Actualizar Venta
            </button>

            <Link to="/admin/sells"><button className='text-xl text-white border-2 border-yellow-500 p-2 w-full mt-3 rounded-md hover:bg-yellow-500 hover:border-yellow-500'>
              Atras
            </button></Link>
          </div>

          : null}
      </div>
    </div>
  )
}

export default TempCartView;