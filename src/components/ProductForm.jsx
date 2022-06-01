import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import useProducts from '../hooks/useProducts';
import useSucursal from '../hooks/useSucursal';

const ProductForm = () => {


  const { product, saveProduct } = useProducts();
  const { sucursales } = useSucursal();

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [size, setSize] = useState('');
  const [cant, setCant] = useState('');
  const [price, setPrice] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [id, setId] = useState('');
  const [image, setImage] = useState('');
  

  useEffect(() => {
    if (product.name) {
      setName(product.name);
      setBrand(product.brand);
      setSize(product.size);
      setCant(product.cant);
      setPrice(product.price);
      setSucursal(sucursales.filter(sucursal => sucursal.name === product.sucursal)[0]._id);
      setId(product._id);
    }
  }, [product]);


  const handleSubmit = (e) => {
    e.preventDefault();
    //Check Empty Fields
    if ([name, brand, size, cant, price, sucursal].includes('')) {
      swal('Error', 'Por favor llene todos los campos', 'error');
      return;
    }

    saveProduct({ name, brand, size, cant, price, sucursal, id, image });
    //resetForm
    [setName, setBrand, setSize, setCant, setPrice, setSucursal,setImage].forEach(Element => Element(''));

  }

  return (
      <div>
        <form action="" method="post" encType='multipart/form-data ' className='shadow-lg bg-gray-900 p-5 rounded-lg m-5' onSubmit={handleSubmit}>
          <h1 className='mb-7 text-xl text-yellow-500 border-b-2 border-red-700 p-3 text-center' >Formualrio de Productos</h1>

          <div className=' mb-5 flex border-b border-gray-500'>
            <input type="text" name="name" id="name" placeholder='Nombre del producto' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
              value={name}
              onChange={e => setName(e.target.value)} />
          </div>

          <div className=' mb-5 flex border-b border-gray-500'>
            <input type="text" name="brand" id="brand" placeholder='Marca del Producto' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
              value={brand}
              onChange={e => setBrand(e.target.value)} />
          </div>

          <div className=' mb-5 flex border-b border-gray-500'>
            <input type="text" name="zize" id="zize" placeholder='Tamaño' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
              value={size}
              onChange={e => setSize(e.target.value)} />
          </div>

          <div className=' mb-5 flex border-b border-gray-500'>
            <input type="number" name="cant" id="cant" placeholder='Cantidad' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
              value={cant}
              onChange={e => setCant(e.target.value)} />
          </div>

          <div className=' mb-5 flex border-b border-gray-500'>
            <input type="number" name="price" id="price" placeholder='Precio' className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg'
              value={price}
              onChange={e => setPrice(e.target.value)} />
          </div>

          <div className=' mb-5 flex border-b border-gray-500'>
            <select name="sucursal" id="sucursal" className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg flex'
              value={sucursal || ''}
              onChange={e => setSucursal(e.target.value)}>
              <option value="" className='bg-gray-900'>Seleccione una sucursal</option>
              {sucursales.map(sucursal => (
                <option key={sucursal._id} value={sucursal._id} className='bg-gray-900'>
                  {sucursal.name}
                </option>
              ))}
            </select>
          </div>

          <div className=' mb-5 flex border-b border-gray-500'>
            <input type="file" className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' name='img'
              onChange={e => setImage(e.target.files[0])} />
          </div>

          <button className='text-xl text-white border-2 border-yellow-500 p-2 w-full mt-10 rounded-md hover:bg-yellow-500 hover:border-yellow-500'>Guardar</button>
        </form>
      </div>
  )
}

export default ProductForm;