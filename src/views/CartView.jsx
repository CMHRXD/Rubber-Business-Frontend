import useProducts from "../hooks/useProducts";
import useAuth from "../hooks/useAuth";
import useSells from "../hooks/useSells";
import useServices from "../hooks/useServices";
import useClients from "../hooks/useClients";

const CartView = () => {


  const { carrito, setCarrito, checkStock, updateStockSelled } = useProducts();
  const { auth } = useAuth();
  const { createSell } = useSells();
  const { serviceCart, setServiceCart, removeFromCart } = useServices();
  const { clientCart,deleteFromCart,setClientCart } = useClients();

  let totalRow = 0;
  let total = 0;
  const deleteProduct = (id) => {
    const newCarrito = carrito.filter(product => product._id !== id);
    localStorage.setItem('gomeria_carrito', JSON.stringify(newCarrito));
    setCarrito(newCarrito);
  }

  const setCantidad = (id, cant) => {
    if (cant <= 0) return swal('Error', 'La cantidad debe ser mayor a 0', 'error');

    const newCarrito = carrito.map(product => {
      if (product._id === id) {
        if (checkStock(id, cant)) product.cantToSell = Number(cant);

      }
      return product;
    });
    localStorage.setItem('gomeria_carrito', JSON.stringify(newCarrito));
    setCarrito(newCarrito);
  }

  const handleSell = () => {
    //Delete products cant from stock
    let products = [];
    let services = [];
    carrito.forEach(product => {
      updateStockSelled(product._id, product.cantToSell);
      products.push({ _id: product._id, cantTosell: product.cantToSell });
    });

    serviceCart.forEach(service => {
      services.push({ _id: service._id, cantTosell: service.cantToSell });
    });

    if (!clientCart._id) {
      return swal('Error', 'Debe seleccionar un cliente', 'error');
    }
    //Create sell
    const sell = {
      products,
      services,
      user: auth._id,
      client: clientCart._id,
      sucursal: auth.sucursal,
      cant: carrito.length + serviceCart.length,
      total,
    }

    localStorage.setItem('gomeria_carrito', JSON.stringify([]));
    localStorage.setItem('gomeria_carrito_servicios', JSON.stringify([]));
    localStorage.setItem('gomeria_carrito_client', JSON.stringify({}));
    setCarrito([]);
    setServiceCart([]);
    setClientCart({});

    createSell(sell);
  }
  return (

    <div className='flex justify-center items-center'>

      <div className='shadow-lg rounded-lg p-8 max-w-[900px] md:w-auto mt-5 border-2 border-gray-600 bg-gray-900 text-yellow-50 overflow-x-auto'>
        <h1 className='text-xl text-center font-bold border-b-2 border-red-500'>Carrito de Compras</h1>

        {/*Client Information*/}
        <div className="flex justify-between mt-5">
          <p className="text-lg font-bold ">Cliente: <span className=" font-normal">{clientCart.name}</span></p>
          <p className="text-lg font-bold">Cedula: <span className=" font-normal">{clientCart.c_i}</span></p>
        </div>
        <table className="w-full mt-5">
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
            carrito.length > 0 ? carrito.map(producto => {
              totalRow = producto.cantToSell * producto.price;;
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
                    <td className='p-3 text-sm md:text-lg text-red-500 hover: cursor-pointer'><a onClick={() => deleteProduct(producto._id)} >Eliminar</a></td>
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
              <th className='p-3 text-sm md:text-lg font-semibold tracking-wide text-left'>Opcion</th>
            </tr>
          </thead>
          {
            serviceCart.length > 0 ? serviceCart.map(service => {
              totalRow = service.cantToSell * service.price;;
              total = total + service.cantToSell * service.price;

              return (

                <tbody key={service._id} className="">
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className='p-3 text-sm md:text-lg'>{service.name}</td>
                    <td className='p-3 text-sm md:text-lg'>
                      <input type="text" value={service.cantToSell} readOnly className="w-10 bg-transparent border-gray-300 rounded-lg text-center border-2" onChange={e => setCantidad(producto._id, e.target.value)} />
                    </td>

                    <td className='p-3 text-sm md:text-lg'>{service.price}</td>
                    <td className='p-3 text-sm md:text-lg'>{totalRow}</td>
                    <td className='p-3 text-sm md:text-lg text-red-500 hover: cursor-pointer'><a onClick={() => removeFromCart(service._id)} >Eliminar</a></td>
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

        {carrito.length ?
          <div className="">
            <p className="text-lg mt-5 text-right"> <span className="font-bold">Total General:</span>  {total} Gs</p>
            <button className='text-xl text-white border-2 border-yellow-500 p-2 w-full mt-10 rounded-md hover:bg-yellow-500 hover:border-yellow-500'
              onClick={handleSell}>
              Vender Productos
            </button>
          </div>
          : null}

        {clientCart._id? <button className='text-xl text-white border-2 border-yellow-500 p-2 w-full mt-3 rounded-md hover:bg-yellow-500 hover:border-yellow-500'
          onClick={deleteFromCart}>Eliminar Cliente</button>: <p></p>}

      </div>
    </div>
  )
}

export default CartView;